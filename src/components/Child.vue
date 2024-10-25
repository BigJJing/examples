<template>
  <div>child: {{ name }}</div>
</template>

<script setup>
const props = defineProps({
  name: String
})
console.log(props.name)
</script>
