<template>
  <div class="product-list">
    <div
      class="card"
      v-for="(product, index) in products"
      :key="'product-card-' + index"
    >
      <p class="card-title">
        {{ product.title }}
      </p>
<!--      в alt должно быть значение, это хорошая практика -->
      <img
        class="card-image"
        :src="product.image"
        alt="card-image"
      >
      <p class="card-price">
        Цена: {{ product.price }} {{ currency }}
      </p>

      <div>
<!--        лучше использовать v-model-->
        <input
          type="number"
          ref="amount"
          :id="product.id"
          min="0"
        >
        <span> кг</span>
      </div>
      <button @click="addToCart(product)">
        В корзину
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currency: {
      type: String,
      required: true,
      default: ''
    },
    products: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  },
  computed: {
    // это решение не будет работать при изменении размеров окна "онлайн", тк свойство innerWidth
    // не реактивно. в таком варианте было бы уместнее добавлять "слушатель" на
    // изменение разрмера окна. но в любом случае в данной ситуации лучше просто стилизовать
    // с использование media query
    // cardsWidth() {
    //   let width = window.innerWidth;
    //   let count = 1;
    //   // неправильное сравнение
    //   if (width > 840) {
    //     count = 3;
    //   } else if ((width > 420 && width < 840)) {
    //     count = 2;
    //   }
    //
    //   return 100 / count;
    // },
  },
  // так читабельней на мой взгляд, когда created (и другие хуки жизненного цикла
  // объявлены "в начале"
  // created() {
  //   this.startPricesMonitoring();
  // },
  methods: {
    addToCart(product) {
      let input = this.$refs.amount.find((input) => input.id === product.id);

      // необходима проверка, тк иначе продукт добавляется в корзину и в Header сумма - NaN
      if (input.value === '') return;

      let data = {
        amount: input.value,
        price: product.price,
        title: product.title,
      };
      this.$emit('add-to-cart', data);

      // возможно это лишнее, но после добавления в корзину можно очищать значение инпута
      // input.value = '';
      // также неплохо было бы показывать пользователю сообщение вроде "Товар успешно добавлен в корзину"
      // но в ТЗ этого нет

      // обращение к родителю "напрямую" не очень хорошая практика, лучше эмитить событие
      // this.$parent.cart.push(data);
    },
  },
};
</script>

<style scoped>
/* стили компонентов лучше изолировать друг от друга */
  .product-list {
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .card {
    border: 1px solid #908888;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
    margin: 10px;
  }
  @media screen and (max-width: 840px) {
    .product-list {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media screen and (max-width: 420px) {
    .product-list {
      grid-template-columns: 1fr;
    }
  }
  .card-image {
    width: 100%;
  }
  button {
    padding: 5px;
    margin: 5px;
  }

</style>
