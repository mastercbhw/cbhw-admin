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
