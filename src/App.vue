<script setup>
import { routes } from '@/route'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
console.log(route)
const currentRouteName = computed(() => route.name)
</script>

<template>
  <div class="main-container">
    <ul>
      <li v-for="item in routes" 
          :class="{'selected': currentRouteName === item.name}"
          @click="router.replace({name: item.name, query: {tab: '¥@@##你好呀'}})"
      >{{ item.name }}</li>
    </ul>
    <div class="content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  width: 100%;
  height: 100vh;
  display: flex;
}
.main-container > ul {
  width: 300px;
  height: 100%;
  overflow: auto;
  border-right: 1px solid #eee;
}
.main-container > ul > li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: center;
  cursor: pointer;
}
.main-container > ul > li.selected {
  background-color: #eee;
}
.main-container > ul > li:hover {
  background-color: #eee;
}
.main-container > .content {
  flex: 1;
  height: 100%;
}
</style>
