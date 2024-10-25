<template>
 <div class="auto-grid-container">
  <div>
    <el-button @click="addItem">add</el-button>
  </div>
  <GridLayout
    v-model:layout="layout"
    :col-num="8"
    :row-height="100"
    is-draggable
    is-resizable
    vertical-compact
    use-css-transforms
    :verticalCompact="false"
    @layout-updated="layoutUpdatedEvent"
  >
  <GridItem
    v-for="item in layout"
    :key="item.i"
    :x="item.x"
    :y="item.y"
    :w="item.w"
    :h="item.h"
    :i="item.i"
    drag-allow-from=".drag-button"
    resize-allow-from=".drag-button"
  >
        <div class="auto-grid-item">
          <div class="drag-button">
            <div>drag</div>
          </div>
          <span class="text">{{ item.i }}</span>
          <hr>
          <el-button @click="removeItem(item.i)">remove</el-button>
          <el-select
            placeholder="Select"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in [1,2,3,4,5,6,7,8,9]"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>  
        </div>
      </GridItem>
    <!-- <template #item="{ item }">
      <div style="background-color: #ccc;width: 100%;height: 100%;">{{ item.i }}</div>
    </template> -->
  </GridLayout>
  <div style="height: 500px;background-color: aqua;"></div>
 </div>
</template>


<script setup>
import { GridLayout, GridItem } from 'grid-layout-plus'
import { ref, reactive } from 'vue'

const layout = reactive([
  { x: 0, y: 0, w: 2, h: 2, i: '0' },
  { x: 2, y: 0, w: 2, h: 2, i: '1' },
  { x: 4, y: 0, w: 2, h: 2, i: '2' },
  { x: 6, y: 0, w: 2, h: 2, i: '3' },
  { x: 8, y: 0, w: 2, h: 2, i: '4' }
])

function resizedEvent(i, newX, newY) {
  const msg =
    'RESIZED i=' + i + ', X=' + newX + ', Y=' + newY;
  console.log(msg)
}
function moveEvent(i, newX, newY) {
  const msg = 'MOVE i=' + i + ', X=' + newX + ', Y=' + newY
  console.log(msg)
}
function layoutUpdatedEvent(newLayout) {
  console.log('Updated layout: ', newLayout)
  console.log(layout)
}
function addItem() {
  layout.push({
    x: (layout.length * 2) % (colNum.value || 12),
    y: layout.length + (colNum.value || 12), // puts it at the bottom
    w: 2,
    h: 2,
    i: `${index++}`
  })
}

function removeItem(id) {
  const index = layout.findIndex(item => item.i === id)

  if (index > -1) {
    layout.splice(index, 1)
  }
}
// function add() {
//   //找到当前y最大一个元素
//   layout.push()
// }

</script>

<style scoped>
.auto-grid-container {
  width: 800px;
  background-color: #eee;
  padding: 10px;
  box-sizing: border-box;
  
}
.auto-grid-item  {
  background-color: #fff;
  position: relative;
  width: 100%;
  height: 100%;
}
.drag-button {
  height: 30px;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
}
.drag-button > div {
  padding: 4px;
  height: 20px;
  background-color: #ccc;
}

</style>


<style>
.vgl-item:hover > .vgl-item__resizer {
  opacity: 1;
}
.vgl-item__resizer {
  width: 16px;
  height: 16px;
  opacity: 0;
}
.vgl-item__resizer:before {
  border-color: #409eff;
}

</style>