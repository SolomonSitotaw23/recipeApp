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
import VueSmoothScroll from "vue3-smooth-scroll";

const pinia = createPinia();
pinia.use(piniaPersist);
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: "http://localhost:8080/v1/graphql",
});
const token = window.localStorage.getItem("token");
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...((token && { authorization: `Bearer ${token}` }) || ""),
    },
  };
});

export const apolloClient = new ApolloClient({
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
  .use(VueSmoothScroll)
  .mount("#app");
