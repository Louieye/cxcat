<template>
  <div class="mainBox">
    <el-button
      class="addButton"
      @click="handleAdd"
    ><i class="el-icon-circle-plus-outline" />  添加</el-button>
    <el-table
      style="width: 100%"
      :data="tableData.filter(data => !search || data.id === search)"
    >
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
        prop="id"
        width="150px">
        <template slot="header" slot-scope="scope">
          ID
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入ID搜索"
            class="searchInput"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="测验分类"
        prop="title"
      />
      <el-table-column
        label="出题人"
        prop="author"
      />
      <el-table-column
        label="更新日期"
        prop="date"
      />
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isActive"
            :active-text="scope.row.isActive?'启用':'停用'"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeSwitch(scope.row)"
          />
        </template>
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
      :title="targetData.id?'编辑内容':'添加内容'"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
      <addForm :target="targetData" @submit-form="addTable" />
      <el-button type="danger" class="closeButton" @click="handleClose">取 消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import addForm from './addForm'
import { formatDate } from '@/utils/date'
import { testSubmit, getTest, deleteTest } from '@/api/test'

export default {
  components: {
    addForm
  },
  data() {
    return {
      targetData: {},
      tableData: [],
      search: '',
      dialogFormVisible: false,
      form: {
      }
    }
  },
  async mounted() {
    const table = await getTest()
    this.tableData = table.data
  },
  methods: {
    // 添加方法
    handleAdd(index, row) {
      this.targetData = {}
      this.dialogFormVisible = true
    },
    // 编辑方法
    handleEdite(row) {
      this.targetData = row
      this.dialogFormVisible = true
    },
    // 删除方法
    handleDelete(row) {
      this.$confirm('确认删除？')
        .then(_ => {
          deleteTest(row.id).then(res => {
            if (res.code === 20000) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.$router.go(0)
            }
          })
        })
        .catch(_ => {})
    },
    // 关闭dialog
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogFormVisible = false
        })
        .catch(_ => {})
    },
    // 添加表单请求
    async addTable(data) {
      const newTest = this.add(data)
      await testSubmit(newTest).then(res => {
        this.dialogFormVisible = false
        if (res.data === '1') {
          this.tableData.push(newTest)
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        } else if (res.data === '2') {
          const index = this.tableData.findIndex(item => item.id === newTest.id)
          this.tableData[index] = newTest
        }
      })
    },
    add(data) {
      const newTest = {}
      const date = new Date().getTime()
      newTest.id = data.testId || 0
      newTest.question = data.testContent || '未定义'
      newTest.date = formatDate(date)
      newTest.answer = data.type || '无'
      newTest.title = data.title || '未定义'
      newTest.isActive = true
      newTest.a = data.a || '无'
      newTest.b = data.b || '无'
      newTest.c = data.c || '无'
      newTest.d = data.d || '无'
      newTest.author = this.$store.state.user.name
      return newTest
    },
    changeSwitch(data) {
      testSubmit(data).then(res => {
        if (res.code === 20000) {
          this.$message({
            type: 'success',
            message: '更改成功'
          })
        } else {
          this.$message.error('更改失败')
        }
      })
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
  .closeButton {
    margin-left: 50%;
    transform: translate(-50%,0);
    width: 30%;
  }
  .searchInput {
    width: 70%;
  }
</style>
