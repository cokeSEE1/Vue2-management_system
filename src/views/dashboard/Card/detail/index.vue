<template>
  <div>
    <div class="card-header">
        <span>{{ title }}</span>
        <svg t="1716011798294" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2331" width="16" height="16"><path d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0zM512 928c-229.75 0-416-186.25-416-416S282.25 96 512 96s416 186.25 416 416S741.75 928 512 928z" p-id="2332" fill="#8a8a8a"></path><path d="M537.64 343.452c47.074 0 83.266-37.528 83.266-78.072 0-32.46-20.832-60.878-62.496-60.878-54.816 0-82.178 44.618-82.178 77.11C475.144 320.132 498.152 343.452 537.64 343.452z" p-id="2333" fill="#8a8a8a"></path><path d="M533.162 728.934c-7.648 0-10.914-10.136-3.264-39.55l43.25-166.406c16.386-60.848 10.944-100.398-21.92-100.398-39.456 0-131.458 39.83-211.458 107.798l16.416 27.392c25.246-17.256 67.906-34.762 77.792-34.762 7.648 0 6.56 10.168 0 35.508l-37.746 158.292c-23.008 89.266 1.088 109.538 33.984 109.538 32.864 0 117.808-30.47 195.57-109.632l-18.656-25.34C575.354 716.714 543.05 728.934 533.162 728.934z" p-id="2334" fill="#8a8a8a"></path></svg>
    </div>
    <div class="card-content">{{ count }}</div>
    <div class="card-charts">
        <slot name="charts"></slot>
    </div>
    <div class="card-footer">
        <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'detail',
  props:['title','count']
}
</script>

<style scoped>
.card-header{
    display: flex;
    justify-content: space-between;
    color: #d9d9d9;
   
}
.card-content{
    font-size: 30px;
    padding: 10px 0;
}
.card-charts{
    height: 50px;
}
.card-footer{
    border-top: 1px solid #eee;
   padding-top: 10px;
}
</style>