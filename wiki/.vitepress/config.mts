import {defineConfig} from 'vitepress'
import {withSidebar} from 'vitepress-sidebar'
import {promoteSections} from './promoteSections.mts'

const siteUrl = 'https://pokewalker.net'
const brandColor = '#d32f42'
const socialImage = `${siteUrl}/favicon.png`

const sharedSidebarOptions = {
    documentRootPath: 'wiki',
    useTitleFromFrontmatter: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: false,
    useFolderLinkFromSameNameSubFile: false,
    includeRootIndexFile: false,
    includeFolderIndexFile: false,
    hyphenToSpace: true,
    capitalizeFirst: false,
    collapsed: false,
    excludeByGlobPattern: ['templates/**'],
    manualSortFileNameByPriority: ['index.md'],
    sortMenusByFrontmatterOrder: true
}

const sidebarConfigs = [
    {
        ...sharedSidebarOptions,
        scanStartPath: 'hardware',
        resolvePath: '/hardware/'
    },
    {
        ...sharedSidebarOptions,
        scanStartPath: 'firmware',
        resolvePath: '/firmware/'
    },
    {
        ...sharedSidebarOptions,
        scanStartPath: 'development',
        resolvePath: '/development/'
    },
    {
        ...sharedSidebarOptions,
        scanStartPath: 'contributing',
        resolvePath: '/contributing/'
    }
]

const vitePressOptions = {
    title: 'Pokéwalker Wiki',
    description: 'Your one stop Pokéwalker resource!',
    lastUpdated: true,
    cleanUrls: true,
    srcExclude: ['templates/**'],

    appearance: false,
    defaultTheme: 'light',

    vite: {
        publicDir: '../public'
    },

    head: [
        ['link', {rel: 'icon', type: 'image/png', href: '/favicon.png'}],

        ['meta', {name: 'theme-color', content: brandColor}],

        ['meta', {property: 'og:type', content: 'website'}],
        ['meta', {property: 'og:site_name', content: 'Pokéwalker Wiki'}],
        ['meta', {property: 'og:image', content: socialImage}],
        ['meta', {property: 'og:image:alt', content: 'Pokéwalker Wiki'}],
        ['meta', {property: 'og:image:type', content: 'image/png'}],

        ['meta', {name: 'twitter:card', content: 'summary'}],
        ['meta', {name: 'twitter:image', content: socialImage}],
        ['meta', {name: 'twitter:image:alt', content: 'Pokéwalker'}]
    ],

    transformPageData(pageData) {
        const isHome = pageData.relativePath === 'index.md'
        const title = isHome ? 'Home' : (pageData.title || 'Pokéwalker Wiki')
        const description = pageData.description || 'Your one stop Pokéwalker resource!'
        const url = `${siteUrl}${pageData.relativePath
            .replace(/(^|\/)index\.md$/, '$1')
            .replace(/\.md$/, '')}`

        pageData.frontmatter.head ??= []
        pageData.frontmatter.head.push(
            ['meta', {property: 'og:title', content: title}],
            ['meta', {property: 'og:description', content: description}],
            ['meta', {property: 'og:url', content: url}],
            ['meta', {name: 'twitter:title', content: title}],
            ['meta', {name: 'twitter:description', content: description}]
        )
    },

    themeConfig: {
        logo: '/favicon.png',

        nav: [
            {text: 'Home', link: '/'},
            {text: 'Hardware', link: '/hardware/overview/specifications'},
            {text: 'Firmware', link: '/firmware/'},
            {text: 'Development', link: '/development/'},
            {text: 'Contributing', link: '/contributing/modifying-pages'},
            {text: 'Community', link: 'https://discord.gg/ymbTMsS', target: '_blank', rel: 'noopener'},
        ],

        editLink: {
            pattern: 'https://github.com/h4lfheart/pokewalker-wiki/edit/main/wiki/:path',
            text: 'Edit this page'
        },

        search: {
            provider: 'local'
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/h4lfheart/pokewalker-wiki' },
        ],

        footer: {
            copyright: 'Pokéwalker.net is an independent fan site and is not affiliated with, endorsed by, or connected to Nintendo Co., Ltd., Game Freak, or The Pokémon Company. Pokémon and all related names are trademarks of Nintendo / Game Freak / The Pokémon Company.'
        }
    }
}

const config = withSidebar(vitePressOptions, sidebarConfigs)
config.themeConfig.sidebar = promoteSections(
    config.themeConfig.sidebar,
    sidebarConfigs
)

export default defineConfig(config)
