<template>
  <div>
    <div class="addButton">
      <el-button
        type="primary"
        @click="handleAdd"
      >
        添加课程
      </el-button>
    </div>
    <div class="searchInput">
      <i class="el-icon-search" />
      <el-input
        v-model="search"
        size="mini"
        placeholder="输入关键字搜索"
      />
    </div>
    <el-table
      v-loading="loading"
      :data="tableData.filter(data => !search || data.id == search || data.name.toLowerCase().includes(search.toLowerCase()) || data.day.toLowerCase().includes(search.toLowerCase()) || data.date.toLowerCase().includes(search.toLowerCase()) || data.type.toLowerCase().includes(search.toLowerCase()) || data.teacher.toLowerCase().includes(search.toLowerCase()) || data.classroom.toLowerCase().includes(search.toLowerCase()))"
      style="width: 95%"
    >
      <el-table-column
        label="ID"
        prop="id"
        width="50px"
      />
      <el-table-column
        label="周期"
        prop="date"
      />
      <el-table-column
        label="星期"
        prop="day"
        sortable
      />
      <el-table-column
        label="课程名"
        prop="name"
        sortable
      />
      <el-table-column
        label="分类"
        prop="type"
        sortable
      />
      <el-table-column
        label="教师"
        prop="teacher"
        sortable
      />
      <el-table-column
        label="上课地点"
        prop="classroom"
        sortable
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加/编辑课表"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" disabled style="width: 25%" />
        </el-form-item>
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="form.name" style="width: 50%" />
        </el-form-item>
        <el-form-item label="课程分类" prop="type">
          <el-select v-model="form.type" placeholder="请选择分类" style="width: 50%">
            <el-option label="scratch" value="scratch" />
            <el-option label="python" value="python" />
            <el-option label="C++" value="C++" />
          </el-select>
        </el-form-item>
        <el-form-item label="教师" prop="teacher">
          <el-input v-model="form.teacher" style="width: 50%" />
        </el-form-item>
        <el-form-item label="上课地点" prop="classroom">
          <el-input v-model="form.classroom" style="width: 50%" />
        </el-form-item>
        <el-form-item label="课程周期">
          <el-col :span="11">
            <el-form-item prop="startDate">
              <el-date-picker v-model="form.startDate" type="date" placeholder="选择开始日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endDate">
              <el-date-picker v-model="form.endDate" type="date" placeholder="选择结束日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="课程星期" prop="day">
          <el-select v-model="form.day" placeholder="请选择星期" style="width: 50%">
            <el-option label="星期一" value="1" />
            <el-option label="星期二" value="2" />
            <el-option label="星期三" value="3" />
            <el-option label="星期四" value="4" />
            <el-option label="星期五" value="5" />
            <el-option label="星期六" value="6" />
            <el-option label="星期天" value="7" />
          </el-select>
        </el-form-item>
        <el-form-item label="上课时间" prop="time">
          <el-time-select
            v-model="form.time"
            :picker-options="{
              start: '08:00',
              step: '00:15',
              end: '18:30'
            }"
            style="width: 50%"
            placeholder="选择时间"
          />
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

export default {
  inject: ['reload'],
  data() {
    return {
      isEdit: false, // 判断是添加还是修改
      dialogVisible: false,
      loading: true,
      form: {
        id: '',
        name: '',
        type: '',
        teacher: '',
        classroom: '',
        startDate: '',
        endDate: '',
        day: '',
        time: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择课程分类', trigger: 'change' }
        ],
        teacher: [
          { required: true, message: '请输入教师', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        day: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ]
      },
      tableData: [],
      search: ''
    }
  },
  async mounted() {
    const query = 'db.collection("classTable").get()'
    const res = await getInfo(query)
    const table = jsonFormat(res)
    if (table && table.length > 0) {
      table.forEach(item => {
        item.date = item.startDate + '~' + item.endDate
      })
      this.tableData = table
    }
    this.loading = false
  },
  methods: {
    handleEdit(index, row) {
      this.dialogVisible = true
      this.form = this.tableData.find(item => item.id == row.id)
      this.isEdit = true
    },
    handleSubmit() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          if (this.isEdit == true) {
            const query = 'db.collection("classTable").where({id:' + JSON.stringify(this.form.id) + '}).update({data:' + JSON.stringify(this.form) + '})'
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
            const query = 'db.collection("classTable").add({data:[' + JSON.stringify(this.form) + ']})'
            const res = await addInfo(query)
            if (res.status == 200) {
              this.resetForm('form')
              this.dialogVisible = false
              this.$message.success('操作成功')
              this.reload()
            } else {
              this.resetForm('form')
              this.dialogVisible = false
              this.$message.error('操作失败')
            }
          }
        } else {
          console.log('数据格式不正确')
          return false
        }
      })
    },
    async submitEdit() {
      const query = 'db.collection("classTable").where({id:[' + JSON.stringify(this.form.id) + ']}).update({data:' + JSON.stringify(this.form) + '})'
      const res = await updateInfo(query)
      if (res.status == 200) {
        this.$message.success('修改成功')
        this.reload()
        this.isEdit = false
      } else {
        this.$message.error('修改失败')
        this.isEdit = false
      }
    },
    async handleAdd() {
      this.form = {
        id: this.mkId(),
        name: '',
        type: '',
        teacher: '',
        classroom: '',
        startDate: '',
        endDate: '',
        day: ''
      }
      this.dialogVisible = true
    },
    handleDelete(index, row) {
      const id = row.id
      this.$confirm('确认删除？')
        .then(_ => {
          const query = 'db.collection("classTable").where({id:' + JSON.stringify(id) + '}).remove()'
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
        .catch(_ => {})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogVisible = false
          this.isEdit = false
          done()
        })
        .catch(_ => {})
    },
    mkId() {
      const ids = []
      this.tableData.forEach(item => {
        ids.push(parseInt(item.id))
      })
      const maxId = Math.max(...ids)
      return maxId + 1
    }
  }
}
</script>

<style lang="scss" scoped>
    .el-input {
        width: 20%;
    }
    .searchInput {
        margin-top: 2%;
        margin-bottom: 1%;
        margin-left: 2.5%;
    }
    .el-table {
        margin: 0 auto;
    }
    .line{
        padding-left: 15px;
    }
    .addButton{
        margin-top: 2%;
        margin-bottom: 1%;
        margin-left: 2.5%;
    }
</style>
