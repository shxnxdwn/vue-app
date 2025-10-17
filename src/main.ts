import '@/app/styles/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app/App.vue';
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(createPinia());
app.use(ToastService);
app.use(PrimeVue, {
  theme: {
    preset: Lara,
  },
});

app.mount('#app');
