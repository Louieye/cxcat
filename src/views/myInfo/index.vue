<template>
  <div class="mainBox">
<el-card class="box-card" v-loading="loading">
    <div class="img">
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" alt="">
    </div>
    <h3 class="name">{{ tableData.name }}</h3>
    <div class="button">
        <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit"></el-button>
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
<el-dialog
      title="编辑个人信息"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" style="width: 25%" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" style="width: 50%" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" style="width: 50%" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" style="width: 50%" />
        </el-form-item>
        <el-form-item label="生日">
            <el-form-item prop="birth">
              <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
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
      loading: true,
      active: 0,
      tableData: {},
      form: {},
      dialogVisible: false,
      reCheck: '',
      changeId: ''
    }
  },
  async mounted() {
    const username = this.$store.state.user.username
    const query = 'db.collection("adminUsers").where({username:' + JSON.stringify(username) + '}).get()'
    const res = await getInfo(query)
    const data = jsonFormat(res)
    this.tableData = data
    this.loading = false
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
    handleEdit() {
      this.form = this.tableData
      this.dialogVisible = true
    },
    async handleSubmit(){
      const query = 'db.collection("adminUsers").where({id:' + JSON.stringify(this.form.id) + '}).update({data:' + JSON.stringify(this.form) + '})'
        const res = await updateInfo(query)
        if (res.status == 200) {
          this.$message.success('修改成功')
          this.reload()
        } else {
          this.$message.error('修改失败')
        }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogVisible = false
          done()
        })
        .catch(_ => {})
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
$bg:#0a2749;
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
