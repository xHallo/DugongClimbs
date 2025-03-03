import { createRouter, createWebHistory } from 'vue-router';
import Blog from '@/views/Blog.vue';
import Home from '@/views/Home.vue';
import Members from '@/views/Memberpage.vue';
import Shop from '@/views/Shop.vue';
import Joinus from '@/views/Joinus.vue';
import Checkout from '@/views/Checkout.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/blog', component: Blog, name: 'blog' },
  { path: '/members', component: Members, name: 'members' },
  { path: '/shop', component: Shop, name: 'shop' },
  { path: '/joinus', component: Joinus, name: 'Joinus' },
  { path: '/checkout', component: Checkout }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;