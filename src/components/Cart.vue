<template>
  <div class="cart-list">
<!--    сделал в более читаемом виде -->
    <ul>
      <li
        v-for="(item, index) in reversedList"
        :key="'list-item-' + index"
      >
        {{ item.title }} - {{ item.amount }} кг, на сумму {{ item.price * item.amount}} {{ currency }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // лучше использовать подробное описание пропсов
    cart: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    currency: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    // именование переменных/методов должно быть осмысленным, транслитерация - плохая практика
      reversedList() {
        const arr = [...this.cart];
        return arr.reverse();
        // метод reverse изменяет порядок "на месте", а тк массив передается по ссылке
        // то будет изменяться переданный в пропсах массив cart
        // return this.cart.reverse();
      },
  },
};
</script>
