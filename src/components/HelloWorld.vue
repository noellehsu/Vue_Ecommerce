<template>
  <div class="hell">
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>


<script>
export default {
    name: "HelloWorld",
  data() {
    return {
      msg:'Hello World'
    };
  },
  methods:{
    signout(){
         const vm = this;
      const api = 'https://vue-course-api.hexschool.io/logout' 
    this.$http.post(api).then((response) => {
    console.log(response.data)
    if(response.data.success){
      vm.$router.push('/login')  //登出成功進入登入頁面
    }
    })
    }
  }
}
</script>

