<template>
  <div class="mainBox">
<el-card class="box-card">
    <div class="img">
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" alt="">
    </div>
    <h3 class="name">{{ tableData.name }}</h3>
    <div class="button">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
    </div>
    <div class="info">
        <h4>年龄：{{ tableData.age }}</h4>
        <h4>生日：{{ tableData.birth }}</h4>
        <h4>性别：{{ tableData.sex }}</h4>
        <h4>手机：{{ tableData.phone }}</h4>
        <h4>邮箱：{{ tableData.email }}</h4>
    </div>
</el-card>
  </div>

</template>

<script>
import { getInfo } from '@/api/myInfo'

export default {
  data() {
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
      dialogVisible: false,
      dialogVisible2: false,
      reCheck: '',
      changeId: ''
    }
  },
  async mounted() {
    await getInfo().then(res => {
      this.tableData = res.data
    })
  },
  methods: {
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
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
  .text {
    font-size: 14px;
  }

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
    width: 480px;
    margin: 0 auto;
  }
  .mainBox {
      margin-top: 6%;
  }
  .img {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      box-shadow: 0 0 5px 1px rgba($color: #a8a8a8, $alpha: 0.7);
      img {
          width: 100%;
          height: 100%;
      }
  }
  .name {
      margin-top: 100px;
      text-align: center;
  }
  .button {
      position: absolute;
      left: 50%;
      transform: translate(-50%,0);
  }
  .info {
      margin-top: 70px;
      h4 {
          margin-left: 150px;
      }
  }
</style>
