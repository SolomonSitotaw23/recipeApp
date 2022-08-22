import "./style.css";
import App from "./App.vue";
import "./index.css";
import { createApp, provide, h, markRaw } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createPinia } from "pinia";
import { createHttpLink } from "@apollo/client/core";
import router from "./Router";
import piniaPersist from "pinia-plugin-persist";
import { setContext } from "@apollo/client/link/context";
const pinia = createPinia();
pinia.use(piniaPersist);
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: "http://localhost:8080/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // ...(token && { authorization: `Bearer ${token}` }),
      "x-hasura-admin-secret": "myadminsecretkey",
    },
  };
});

const apolloClient = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
})
  .use(pinia)
  .use(router)
  .mount("#app");
