<template>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="500">
      <el-table-column :width="item.width ? item.width : 125" :prop="item.prop" v-for="item in tableLabel"
        :key="item.prop" :label="item.label" />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default>
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
export default {
  setup() {
    const list = ref([])
    const tableLabel = reactive([
      {
        prop: 'name',
        label: '姓名'
      },
      {
        prop: 'age',
        label: '年龄'
      },
      {
        prop: 'sex',
        label: '性别'
      },
      {
        prop: 'birth',
        label: '出生日期',
        width: 200
      },
      {
        prop: 'addr',
        label: '地址',
        width: 320
      },
    ])
    onMounted(() => {
      getUserData();
    })
    const getUserData = async () => {
      await axios.get('/user/getUser').then((res) => {
        console.log(res.data.list);
        list.value = res.data.list.map(item => {
          item.sex = item.sex === 0 ? '女' : '男'
          return item
        })
      })
    };
    return {
      getUserData,
      list,
      tableLabel
    }
  }
}
</script>

<style>
</style>