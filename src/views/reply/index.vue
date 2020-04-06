<template>
  <div>
    <el-row class="head">
      <el-col :span="4">
        <el-card class="box-card">
          <span>
            今日预约：{{ tadayApoin }}
          </span>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="box-card">
          <span>
            未确认：{{ notCheck }}
          </span>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="box-card">
          <span>
            已完成：{{ isDone }}
          </span>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="box-card">
          <span>
            全部预约：{{ tableData.length }}
          </span>
        </el-card>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :default-sort="{prop: 'date', order: 'descending'}"
      :data="tableData"
      class="table"
    >
      <el-table-column
        sortable
        prop="date"
        label="日期"
        width="150"
      />
      <el-table-column
        sortable
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
        sortable
        prop="childAge"
        label="孩子年龄"
      />
      <el-table-column
        prop="tag"
        label="状态"
        :filters="[{ text: '已完成', value: 2 }, { text: '预约中', value: 1 }, { text: '未确认', value: 0 }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag == 0 ? 'warning' : scope.row.tag == 1 ? 'primary' : 'success'"
            disable-transitions
          >{{ scope.row.tag == 0?'未确认' : scope.row.tag == 1 ? '预约中' : '已完成' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="170"
      >
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-check" circle @click="handleCheck(scope.$index, scope.row)" />
          <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)" />
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改预约信息"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="预约课程">
          <el-input v-model="form.title" disabled />
        </el-form-item>
        <el-form-item label="预约时间">
          <el-input v-model="form.date" />
        </el-form-item>
        <el-form-item label="反馈信息">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo, deleteInfo, updateInfo } from '@/api/submitFn'
import { jsonFormat } from '@/utils/jsonFormat'

export default {
  inject: ['reload'],
  data() {
    return {
      dialogVisible: false,
      loading: true,
      tadayApoin: 0,
      notCheck: 0,
      isDone: 0,
      tableData: [],
      form: {}
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
    this.checkTime()
    this.getNotCheck()
    this.getTodayApoin()
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
    },
    handleEdit(row) {
      this.form = this.tableData.find(item => item._id == row._id)
      this.dialogVisible = true
      console.log(this.form)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogVisible = false
          this.form = {}
          done()
        })
        .catch(_ => {})
    },
    async handleSubmit() {
      const query = 'db.collection("appointment").where({_id:' + JSON.stringify(this.form._id) + '}).update({data:' + JSON.stringify(this.form) + '})'
      const res = await updateInfo(query)
      if (res.status == 200) {
        this.$message.success('修改成功')
        this.reload()
      } else {
        this.$message.error('修改失败')
      }
    },
    async handleCheck(index, row) {
      if (row.tag == 0) {
        this.tableData.find(item => item._id == row._id).tag = 1
        const query = 'db.collection("appointment").where({_id:' + JSON.stringify(row._id) + '}).update({data:{tag:1}})'
        const res = await updateInfo(query)
        if (res.status == 200) {
          this.$message.success('确认成功')
        }
      } else {
        this.$message.warning('无效操作, 预约已确认或已完成')
      }
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    checkTime() {
      const now = new Date().getTime()
      let sum = 0
      this.tableData.forEach((item, index) => {
        let date = item.date
        date = date.replace('年', '')
        date = date.replace('月', '')
        date = date.replace('日', '')
        const appoinDate = new Date(date).getTime()
        if (now > appoinDate) {
          this.tableData[index].tag = 2
          sum++
        }
      })
      this.isDone = sum
    },
    getTodayApoin() {
      let sum = 0
      const today = new Date()
      this.tableData.forEach((item, index) => {
        let date = item.date
        date = date.replace('年', '')
        date = date.replace('月', '')
        date = date.replace('日', '')
        const appoinDate = new Date(date)
        if (today.getFullYear() == appoinDate.getFullYear() && today.getMonth() == appoinDate.getMonth() && today.getDate() == appoinDate.getDate()) {
          sum++
        }
      })
      this.tadayApoin = sum
    },
    getNotCheck() {
      let sum = 0
      this.tableData.forEach((item, index) => {
        if (item.tag == 0) {
          sum++
        }
      })
      this.notCheck = sum
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
    margin-top: 20px;
    margin-bottom: 10px;
    .box-card {
      margin-right: 30px;
      display: flex;
      justify-content: center;
      background-color: #85bdfd;
      color: white;
    }
}
.text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
</style>
