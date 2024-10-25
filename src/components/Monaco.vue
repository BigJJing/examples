<template>
  <div style="width: 100%;height: 600px;" class="monaco-container" ref="monacoEl"></div>
</template>

<script setup>
import { ref, onMounted, unref } from "vue";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
// const monacoEl = ref(null);
// let editor = null;
// onMounted(() => {
//   editor = monaco.editor.create(unref(monacoEl), {
//     value: "hello xxxx xxx",
//     language: "javascript",
//   })
//   monaco.editor.onDidChangeMarkers(([uri]) => {
//     const markers = monaco.editor.getModelMarkers({resource: uri})
//     // markers是返回的错误信息数组，可赋值给需要判断语法错误的关键词，如this.coderErrors = markers
//     console.log(markers)
//   })
// })
</script>