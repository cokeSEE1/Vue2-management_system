<template>
  <div>
    <Card/>
    <Sale/>
    <Observe/>
  </div>
 
</template>

<script>
import Card from './Card/index.vue'
import Sale from './Sale/index.vue'
import Observe from './Observe/index.vue'
export default {
      name:'dashboard',
      components:{
        Card,
        Sale,
        Observe
      }
}
</script>

<style>

</style>