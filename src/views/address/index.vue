<template>
  <div class="mainBox">
    <el-button
      class="addButton"
      @click="handleAdd"
    ><i class="el-icon-circle-plus-outline" />  添加</el-button>
    <el-table
      v-loading="loading"
      style="width: 100%"
      :data="tableData"
    >
      <el-table-column
        label="地名"
        prop="name"
      />
      <el-table-column
        label="地址"
        prop="address"
      />
      <el-table-column
        label="经度"
        prop="latitude"
      />
      <el-table-column
        label="纬度"
        prop="longitude"
      />
      </el-table-column>
      <el-table-column
        label="操作"
        width="130px"
      >
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleEdite(scope.row)" />
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框 -->
    <el-dialog
      :title="isEdit?'编辑内容':'添加内容'"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="地名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="经度" prop="latitude">
          <el-input v-model="form.latitude" />
        </el-form-item>
        <el-form-item label="纬度" prop="longitude">
          <el-input v-model="form.longitude" />
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
import { getInfo, addInfo, deleteInfo, updateInfo } from '@/api/submitFn'
import { jsonFormat } from '@/utils/jsonFormat'
import { formatDate } from '@/utils/date'

export default {
  inject: ['reload'],
  data() {
    return {
      isEdit: false,
      loading: true,
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        address: '',
        latitude: 0,
        longitude: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入地名', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted() {
    const query = 'db.collection("address").get()'
    const res = await getInfo(query)
    const data = jsonFormat(res)
    this.tableData = data
    this.loading = false
  },
  methods: {
    // 添加方法
    handleAdd(index, row) {
      this.dialogFormVisible = true
      this.isEdit = false
    },
    // 编辑方法
    handleEdite(row) {
      this.form = row
      this.dialogFormVisible = true
      this.isEdit = true
    },
    // 删除方法
    handleDelete(row) {
      this.$confirm('确认删除？')
        .then(_ => {
          const query = 'db.collection("address").where({_id:' + JSON.stringify(row._id) + '}).remove()'
          deleteInfo(query).then(res => {
            if (res.status == 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.reload()
            } else {
              this.$message({
                type: 'error',
                message: '删除失败'
              })
            }
          })
        })
        .catch(_ => {})
    },
    // 提交表单
    handleSubmit() {
      this.form.latitude = parseFloat(this.form.latitude)
      this.form.longitude = parseFloat(this.form.longitude)
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          if (this.isEdit == true) {
            const query = 'db.collection("address").where({_id:' + JSON.stringify(this.form._id) + '}).update({data:' + JSON.stringify(this.form) + '})'
            const res = await updateInfo(query)
            if (res.status == 200) {
              this.$message.success('修改成功')
              this.reload()
              this.isEdit = false
            } else {
              this.$message.error('修改失败')
              this.isEdit = false
            }
          } else {
            const query = 'db.collection("address").add({data:[' + JSON.stringify(this.form) + ']})'
            const res = await addInfo(query)
            if (res.status == 200) {
              this.resetForm()
              this.dialogVisible = false
              this.$message.success('添加成功')
              this.reload()
            } else {
              this.resetForm()
              this.dialogVisible = false
              this.$message.error('添加失败')
            }
          }
        } else {
          console.log('输入信息有误')
          return false
        }
      })
    },
    // 关闭dialog
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogFormVisible = false
          this.isEdit = false
          this.resetForm()
        })
        .catch(_ => {})
    },
    resetForm() {
      this.form = {
        name: '',
        address: '',
        latitude: 0,
        longitude: 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .mainBox {
      width: 95%;
      margin: 0 auto;
    }
    .el-table {
        margin: 20px auto;
        border: 1px solid gainsboro;
        border-radius: 5px;
    }
    .addButton {
        margin-left: 0%;
        margin-top: 2%;
    }
    .searchInput {
        width: 70%;
    }
    .el-icon-search {
        font-weight: bold;
        font-size: 15px;
    }
    .el-collapse {
        margin: 1% 2%;
        border: 1px solid gainsboro;
        border-radius: 5px;
    }
    .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
