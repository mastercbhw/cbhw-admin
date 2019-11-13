export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/index',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/demo',
            name: 'demo',
            icon: 'rocket',
            routes: [
              {
                path: '/demo/timebar',
                name: 'timebar',
                icon: 'unordered-list',
                component: './demo/Timebar',
              },
              {
                path: '/demo/checkbox-tree',
                name: 'checkbox',
                icon: 'unordered-list',
                component: './demo/CheckboxTree',
              },
            ]
          },
          {
            path: '/table',
            name: 'table',
            icon: 'rocket',
            routes: [
              {
                path: '/table/simple',
                name: 'simple',
                icon: 'unordered-list',
                component: './table/Simple',
              },
              {
                path: '/table/nested-table',
                name: 'nested-table',
                icon: 'unordered-list',
                component: './table/NestedTable',
              },
            ]
          },
          {
            path: '/form',
            name: 'form',
            icon: 'rocket',
            component: './form/ConfigForm',
          },
          {
            path: '/umiform',
            name: 'umiform',
            icon: 'rocket',
            component: './form/UmiUIForm',
          },
          {
            path: '/config-tree',
            name: 'config-tree',
            icon: 'rocket',
            component: './form/ConfigTree',
          },
          {
            path: '/dnd',
            name: 'dnd',
            icon: 'rocket',
            routes: [
              {
                path: '/dnd/example0',
                name: 'example0',
                icon: 'highlight',
                component: './dnd/example-0/index',
              },
              {
                path: '/dnd/example1',
                name: 'example1',
                icon: 'highlight',
                component: './dnd/example-1/index',
              },
              {
                path: '/dnd/example2',
                name: 'example2',
                icon: 'highlight',
                component: './dnd/example-2/index',
              },
              {
                path: '/dnd/example3',
                name: 'example3',
                icon: 'highlight',
                component: './dnd/example-3/index',
              },
              {
                path: '/dnd/example4',
                name: 'example4',
                icon: 'highlight',
                component: './dnd/example-4/index',
              },
              {
                path: '/dnd/demo',
                name: 'demo',
                icon: 'highlight',
                component: './dnd/demo/index',
              },
              {
                path: '/dnd/demo2',
                name: 'demo2',
                icon: 'highlight',
                component: './dnd/demo2/index',
              },
              {
                path: '/dnd/smooth-dnd',
                name: 'smooth-dnd',
                icon: 'highlight',
                component: './dnd/smooth-dnd/index',
              },

            ]
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]
