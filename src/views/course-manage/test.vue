<template>
    <div class="mainBox">
    <el-button 
    class="addButton"
    @click="handleAdd"><i class="el-icon-circle-plus-outline" />  添加</el-button>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="题目">
            <div>{{ props.row.question }}</div>
          </el-form-item>
          <el-form-item label="选项">
            <div>A: {{ props.row.a }} ,
                 B: {{ props.row.b }} ,
                 C: {{ props.row.c }} ,
                 D: {{ props.row.d }}</div>
          </el-form-item>
          <el-form-item label="正确答案">
            <div>{{ props.row.answer }}</div>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="测验标题"
      prop="title">
    </el-table-column>
    <el-table-column
      label="更新日期"
      prop="date">
    </el-table-column>
    <el-table-column
      label="出题人"
      prop="author">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        <el-switch
          :active-text="scope.row.isActive?'启用':'停用'"
          active-color="#13ce66"
          inactive-color="#ff4949"
          v-model="scope.row.isActive"
          @change="changeSwitch(scope.row)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操做">
      <el-button @click="handleDelete">取 消</el-button>
    </el-table-column>
  </el-table>
    
  <!-- 弹出框 -->
  <el-dialog 
  title="添加测验"
  :visible.sync="dialogFormVisible"
  :before-close="handleClose">
  <addForm @submit-form="addTable"></addForm>
</el-dialog>
    </div>
</template>

<script>
import addForm from './addForm'
import { formatDate } from '@/utils/date'

export default {
    components: {
        addForm
    },
    data() {
      return {
        test:{},
        tableData: [{
          id: '12987122',
          title: '计算题',
          isActive: true,
          author: '王大虎',
          date: '2020-3-19',
          question: '1+1=?',
          a: '1',
          b: '2',
          c: '3',
          d: '4',
          answer: 'A'
        },{
          id: '12987122',
          title: '计算题',
          isActive: true,
          author: '王大虎',
          date: '2020-3-19',
          question: '1+1=?',
          a: '1',
          b: '2',
          c: '3',
          d: '4',
          answer: 'A'
        },{
          id: '12987122',
          title: '计算题',
          isActive: true,
          author: '王大虎',
          date: '2020-3-19',
          question: '1+1=?',
          a: '1',
          b: '2',
          c: '3',
          d: '4',
          answer: 'A'
        }],
        search: '',
        dialogFormVisible: false,
        form: {
        }
      }
    },
    methods: {
      handleAdd(index, row) {
        this.dialogFormVisible = true
      },
      handleDelete(index, row) {
        console.log(this.$refs);
        
      },
      handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
      },
    //   addForm(index, row) {
    //       this.$nextTick(()=>{
    //           this.$refs.addForm.init()
    //       })
    //   }
    addTable(data){
      const date = new Date().getTime()
      const newTest = {}
      newTest.id = data.testId || 0
      newTest.question = data.testContent || '未定义'
      newTest.date = formatDate(date)
      newTest.answer = data.type.join(',') || '未定义'
      newTest.a = data.a || '未定义'
      newTest.b = data.b || '未定义'
      newTest.c = data.c || '未定义'
      newTest.d = data.d || '未定义'
      newTest.author = this.$store.state.user.name
      console.log(newTest)
        
    },
    changeSwitch (data) {
      console.log(data)
    }
    }
  }
</script>

<style lang="scss" scoped>
    .el-table {
        margin: 20px auto;
        border: 1px solid gainsboro;
        border-radius: 5px;
    }
    .addButton {
        margin-left: 2.5%;
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
