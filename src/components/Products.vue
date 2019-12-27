<template>
  <div>
    <div class="text-right">
      <button>建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead></thead>
      <tbody>
        <!-- ESLint底下，v-for一定要綁定:key -->
        <!-- ESLint底下，當key還沒用到會報錯，這邊先刪掉 -->
        <!-- <tr v-for="(item, key) in products" :key="item.id"> -->
        <tr v-for="(item) in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price}}</td>
          <td class="text-right">{{item.price}}</td>
          <td>
              <span v-if="item.is_enabled==1" class="text-success">啟用</span>
              <span>未啟用</span>
          </td>
          <td>
              <button class="btn btn-outline-primary btn-sm">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = "https://vue-course-api.hexschool.io/api/noelle2/admin/products";
      this.$http.get(api).then(response => {
        console.log(response.data);      
        vm.products = response.data.products;
      });
    }
  },
  //一定要有created不然getProducts不會被觸發
  created() {
    this.getProducts(); //created之後才能取得資料，方法要寫在created之後才呼叫
  }
};
</script>