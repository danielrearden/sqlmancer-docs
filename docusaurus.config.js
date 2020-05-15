module.exports = {
  title: 'Sqlmancer',
  tagline: '✨⭐ Conjuring SQL from GraphQL queries ⭐✨',
  url: 'https://sqlmancer.netlify.com',
  baseUrl: '/',
  favicon: 'img/wizard.png',
  organizationName: 'sqlmancer', // Usually your GitHub org/user name.
  projectName: 'sqlmancer-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Sqlmancer',
      logo: {
        alt: 'Sqlmancer',
        src: 'img/wizard.png',
      },
      links: [
        {
          to: 'introduction',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/danielrearden/sqlmancer',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://github.com/danielrearden/sqlmancer/tree/master/src/__tests__',
          label: 'Examples',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: 'introduction',
            },
            {
              label: 'Getting Started',
              to: 'getting-started',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'Report an Issue',
              href: 'https://github.com/saltstack/salt/issues/new/choose',
            },
            {
              label: 'Roadmap',
              href: 'https://github.com/danielrearden/sqlmancer/milestones',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Spectrum',
              href: 'https://spectrum.chat/sqlmancer',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/sqlmancer',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Daniel Rearden. Built with Docusaurus. <a target="_blank" href="https://icons8.com/icons/set/wizard">Wizard icon</a> by <a target="_blank" href="https://icons8.com">Icons8</a>.`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/nightOwlLight'),
      darkTheme: require('prism-react-renderer/themes/nightOwl'),
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '', // docs-only mode
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/danielrearden/sqlmancer-docs/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: ['@aldridged/docusaurus-plugin-lunr'],
}
