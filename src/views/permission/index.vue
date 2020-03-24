<template>
  <div>
    <!-- <div class="head-user">当前用户：{{this.$store.state.user.username}}</div> -->
    <el-button
      icon="el-icon-circle-plus-outline"
      type="primary"
      class="addButton"
      @click="handleAdd"
    >
      新增用户
    </el-button>
    <el-table
      :data="tableData"
      style="width: 90%"
      border
    >
      <el-table-column
        label="ID"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="权限"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              size="medium"
              :type="scope.row.token.split('-')[0] === 'admin'?'danger':''"
            >{{ scope.row.id === '1'?'Super Admin':scope.row.token.split('-')[0] }}</el-tag>
          </div>

        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-s-tools"
            @click="handleEdit(scope.$index, scope.row)"
          >修改密码</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.id === '1'?true:false"
            icon="el-icon-warning-outline"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
  title="添加/编辑用户"
  :visible.sync="dialogVisible"
  width="45%"
  :before-close="handleClose">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="ID" prop="id">
    <span>{{ mkId() }}</span>
  </el-form-item>
  <el-form-item label="用户名" prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="ruleForm.password" show-password></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="check">
    <el-input v-model="ruleForm.check" show-password></el-input>
  </el-form-item>
  <el-form-item label="权限" prop="token">
    <el-radio-group v-model="ruleForm.token">
      <el-radio label="editor"></el-radio>
      <el-radio label="admin"></el-radio>
    </el-radio-group>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('ruleForm')">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="修改密码"
  :visible.sync="dialogVisible2"
  width="40%"
  :before-close="handleClose">
  <el-steps :active="active" finish-status="success">
  <el-step title="请输入原始密码"></el-step>
  <el-step title="请输入新密码"></el-step>
  <el-step title="请确认新密码"></el-step>
</el-steps>
  <el-input v-model="ruleForm.check" show-password></el-input>
  
  <span slot="footer" class="dialog-footer">
    <el-button type="danger" @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" style="margin-top: 12px;" @click="next">{{this.active===2?'完成':'下一步'}}</el-button>
  </span>
</el-dialog>
  </div>

</template>

<script>
import { permissionInfo, submitInfo, submitChange, submitDelete } from '@/api/permission'

export default {
  data() {
    let checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
    let checkUser = (rule, value, callback) => {
      let flag = 0
      this.tableData.forEach(item => {
        if (value === item.username) {
          flag = 1
      }
      })
      if(flag === 1){
        callback(new Error("用户名已存在！"))
      }else{
        callback()
      }
    }
    return {
      active: 0,
      tableData: [],
      ruleForm: {
        id: '',
        name: '',
        username: '',
        password: '',
        check: '',
        token: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
          { validator: checkUser, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        check: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: checkPass, trigger: 'blur' }

        ],
        role: [
          { required: true, message: '请选择权限', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      dialogVisible2: false,
      reCheck: '',
      changeId: ''
    }
  },
  async mounted() {
    await permissionInfo().then(res => {
      this.tableData = res.data
    })
  },
  methods: {
    next() {
        // if (this.active++ > 2) this.active = 0
        //第一步
        if(this.active === 0){
          if(this.ruleForm.check === this.ruleForm.password){
            this.ruleForm.check = ''
            setTimeout(()=>{
                this.active++
              },100)
          }else{
            this.$message.error('密码错误')
          }
        }
        //第二步
        if(this.active === 1){
          if(this.ruleForm.check.length < 6 || this.ruleForm.check.length > 16){
            this.$message.error('密码长度在6-16字符')
          }else if(this.ruleForm.check === this.ruleForm.password){
            this.$message.error('新密码不得与原始密码相同')
          }else{
            this.reCheck = this.ruleForm.check
            this.ruleForm.check = ''
            //表单重置后会触发下一步的验证，所以加一个定时器，重置后再进入下一步
            setTimeout(()=>{
                this.active++
              },100)
          }
        }
        //第三步
        if(this.active === 2){
        if(this.ruleForm.check !== this.reCheck){
          this.$message.error('两次输入密码不一致')
        }else{
          const data = {
            id: this.changeId,
            password: this.ruleForm.check
          }
          submitChange(data).then(res=>{
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.dialogVisible2 = false
            this.active = 0
            this.changeId = ''
            setTimeout(()=>{
                this.$router.go(0)
              },1000)
          })
        }
        }
      },
    //生成ID
    mkId(){
      const ids = []
      this.tableData.forEach(item => {
        ids.push(parseInt(item.id))
      })
      const maxId = Math.max(...ids)
      this.ruleForm.id = maxId + 1
      return maxId + 1
    },
    handleEdit(index, row) {
      this.dialogVisible2 = true
      this.changeId = row.id
      // this.ruleForm.username = this.tableData[index].username
      this.ruleForm.password = this.tableData[index].password
      // this.ruleForm.token = this.tableData[index].token
      console.log(this.changeId);
      
    },
    handleDelete(index, row) {
      this.$confirm('确认删除？')
          .then(_ => {
            console.log(row.id);
            const data = {
              id: row.id
            }
            submitDelete(data).then(res=>{
              if(res.code === 20000){
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                setTimeout(()=>{
                this.$router.go(0)
              },1000)
              }
            })
            done()
          })
          .catch(_ => {})
      
    },
    handleAdd(){
      this.dialogVisible = true
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.dialogVisible2 = false
            this.resetForm('ruleForm')
            done()
          })
          .catch(_ => {})
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            submitInfo(this.ruleForm).then(res=>{
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              setTimeout(()=>{
                this.$router.go(0)
              },1000)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogVisible = false
      }
  },
  watch: {
    //监听修改密码操作一半时退出，将步骤重置
    dialogVisible2(){
      if(this.dialogVisible === false){
        this.active = 0
        this.ruleForm.check = ''
        this.reCheck = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .el-table {
        margin: 20px auto;
        border-radius: 5px;
    }
    .addButton {
        margin-left: 5%;
        margin-top: 1.5%;
    }
    .head-user {
      margin-left: 5%;
      margin-top: 1%;
      font-size: 20px;
    }
</style>
