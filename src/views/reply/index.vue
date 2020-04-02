<template>
  <div>
    <el-row class="head">
      <el-col :span="4">
        <el-card class="box-card">
          <div>
            今日预约：【1】
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="box-card">
          <div>
            全部预约：{{ tableData.length }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="tableData"
      class="table"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="150"
      />
      <el-table-column
        prop="title"
        label="课程"
      />
      <el-table-column
        prop="name"
        label="家长姓名"
      />
      <el-table-column
        prop="phone"
        label="联系方式"
      />
      <el-table-column
        prop="childName"
        label="孩子姓名"
      />
      <el-table-column
        prop="childAge"
        label="孩子年龄"
      />
      <el-table-column
        label="操作"
        width="170"
      >
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-check" circle />
          <el-button type="primary" icon="el-icon-edit" circle />
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getInfo, addInfo, deleteInfo, updateInfo } from '@/api/submitFn'
import { jsonFormat } from '@/utils/jsonFormat'

export default {
  inject: ['reload'],
  data() {
    return {
      loading: true,
      tableData: []
    }
  },
  async mounted() {
    const query = 'db.collection("appointment").get()'
    const res = await getInfo(query)
    // 返回数据如果只有一条 会返回object tableData是数组 赋值会报错
    if (!jsonFormat(res).length) {
      this.tableData = [jsonFormat(res)]
    } else {
      this.tableData = jsonFormat(res)
    }
    this.loading = false
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm('确认删除？')
        .then(_ => {
          const query = 'db.collection("appointment").where({_id:' + JSON.stringify(row._id) + '}).remove()'
          deleteInfo(query).then(res => {
            if (res.status == 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.reload()
            } else {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            }
          })
        })
    }
  }

}
</script>

<style lang="scss" scoped>
.table {
    width: 95%;
    margin: auto 20px;
}
.head {
    display: flex;
    justify-content: space-between;
}
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
</style>
