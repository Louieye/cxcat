<template>
  <div class="mainBox">
    <el-button type="primary" class="addButton" @click="handleAdd">添加</el-button>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 95%"
      v-loading="loading"
    >
    <el-table-column
        prop="id"
        label="课程ID"
        sortable
        column-key="id"
      />
      <el-table-column
        prop="date"
        label="提交日期"
        sortable
        column-key="date"
      />
      <el-table-column
        prop="course"
        label="课程"
        sortable
        column-key="course"
      />
      <el-table-column
        prop="teacher"
        label="教师"
        sortable
        column-key="teacher"
      />
      <!-- <el-table-column
        prop="tag"
        label="状态"
        :filters="[{ text: '已提交', value: '已提交' }, { text: '未提交', value: '未提交' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '未提交' ? 'primary' : 'success'"
            disable-transitions
          >{{ scope.row.tag }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-view"
            @click="showCard(scope.$index,scope.row)"
          />
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          />
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="内容"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="课程ID" prop="id">
          <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item label="课程名" prop="course">
          <el-input v-model="form.course" />
        </el-form-item>
        <el-form-item label="内容" prop="desc">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item size="large" class="el-form-button">
          <el-button ref="content" type="primary" @click="submitEdit">提交</el-button>
          <el-button @click="Close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-card :class="[this.cardShow?'box-card':'hidden']" shadow="always">
      <div slot="header" class="clearfix">
        <span>课程小结</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="cardShow=false">关闭</el-button>
      </div>
      <div class="text item">
        {{ desc }}
      </div>
    </el-card>
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
      loading: true,
      isAdd: false,
      dialogVisible: false,
      cardShow: false,
      tableData: [],
      desc: '',
      form: {
        id: '',
        course: '',
        date: '',
        desc: '',
        teacher: ''
      }
    }
  },
  async mounted() {
    const query = 'db.collection("reply").get()'
    const res = await getInfo(query)
    const data = jsonFormat(res)
    const roles = this.$store.state.user.roles
    if(roles !='admin'){
      const name = this.$store.state.user.name
      this.tableData = data.filter(item => item.teacher === name)
    }else{
      this.tableData = data
    }
    this.loading = false
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.resetForm()
          this.isAdd = false
          done()
        })
        .catch(_ => {})
    },
    Close(){
      this.dialogVisible = false
      this.resetForm()
    },
    handleEdit(index, row) {
      this.form = this.tableData.find(item=> item.id === row.id)
      this.dialogVisible = true
      this.cardShow = false
    },
    async handleDelete(index, row) {
      this.$confirm('确认删除？')
        .then(_ => {
          // this.tableData.find(item=>item.id === row.id).tag = '未提交'
          this.cardShow = false
          const query = 'db.collection("reply").where({id:' + JSON.stringify(row.id) + '}).remove()'
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
    // formatter(row, column) {
    //   return row.text
    // },
    filterTag(value, row) {
      return row.tag === value
    },
    async submitEdit() {
      const date = new Date().getTime()
      this.form.date = formatDate(date)
      this.form.teacher = this.$store.state.user.name
      if(this.isAdd == false){
      const query = 'db.collection("reply").where({id:' + JSON.stringify(this.form.id) + '}).update({data:' + JSON.stringify(this.form) + '})'
      const res = await updateInfo(query)
      this.dialogVisible = false
      if (res.status == 200) {
        this.$message.success('修改成功')
        this.reload()
      } else {
        this.$message.error('修改失败')
      }
      }else{
        const query = 'db.collection("reply").add({data:[' + JSON.stringify(this.form) + ']})'
        const res = await addInfo(query)
        if (res.status == 200) {
          this.resetForm('form')
          this.dialogVisible = false
          this.$message.success('添加成功')
          this.reload()
        } else {
          this.resetForm('form')
          this.dialogVisible = false
          this.$message.error('添加失败')
        }
      }
      this.isAdd = false
    },
    resetForm() {
      this.form = {
        id: '',
        course: '',
        date: '',
        desc: '',
        teacher: ''
      }
    },
    handleAdd() {
      this.dialogVisible = true
      this.isAdd = true
    },
    showCard(index, row) {
      this.cardShow = true
      this.desc = this.tableData.find(item=> item.id === row.id).desc
    }
  }
}
</script>

<style lang="scss" scoped>
    .mainBox {
      min-width:900px;
      margin-top: 40px;
    }
    .addButton {
      margin-left: 2.5%;
      width: 100px;
      margin-bottom: 2%;
    }
    .el-table {
      margin: 0 auto;
      border: 1px solid gainsboro;
      border-radius: 5px;
    }
    .head-tag {
        height: 200px;
    }
    .el-form-button {
      padding-left: 69%;
    }
    .el-dialog__body {
      padding: 0;
    }
    .text {
    font-size: 14px;
  }
  //卡片
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 580px;
  }
  .box-card {
    z-index: 3;
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    top: 17%;
  }
  .hidden {
    display: none;
  }
</style>
