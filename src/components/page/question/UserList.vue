<template>
<div class="m-list">
  <ul>
    <li v-for="o in list" class="user_item" key ="o.id">
        <img :src="o.logo" class="image" @click="handleClick(o.id)" >
        <span>{{o.realname}}</span>
    </li>
  </ul>
</div>
</template>

<script>

export default{
  components:{
  },
  props : {
      list : {
          type : Array
      }
  },
}

</script>

<style>
.user_item{
  list-style: none;
}

</style>
