import {existsSync, readdirSync, readFileSync} from 'node:fs'
import {join} from 'node:path'

type SidebarItem = {
    text?: string
    link?: string
    items?: SidebarItem[]
    collapsed?: boolean
    [key: string]: unknown
}

type SidebarMulti = Record<
    string,
    {
        base?: string
        items: SidebarItem[]
    }
>

type SidebarScanConfig = {
    documentRootPath?: string
    scanStartPath?: string
    resolvePath?: string
}

function normalizePath(path: string): string {
    return path.replace(/\\/g, '/').replace(/\/+/g, '/')
}

function readFrontmatter(filePath: string, key: string): unknown {
    if (!existsSync(filePath)) return undefined
    try {
        const content = readFileSync(filePath, 'utf8')
        const match = content.match(/^---\n([\s\S]*?)\n---/)
        if (!match) return undefined
        const fm = match[1]
        if (key === 'section') {
            return /^\s*section:\s*true\s*$/m.test(fm) ? true : undefined
        }
        if (key === 'order') {
            const m = fm.match(/^\s*order:\s*(\d+)\s*$/m)
            if (m && m[1]) return parseInt(m[1], 10)
        }
    } catch {
        // ignore
    }
    return undefined
}

function isSectionFolder(configPath: string): boolean {
    if (existsSync(configPath)) {
        try {
            const raw = JSON.parse(readFileSync(configPath, 'utf8')) as {
                section?: unknown
            }
            if (raw.section === true) return true
        } catch {
            // ignore
        }
    }

    const indexPath = join(configPath, '..', 'index.md')
    if (readFrontmatter(indexPath, 'section') === true) return true

    return false
}

function getFolderOrder(configPath: string): number | undefined {
    if (existsSync(configPath)) {
        try {
            const raw = JSON.parse(readFileSync(configPath, 'utf8')) as {
                order?: unknown
            }
            if (typeof raw.order === 'number') return raw.order
        } catch {
            // ignore
        }
    }

    const indexPath = join(configPath, '..', 'index.md')
    const order = readFrontmatter(indexPath, 'order')
    if (typeof order === 'number') return order

    return undefined
}

function listSectionFolders(docsRoot: string, scanStartPath: string): string[] {
    const dir = join(docsRoot, scanStartPath)
    if (!existsSync(dir)) return []

    return readdirSync(dir, {withFileTypes: true})
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter((name) =>
            isSectionFolder(join(dir, name, 'sidebar.config.json'))
        )
        .sort((a, b) => {
            const orderA = getFolderOrder(join(dir, a, 'sidebar.config.json'))
            const orderB = getFolderOrder(join(dir, b, 'sidebar.config.json'))
            const na = Number.isFinite(orderA) ? orderA : Infinity
            const nb = Number.isFinite(orderB) ? orderB : Infinity
            if (na !== nb) return na - nb
            return a.localeCompare(b)
        })
}

function itemBelongsToFolder(item: SidebarItem, folderName: string): boolean {
    const prefix = `${folderName}/`

    const visit = (node: SidebarItem): boolean => {
        if (node.link) {
            const link = normalizePath(node.link).replace(/^\//, '')
            if (
                link === folderName ||
                link === `${folderName}/` ||
                link === `${folderName}/index.md` ||
                link.startsWith(prefix)
            ) {
                return true
            }
        }

        return node.items?.some(visit) ?? false
    }

    if (visit(item)) return true

    const label = (item.text ?? '').toLowerCase().replace(/\s+/g, '-')
    return label === folderName.toLowerCase()
}

function promoteRootGroup(
    rootGroup: SidebarItem,
    docsRoot: string,
    scanStartPath: string
): SidebarItem[] {
    const children = rootGroup.items ?? []
    if (children.length === 0) return [stripEmptyItems(rootGroup)]

    const sectionFolders = listSectionFolders(docsRoot, scanStartPath)
    if (sectionFolders.length === 0) return [rootGroup]

    const kept: SidebarItem[] = []
    const promoted: SidebarItem[] = []
    const claimed = new Set<SidebarItem>()

    for (const folderName of sectionFolders) {
        const match = children.find(
            (child) =>
                !claimed.has(child) && itemBelongsToFolder(child, folderName)
        )

        if (match) {
            claimed.add(match)
            promoted.push(match)
        }
    }

    for (const child of children) {
        if (!claimed.has(child)) kept.push(child)
    }

    if (promoted.length === 0) return [stripEmptyItems(rootGroup)]

    const parent = stripEmptyItems({
        ...rootGroup,
        ...(kept.length > 0 ? {items: kept} : {})
    })

    if (!kept.length) delete parent.items

    return [parent, ...promoted.map(stripEmptyItems)]
}

function stripEmptyItems(item: SidebarItem): SidebarItem {
    if (!item.items || item.items.length > 0) return item
    const {items: _unused, ...rest} = item
    return rest
}

export function promoteSections(
    sidebar: SidebarMulti | SidebarItem[],
    configs: SidebarScanConfig[]
): SidebarMulti | SidebarItem[] {
    if (Array.isArray(sidebar)) return sidebar

    const byResolvePath = new Map(
        configs
            .filter((config) => config.resolvePath)
            .map((config) => [config.resolvePath!, config])
    )

    const result: SidebarMulti = {}

    for (const [resolvePath, entry] of Object.entries(sidebar)) {
        const config = byResolvePath.get(resolvePath)
        const items = entry.items ?? []

        if (!config?.scanStartPath || items.length !== 1 || !items[0]) {
            result[resolvePath] = {
                ...entry,
                items: items.map(stripEmptyItems)
            }
            continue
        }

        const docsRoot = config.documentRootPath ?? 'docs'
        result[resolvePath] = {
            ...entry,
            items: promoteRootGroup(items[0], docsRoot, config.scanStartPath)
        }
    }

    return result
}
