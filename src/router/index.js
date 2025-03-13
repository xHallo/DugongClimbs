import { createRouter, createWebHistory } from 'vue-router';
import SuggestionBox from '@/views/SuggestionBox.vue';
import Home from '@/views/Home.vue';
import AboutUs from '@/views/AboutUs.vue';
import Shop from '@/views/Shop.vue';
import FAQ from '@/views/FAQ.vue';
import Checkout from '@/views/Checkout.vue'
import sizingchart from '@/views/sizingchart.vue';
const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/SuggestionBox', component: SuggestionBox, name: 'blog' },
  { path: '/AboutUs', component: AboutUs, name: 'AboutUs' },
  { path: '/shop', component: Shop, name: 'shop' },
  { path: '/FAQ', component: FAQ, name: 'FAQ' },
  { path: '/sizing', component: sizingchart, name: 'sizingchart' },
  { path: '/checkout', 
    component: Checkout ,
    name:'Checkout',
    props:route => {
      try {
        const decodedCart = route.query.cart 
          ? JSON.parse(decodeURIComponent(route.query.cart)) 
          : [];
        return { cart: decodedCart };
      } catch (e) {
        console.warn('Failed to parse cartdet query:', e);
        return { cart: [] };
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;