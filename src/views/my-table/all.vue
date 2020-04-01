<template>
    <div> 
    <div class="addButton">
        <el-button
        type="primary"
        @click="handleAdd">
        添加课程
        </el-button>
    </div>
    <div class="searchInput">
        <i class="el-icon-search" />
        <el-input
      v-model="search"
      size="mini"
      placeholder="输入关键字搜索"/>
    </div>
    <el-table
    :data="tableData.filter(data => !search || data.id == search || data.name.toLowerCase().includes(search.toLowerCase()) || data.day.toLowerCase().includes(search.toLowerCase()) || data.date.toLowerCase().includes(search.toLowerCase()) || data.type.toLowerCase().includes(search.toLowerCase()) || data.teacher.toLowerCase().includes(search.toLowerCase()) || data.classroom.toLowerCase().includes(search.toLowerCase()))"
    style="width: 95%"
    v-loading="loading"
    >
    <el-table-column
      label="ID"
      prop="id"
      width="50px"
      >
    </el-table-column>
    <el-table-column
      label="周期"
      prop="date">
    </el-table-column>
    <el-table-column
      label="星期"
      prop="day"
      sortable>
    </el-table-column>
    <el-table-column
      label="课程名"
      prop="name"
      sortable>
    </el-table-column>
    <el-table-column
      label="分类"
      prop="type"
      sortable>
    </el-table-column>
    <el-table-column
      label="教师"
      prop="teacher"
      sortable>
    </el-table-column>
    <el-table-column
      label="上课地点"
      prop="classroom"
      sortable>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
  title="添加/编辑课表"
  :visible.sync="dialogVisible"
  width="40%"
  :before-close="handleClose">
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="ID" prop="id">
    <el-input v-model="form.id" disabled style="width: 25%"></el-input>
  </el-form-item>
  <el-form-item label="课程名称" prop="name">
    <el-input v-model="form.name" style="width: 50%"></el-input>
  </el-form-item>
  <el-form-item label="课程分类" prop="type">
    <el-select v-model="form.type" placeholder="请选择分类" style="width: 50%">
      <el-option label="scratch" value="scratch"></el-option>
      <el-option label="python" value="python"></el-option>
      <el-option label="C++" value="C++"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="教师" prop="teacher">
    <el-input v-model="form.teacher" style="width: 50%"></el-input>
  </el-form-item>
  <el-form-item label="上课地点" prop="classroom">
    <el-input v-model="form.classroom" style="width: 50%"></el-input>
  </el-form-item>
  <el-form-item label="课程周期">
    <el-col :span="11">
    <el-form-item prop="startDate">
      <el-date-picker type="date" placeholder="选择开始日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
    </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
    <el-form-item prop="endDate">
      <el-date-picker type="date" placeholder="选择结束日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
    </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="课程星期" prop="day">
    <el-select v-model="form.day" placeholder="请选择星期" style="width: 50%">
      <el-option label="星期一" value="1"></el-option>
      <el-option label="星期二" value="2"></el-option>
      <el-option label="星期三" value="3"></el-option>
      <el-option label="星期四" value="4"></el-option>
      <el-option label="星期五" value="5"></el-option>
      <el-option label="星期六" value="6"></el-option>
      <el-option label="星期天" value="7"></el-option>
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
  placeholder="选择时间">
</el-time-select>
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
import { getClassTable, submitClassTable, deleteTable } from '@/api/classTable'
import { getInfo } from '@/api/submitFn'
import { jsonFormat } from '@/utils/jsonFormat'

export default {
  inject: ['reload'],
    data() {
      return {
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
    methods: {
        handleEdit(index, row){
            this.dialogVisible = true
            this.form = this.tableData.find(item => item.id == row.id)
        },
        handleSubmit(){
            this.$refs['form'].validate((valid) => {
              if (valid) {
                const data = {
                  env: 'lyj-app',
                  query: 'db.collection(\"classTable\").add()',
                  data: [this.form]
                }
                console.log(JSON.stringify(data));
                submitClassTable(JSON.stringify(data)).then(res =>{
                  if(jsonFormat(res).errcode && jsonFormat(res).errcode == 0){
                    this.resetForm('form')
                    this.dialogVisible = false
                    this.$message.success('操作成功')
                    this.reload()
                  }else{
                    this.resetForm('form')
                    this.dialogVisible = false
                    this.$message.error('操作失败')
                    this.reload()
                  } 
            })
              } else {
                console.log('数据格式不正确');
                return false;
              }
            });
            
        },
        async handleAdd(){
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
        handleDelete(index, row){
            const id = row.id
        this.$confirm('确认删除？')
          .then(_ => {
              deleteTable({id: id}).then(res=>{
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                })
                setTimeout(()=>{
                this.$router.go(0)
              },1000)
              })
          })
          .catch(_ => {})
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
              this.dialogVisible = false
            done()
          })
          .catch(_ => {})
        },
    mkId(){
      const ids = []
      this.tableData.forEach(item => {
        ids.push(parseInt(item.id))
      })
      const maxId = Math.max(...ids)
      return maxId + 1
    }
    },
    async mounted(){
      const data = {
        env: 'lyj-app',
        query: 'db.collection(\"classTable\").get()'
      }
      const submitData = JSON.stringify(data)
      const res = await getInfo(submitData)
      const table = jsonFormat(res)
      console.log(table)    
      table.forEach(item => {
          item.date = item.startDate + '~' + item.endDate
      })
      this.tableData = table
      this.loading = false
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
