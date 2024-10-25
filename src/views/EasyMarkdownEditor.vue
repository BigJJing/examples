<template>
  <div>{{ form }}</div>
  <EasyMarkdownEditor v-model="form.content" :readOnly="true"></EasyMarkdownEditor>
  <button @click="updateForm">update form</button>
</template>

<script setup>
import EasyMarkdownEditor from '@/components/EasyMarkdownEditor.vue'
import { reactive } from 'vue';
const form = reactive({
  content: 'xxxx\nxxx\n# h1\n# h2\n# h1\n![Image](https://test-tr.futuoa.com/v1/api/richtext_image/20240112KxxZfhPbpef)'
})
function updateForm() {
  form.content = "xxxx"
}
</script>
