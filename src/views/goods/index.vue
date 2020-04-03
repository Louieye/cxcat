<template>
    <div>
    <el-input placeholder="请输入内容" v-model="search" class="searchInput">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
  <el-button type="primary" round style="margin-left: 3%" @click="handleAdd">添加课程</el-button>
    <el-table
    v-loading="loading"
    :data="tableData.filter(data => !search
    || data.id == search
    || data.title.toLowerCase().includes(search.toLowerCase())
    || data.teacher.toLowerCase().includes(search.toLowerCase())
    || data.tag.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="课程名称">
            <span>{{ props.row.title }}</span>
          </el-form-item>
          <el-form-item label="课程价格">
            <span>￥{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="课程 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{props.row.onsale?'在售':'停售'}}</span>
          </el-form-item>
          <el-form-item label="课程标签">
            <span>{{ props.row.tag }}</span>
          </el-form-item>
          <el-form-item label="教师">
            <span>{{ props.row.teacher }}</span>
          </el-form-item>
          <el-form-item label="课程概述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
          <el-form-item label="教师介绍">
            <span>{{ props.row.teacher_d }}</span>
          </el-form-item>
          <el-form-item label="课程章节">
            <span>{{ props.row.list }}</span>
          </el-form-item>
          <el-form-item label="课程详情">
            <span>{{ props.row.details }}</span>
          </el-form-item>
          <el-form-item label="课程图片URL">
            <span>{{ props.row.thumb }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="课程 ID"
      prop="id"
      sortable>
    </el-table-column>
    <el-table-column
      label="课程名称"
      prop="title">
    </el-table-column>
    <el-table-column
      label="课程价格"
      prop="price"
      sortable>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
      <el-button-group>
  <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
  <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
</el-button-group>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
  title="添加/编辑课程"
  :visible.sync="dialogVisible"
  width="900px"
  :before-close="handleClose">
  <el-form ref="form" :rules="rules" :model="form" label-width="80px">
  <el-form-item label="课程ID">
    <span>{{ form.id }}</span>
  </el-form-item>
  <el-form-item label="课程名称" prop="title">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="课程标签" prop="tag">
    <el-select v-model="form.tag" placeholder="请选择课程标签">
      <el-option label="畅销" value="畅销"></el-option>
      <el-option label="免费" value="免费"></el-option>
      <el-option label="最新" value="最新"></el-option>
      <el-option label="活动" value="活动"></el-option>
      <el-option label="其他" value="其他"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="课程价格" prop="price">
    <el-input v-model.number="form.price"></el-input>
  </el-form-item>
  <el-form-item label="课程概述">
    <el-input v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item label="课程教师">
    <el-input v-model="form.teacher"></el-input>
  </el-form-item>
  <el-form-item label="课程章节">
    <el-input v-model="form.list" placeholder="请输入一个章节数组"></el-input>
  </el-form-item>
  <el-form-item label="状态">
    <el-switch v-model="form.onsale"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-text="在售"
    inactive-text="停售"></el-switch>
  </el-form-item>
  <el-form-item label="课程详情">
    <el-input type="textarea" v-model="form.details"></el-input>
  </el-form-item>
  <el-form-item label="教师详情">
    <el-input type="textarea" v-model="form.teacher_d"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogClose">取 消</el-button>
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
    data(){
        return {
          loading: true,
            tableData: [],
            form: {},
            isEdit: false,
            search: '',
            dialogVisible: false,
            rules: {
                title: [
                    { required: true, message: '请输入课程名称', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入课程价格', trigger: 'blur' },
                    { type: 'number', message: '课程价格必须为数字', trigger: 'blur' }
                ],
                tag: [
                    { required: true, message: '请选择课程标签', trigger: 'blur' }
                ]
            }
        }  
    },
    async mounted() {
        const query = 'db.collection("goods").get()'
        const res = await getInfo(query)
        const data = jsonFormat(res)
        this.tableData = data
        this.loading = false
    },
    methods: {
        //编辑
        handleEdit(index, row){
            this.form = this.tableData.find(item => item.id == row.id)
            this.isEdit = true
            this.dialogVisible = true
        },
        //删除
        handleDelete(index, row){
          this.$confirm('确认删除？')
          .then(_ => {
            const query = 'db.collection("goods").where({id:' + JSON.stringify(row.id) + '}).remove()'
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
        //添加课程
        handleAdd(){
            this.form.id = this.mkId()
            this.dialogVisible = true
        },
        //提交表单
        handleSubmit(){
            const list = this.form.list.split(',')
            this.form.list = list
            console.log('list', list);
            
            this.$refs['form'].validate( async(valid) => {
              if (valid) {
                if (this.isEdit == true) {
                  const query = 'db.collection("goods").where({id:' + JSON.stringify(this.form.id) + '}).update({data:' + JSON.stringify(this.form) + '})'
                  const res = await updateInfo(query)
                  if (res.status == 200) {
                    this.$message.success('修改成功')
                    this.reload()
                    this.isEdit = false
                  } else {
                    this.$message.error('修改失败')
                    this.isEdit = false
                  }
                }else{
                  const query = 'db.collection("goods").add({data:[' + JSON.stringify(this.form) + ']})'
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
                console.log('输入信息有误')
                return false;
              }
            })
            
        },
        dialogClose(){
            this.$confirm('确认关闭？')
          .then(_ => {
              this.dialogVisible = false
              this.isEdit = false
              this.resetForm()
            done();
          })
          .catch(_ => {});
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
              this.resetForm()
              this.isEdit = false
            done();
          })
          .catch(_ => {});
      },
      mkId(){
      const ids = []
      this.tableData.forEach(item => {
        ids.push(parseInt(item.id))
      })
      const maxId = Math.max(...ids)
      return maxId + 1
    },
    resetForm(){
      this.form = {}
    }
    }
}
</script>

<style lang="scss" scoped>
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
    width: 50%;
  }
  .searchInput {
      width: 50%;
      margin-top: 3%;
      margin-left: 50%;
      transform: translate(-50%,0);
  }
</style>
