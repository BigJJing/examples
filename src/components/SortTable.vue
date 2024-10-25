<template>
  <div>
    <div>{{ list }}</div>
    <ul ref="sortBox">
      <li v-for="item in list" :key="item.index">{{ item.index }}</li>
    </ul>
    <div>{{ tableData }}</div>
    <el-table ref="elTableRef" :data="tableData" :border="true">
      <el-table-column prop="index" label="index" min-width="180" />
    </el-table>
  </div>
</template>

<script setup>
import Sortable from "sortablejs";
import { nextTick, onMounted, ref } from 'vue'

const sortBox = ref(null)
const list = ref([
  {index: 1},
  {index: 2},
  {index: 3}
])

const elTableRef = ref(null)
const tableData = ref([
  {index: 1},
  {index: 2},
  {index: 3}
])
onMounted(() => {
  const sort1 = new Sortable(sortBox.value, {
    animation: 150,
    onEnd: function (evt) {
      console.log(evt.oldIndex, evt.newIndex)
      list.value.splice()
      console.log(list.value)
      //把list的第evt.oldIndex个元素删除，然后插入到evt.newIndex的位置
      list.value.splice(evt.newIndex, 0, list.value.splice(evt.oldIndex, 1)[0])
      console.log(list.value)
    }
  })
  const sort2 = new Sortable(elTableRef.value.$el.querySelector('tbody'), {
    animation: 150,
    onEnd: function (evt) {
      console.log(evt.oldIndex, evt.newIndex)
      // tableData.value.splice()
      // console.log(tableData.value)
      //把tableData的第evt.oldIndex个元素删除，然后插入到evt.newIndex的位置
      const data = JSON.parse(JSON.stringify(tableData.value))
      const old = data.splice(evt.oldIndex, 1)[0]
      data.splice(evt.newIndex, 0, old)
      tableData.value = []
      nextTick(() => {
        tableData.value = data
      })
    }
  })
})
</script>

<style scoped>
ul li{
  list-style: none;
  border: 1px solid #ccc;
}
</style>