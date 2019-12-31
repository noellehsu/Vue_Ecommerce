<template>
  <div>
    <!-- 載入Loading的元件 -->
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage:`url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- 如果只有原價就顯示這個 -->
              <del class="h5" v-if="!item.price">{{item.origin_price}}元</del>
              <!-- 如果原價跟優惠價都有就顯示這個 -->
              <del class="h6" v-if="item.price">原價{{item.origin_price}}元</del>
              <h5 v-if="item.price">現在只要{{item.price}}元</h5>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getSingleProduct(item.id)">
              <i class="fas fa-spinner fa-spin"
              v-if="status.loadingItem === item.id"></i> 
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";


export default {
  data() {
    return {
      products: [],
      singleProduct:{},
      status:{
          loadingItem:'',
      },
      isLoading: false
    };
  },
  methods: {
    getProducts(page = 1) {
      //參數預設值為1
      const api = "https://vue-course-api.hexschool.io/api/noelle/products";
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
      });
    },
    getSingleProduct(id) {
      const api = `https://vue-course-api.hexschool.io/api/noelle/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then(response => {
      vm.singleProduct = response.data.product;
      $('#productModal').modal('show');
      console.log(response);
      vm.status.loadingItem = '';
      });
    }
  },
  //一定要有created不然getProducts不會被觸發
  created() {
    this.getProducts(); //created之後才能取得資料，方法要寫在created之後才呼叫
  }
};
</script>