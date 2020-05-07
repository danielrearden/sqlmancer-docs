module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'introduction',
    },
    {
      type: 'doc',
      id: 'getting-started',
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'models',
        'relationships',
        'filtering',
        'sorting',
        'pagination',
        'aggregation',
        'mutations',
        'custom-scalars',
        'unions-and-interfaces',
        'subscriptions',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: ['cli', 'functions', 'directives', 'builders'],
    },
  ],
}
