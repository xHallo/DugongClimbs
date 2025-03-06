import { defineStore } from 'pinia';
import cartdetails from "../cart.json";
export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: cartdetails
  }),
  actions: {
    setCart(newCart) {
      this.cart = newCart;
    },
    clearCart() {
      this.cart = [];
    }
  }
});