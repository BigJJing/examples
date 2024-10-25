<template>
  <button @click="onCapture">截图</button>
  <div style="background-color: #ccc;">
    <!-- <div class="row" v-for="(_, index) in Array.from({length: 500})">
      <div class="cell" v-for="(_, index2) in Array.from({length: 500})" :style="{backgroundColor: getRandomRGBColor()}"></div>
    </div> -->
    <h1 v-for="(item, index) in Array.from({length: 200})">{{index}}</h1>
  </div>
  <img :src="imgUrl" />
</template>

<script setup>
import html2canvas from 'html2canvas';
import { ref } from 'vue';

const imgUrl = ref('');
function getRandomRGBColor() {
  const r = Math.floor(Math.random() * 256); // 生成 0 到 255 之间的随机整数
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const rgbColor = `rgb(${r}, ${g}, ${b})`; // 构建 RGB 格式字符串

  return rgbColor;
}

function getBase64ImageSize(base64Image) {
  // 去除 data:image/png;base64, 前缀
  const base64Data = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

  // 解码 base64 图片为二进制数据
  const binaryData = atob(base64Data);

  // 获取二进制数据的长度
  const sizeInBytes = binaryData.length;

  // 转换为 KB 或 MB 等单位
  const sizeInKB = sizeInBytes / 1024;
  const sizeInMB = sizeInKB / 1024;

  return {
    bytes: sizeInBytes,
    kilobytes: sizeInKB,
    megabytes: sizeInMB,
  };
}



function onCapture() {
  html2canvas(document.body).then(function(canvas) {
  // document.body.appendChild(canvas);
  // const url = canvas.toDataURL("image/png");
  // console.log(url)
  const url = canvas.toDataURL();
  console.log(url);
  imgUrl.value = url;
});
}


</script>

<style scoped>
.row {
  display: flex;
}
.row > .cell {
  width: 3px;
  height: 2px;
}
</style>