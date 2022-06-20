<template>
  <div class="header">
    <h3>Товаров в корзине на: {{ cartPrice }} {{ currency }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    // неверный синтаксис. в компонент не приходят пропсы required, default, видимо это описание пропса cart
    cart: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    // cart: Array,
    // required: true,
    // default: {},

    currency: {
      type: String,
      required: true,
      default: ''
    },
  },
  computed: {
    cartPrice() {
      let val = 0;
      this.cart.forEach((item) => {
        // лучше явно преобразовать данные к числу, либо доабавить проверку на тип
        val += parseFloat(item.price) * parseFloat(item.amount);
      });
      // вряд ли в валюте будет дробная часть больше 2х знаков после запятой,
      // по крайней мере чтобы не было суммы вида 100.0000000001
      return val.toFixed(2);
    }
  }
  // результаты методов в watch не кэшируются
  // watch: {
  //   cart(cart) {
  //     let val = 0;
  //     cart.forEach((item) => {
  //       val += item.price * item.amount;
  //     });
  //     this.cartPrice = val;
  //   },
  // },
}
</script>

<style scoped>
  .header {
    padding: 10px;
    background: #e5e5e5;
  }
</style>
