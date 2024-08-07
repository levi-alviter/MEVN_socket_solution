import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import CustomForm from "./components/CustomForm.vue";
import MainComponent from "./components/MainComponent.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainComponent,
    },
    {
      path: "/form",
      component: CustomForm,
    },
  ],
});

createApp(App).use(router).mount("#app");
