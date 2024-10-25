<template>
  <el-button @click="person.age++">click</el-button>
  <div>{{ person  }}</div>
  
  <div>{{ name }}</div>
  <div style="z-index: 9999;background-color: #ccc;height: 300px;width: 100%;position: fixed;">
    <el-tooltip
        content="xxxxx"
        placement="right"
        :raw-content="true"
        popper-class="title-info-tooltip"
      >hello</el-tooltip>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue';

const person = ref({
  name: 'John',
  age: 30
})
const name = computed(() => {
  console.log('name computed')
  return person.age
})
watch(
  () => person,
  (newVal, oldVal) => {
    console.log('watch')
  },
  {
    immediate: true
  }
)
</script>
<style>
.title-info-tooltip {
  z-index: 100001;
}
</style>