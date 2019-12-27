<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
   
   <router-view> </router-view>


<br/>
<br/>
<br/>
<br/>
<br/>



  </div>
</template>

<script>
export default {
  name:'App',
  created(){
    const api = 'https://vue-course-api.hexschool.io/api/noelle/products' //遠端路徑，api前面要加上伺服器路徑
    this.$http.get(api).then((response) => {
    console.log(response.data)
})
  }
}
</script>


<style lang="scss">
@import "./assets/all";
</style>
