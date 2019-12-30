<template>
  <div>
    <div class="text-right mt-4">
      <!-- 把原本的Modal寫法改成用method呼叫開啟 -->
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="80">是否啟用</th>
          <th width="80">編輯</th>
          <th width="80">刪除</th>
        </tr>
      </thead>
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
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
          </td>
          <td>
            <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 新增或編輯的Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <!-- 上傳圖片 -->
                  <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile"/>
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除的Modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//瀏覽器不認得jquery的符號
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      tempProduct: {}, 
      isNew: false,
      

    };
  },
  methods: {
    getProducts() {
      const api =
        "https://vue-course-api.hexschool.io/api/noelle/admin/products";
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true; // 新增產品
      } else {
        //Object.assign是ES6寫法，把傳入的item放入物件，避免tempProduct跟item有參考的特性(shallow copy)
        this.tempProduct = Object.assign({}, item);
        this.isNew = false; // 修改產品
      }
      $("#productModal").modal("show");
    },
    updateProduct() {
      let api = "https://vue-course-api.hexschool.io/api/noelle/admin/product";
      let httpMethod = "post";
      const vm = this;

      if (!vm.isNew) {
        // 如果有用$符號，就要改成``
        api = `https://vue-course-api.hexschool.io/api/noelle/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }

      //如果是新增，用post方法，如果是修改，就用put方法把tempProduct傳回後端
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
        } else {
          $("#productModal").modal("hide");
          vm.getProducts();
          console.log("新增失敗");
        }
      });
    },
    openDelModal(item) {
      //可以直接寫成這樣 this.tempProduct = item; 
      //編輯產品將 items 的值寫到空物件是為了避免 this.tempProduct 與 items 有傳參考的特性
      this.tempProduct = Object.assign({}, item);
      $("#delProductModal").modal("show");    
    },
    deleteProduct() {
      const vm = this;
      let api = `https://vue-course-api.hexschool.io/api/noelle/admin/product/${vm.tempProduct.id}`;

      this.$http.delete(api, { data: vm.tempProduct }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getProducts();
        } else {
          $("#delProductModal").modal("hide");
          vm.getProducts();
          console.log("刪除失敗");
        }
      });
    },
    uploadFile(){
      console.log(this);   //可以觀察refs裡的files的files，裡面那層的files是一個陣列
      const uploadedFile = this.$refs.files.files[0];
      const vm =this;

      //用formData模擬傳統的表單送出
      const formData =  new FormData(); //建立formData物件
      formData.append('file-to-upload', uploadedFile);  //新增一個欄位
      const url = "https://vue-course-api.hexschool.io/api/noelle/admin/upload";
      
      //送到後端，物件就是FormData的格式
      this.$http.post(url, formData, {
        header:{'Content-Type':'multipart/form-data'}
      }).then((response)=>{
           console.log(response.data);  //檢查imageUrl路徑打開是不是我剛剛上傳的照片
           if(response.data.success){
            //  vm.tempProduct.imageUrl = response.data.imageUrl; 這樣無效

             //tempProduct的imageUrl沒有雙向綁定，要強制把set寫入
             vm.$set(vm.tempProduct,'imageUrl', response.data.imageUrl)
           }
      });


    }
  },
  //一定要有created不然getProducts不會被觸發
  created() {
    this.getProducts(); //created之後才能取得資料，方法要寫在created之後才呼叫
  }
};
</script>