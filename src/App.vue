<template>
  <div id="app">
    <Header :cart="cart" :currency="currency"/>
<!--    лучше использовать однообразную запись -->
<!--    <Header :cart="cart" :currency="currency"></Header>-->
    <List
      :currency="currency"
      :products="products"
      @add-to-cart="addToCartHandler"
    />
    <Cart :cart="cart" :currency="currency"/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import List from './components/List.vue';
import Cart from './components/Cart.vue';
import api from '../api/products.js';

export default {
  name: 'App',
  data() {
    return {
      cart: [],
      currency: 'VGTB',
      products: [],
    };
  },
  components: {
    Header,
    List,
    Cart,
  },
  created() {
    this.startPricesMonitoring();
  },
  methods: {
    startPricesMonitoring() {
      // исправил ошибку в значении
      setInterval(this.getList, 2000);
    },
    async getList() {
      // переменная data излишня
      this.products = await api.getProductsList();
    },
    addToCartHandler(data) {
      // возможно не лучший вариант с массивом, тк при каждом добавлении продукта в корзину
      // массив будет разрастаться
      this.cart.push(data);
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
