import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from 'App.vue';
import 'sass/global.scss';
import test from 'test.vue';
import { createApp, h, provide } from 'vue';
import { createOidcAuth, SignInType } from 'vue-oidc-client/vue3';
import { createRouter, createWebHistory } from 'vue-router';

// note the ending '/'
const appUrl = 'http://localhost:8080/';

// SignInType could be Window or Popup
const mainOidc = createOidcAuth('main', SignInType.Window, appUrl, {
  authority: 'https://localhost:61751/',
  client_id: 'simpleIdServerWebsite',
  response_type: 'id_token token',
  scope: 'openid profile email',
});

export { mainOidc };

console.log('main start');
// HTTP connection to the API
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'https://localhost:7179/graphql',
});
/*
const wsLink = new WebSocketLink({
  uri: ws://localhost:7179/graphql,
  options: {
  reconnect: true
  }
  });
*/
// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/test', // <-- notice the colon
      name: 'test',
      component: test,
    },
  ],
});

mainOidc.useRouter(router);

console.log(router.getRoutes());

console.log('client start');
//createApp(App).mount('#app');
mainOidc.startup().then((ok) => {
  if (ok) {
    const app = createApp({
      setup() {
        console.log('setup start');
        provide(DefaultApolloClient, apolloClient);
        console.log('setup ok start');
      },

      render: () => h(App),
    })
      .use(router)
      .mount('#app');
  }
});
