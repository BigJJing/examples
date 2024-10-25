<template>
  <a-range-picker
    @change="onChange"
    @select="onSelect"
    :shortcuts="shortcuts"
    shortcuts-position="left"
    style="width: 254px;">
    <template #extra>
      <div>
        <div>时间窗口类型</div>
      </div>
    </template>
  </a-range-picker>
</template>

<script setup>
import dayjs from 'dayjs';

function onChange() {}
function onSelect() {}
const shortcuts = [
        {
          label: 'next 2 days',
          value: () => [dayjs(), dayjs().add(2, 'day')],
        },
        {
          label: 'next 7 days',
          value: () => [dayjs(), dayjs().add(1, 'month')],
        },
        {
          label: 'next 30 days',
          value: () => [dayjs(), dayjs().add(1, 'month')],
        },
        {
          label: 'next 6 months',
          value: () => [dayjs(), dayjs().add(6, 'month')],
        },
        {
          label: 'next 12 months',
          value: () => [dayjs(), dayjs().add(1, 'year')],
        },
        {
          label: 'next 10 years',
          value: () => [dayjs(), dayjs().add(10, 'year')],
        }
      ]
</script>

