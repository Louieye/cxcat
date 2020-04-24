<template>
  <div>
    <div>
      <el-button
        type="primary"
        class="addButton"
        @click="dialogVisible = true"
      >
        添加学生
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
      :data="tableData.filter(data => !search || data.phone.toLowerCase().includes(search.toLowerCase()) || data.childName.toLowerCase().includes(search.toLowerCase()))"
      class="main"
    >
      <el-table-column
        label="姓名"
        prop="childName"
      />
      <el-table-column
        label="年龄"
        prop="childAge"
        sortable
      />
      <el-table-column
        label="课程ID"
        prop="classId"
      >
        <template slot-scope="scope">
          <div v-for="item in scope.row.classId" :key="item">
            <div>{{ item }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="电话"
        prop="phone"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加/编辑学生"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="childName">
          <el-input v-model="form.childName" style="width: 50%" />
        </el-form-item>
        <el-form-item label="年龄" prop="childAge">
          <el-input v-model="form.childAge" style="width: 50%" />
        </el-form-item>
        <el-form-item label="课程" prop="classId">
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="item in classData" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" style="width: 50%" />
        </el-form-item>
        <el-form-item label="邀请码" prop="invite">
          <el-input v-model="form.invite" style="width: 50%" />
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
      dialogVisible: false,
      loading: true,
      tableData: [],
      classData: [],
      checkList: [],
      form: {},
      search: '',
      isEdit: false
    }
  },
  async mounted() {
    const query = 'db.collection("students").get()'
    const res = await getInfo(query)
    // 返回数据如果只有一条 会返回object tableData是数组 赋值会报错
    if (!jsonFormat(res).length) {
      this.tableData = [jsonFormat(res)]
    } else {
      this.tableData = jsonFormat(res)
    }
    const query2 = 'db.collection("classTable").get()'
    const res2 = await getInfo(query2)
    if (!jsonFormat(res2).length) {
      this.classData = [jsonFormat(res2)]
    } else {
      this.classData = jsonFormat(res2)
    }
    this.loading = false
    console.log('tableData', this.tableData)
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogVisible = false
          this.form = {}
          this.isEdit = false
          this.reload()
          done()
        })
        .catch(_ => {})
    },
    handleEdit(row) {
      this.dialogVisible = true
      this.form = this.tableData.find(item => item._id == row._id)
      this.checkList = this.form.classId
      this.isEdit = true
    },
    handleDelete(row) {

    },
    async handleSubmit() {
      if (this.isEdit == true) {
        this.form.classId = Object.assign([], this.checkList)
        console.log(this.form)

        const query = 'db.collection("students").where({_id:' + JSON.stringify(this.form._id) + '}).update({data:' + JSON.stringify(this.form) + '})'
        const res = await updateInfo(query)
        if (res.status == 200) {
          this.$message.success('修改成功')
          this.isEdit = false
          this.reload()
        } else {
          this.$message.error('修改失败')
        }
      } else {
        this.form.classId = Object.assign([], this.checkList)
        this.form._openid = ''
        const query = 'db.collection("students").add({data:' + JSON.stringify(this.form) + '})'
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.addButton {
  margin-left: 2.5%;
  margin-top: 2.5%;
}
.el-input {
        width: 20%;
}
.searchInput {
    margin-top: 2%;
    margin-bottom: 1%;
    margin-left: 2.5%;
}
.main {
  width: 95%;
  margin-left: 2.5%;
}
</style>
