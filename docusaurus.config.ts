import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  // Əsas Sayt Məlumatları
  title: 'Azər Məlikov | Technical Blog',
  tagline: 'DevOps, Cloud, və Cybersecurity insights.',
  favicon: 'img/favicon.ico',

  // GitHub Pages və Deploy Konfiqurasiyası
  url: 'https://azar-malikov.github.io', 
  baseUrl: '/blog.azarmalikov.com/',

  // GitHub Deploy Məlumatları (Əsas Hissə)
  organizationName: 'azar-malikov', // Sizin GitHub istifadəçi adınız (SSH-dən təsdiq olunmuş)
  projectName: 'blog.azarmalikov.com', // Sizin Repo adınız
  deploymentBranch: 'gh-pages', // Deploy ediləcək branch
  trailingSlash: false, // Slash xətasını aradan qaldırır

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Future flags
  future: {
    v4: true, 
  },

  // Localization
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/azar-malikov/blog.azarmalikov.com/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/azar-malikov/blog.azarmalikov.com/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark', 
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Azər Məlikov',
      logo: {
        alt: 'Azər Məlikov Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/blog', 
          label: 'Blog', 
          position: 'left'
        },
        {
          href: 'https://github.com/azar-malikov/blog.azarmalikov.com',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Azər Məlikov, Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
