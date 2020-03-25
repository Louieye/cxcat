<template>
    <div>
    <el-input placeholder="请输入内容" v-model="search" class="searchInput">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
  <el-button type="primary" round style="margin-left: 3%" @click="handleAdd">添加商品</el-button>
    <el-table
    :data="tableData.filter(data => !search
    || data.id == search
    || data.name.toLowerCase().includes(search.toLowerCase())
    || data.type.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="商品价格">
            <span>￥{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{props.row.onsale?'在售':'停售'}}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.type }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="id"
      sortable>
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="商品价格"
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
  title="添加/编辑商品"
  :visible.sync="dialogVisible"
  width="40%"
  :before-close="handleClose">
  <el-form ref="form" :rules="rules" :model="form" label-width="80px">
  <el-form-item label="商品ID">
    <span>{{ form.id }}</span>
  </el-form-item>
  <el-form-item label="商品名称" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="商品分类" prop="type">
    <el-select v-model="form.type" placeholder="请选择商品分类">
      <el-option label="课程" value="课程"></el-option>
      <el-option label="工具" value="工具"></el-option>
      <el-option label="组合包" value="组合包"></el-option>
      <el-option label="活动商品" value="活动商品"></el-option>
      <el-option label="其他" value="其他"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="商品价格" prop="price">
    <el-input v-model.number="form.price"></el-input>
  </el-form-item>
  <el-form-item label="商品介绍">
    <el-input v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item label="状态">
    <el-switch v-model="form.onsale"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-text="在售"
    inactive-text="停售"></el-switch>
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
import { getGoods, submitGoods } from '@/api/goods'

export default {
    inject: ['reload'],
    data(){
        return {
            tableData: [],
            form: {
                id: '',
                name: '',
                price: '',
                type: '',
                desc: '',
                onsale: Boolean
            },
            search: '',
            dialogVisible: false,
            rules: {
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                    { type: 'number', message: '商品价格必须为数字', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择商品分类', trigger: 'change' }
                ]
            }
        }  
    },
    async mounted() {
        await getGoods().then(res =>{
            this.tableData = res.data
        })
    },
    methods: {
        //编辑
        handleEdit(index, row){
            this.form = this.tableData.find(item => item.id == row.id)
            this.dialogVisible = true
        },
        //删除
        handleDelete(index, row){
            this.$confirm('确认删除？')
          .then(_ => {
            this.form.id = row.id
            this.form.del = true
            submitGoods(this.form).then(res=>{
                if(res.code == 20000){
                    this.resetForm()
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    const index = this.tableData.findIndex(item=> item.id == row.id)
                    this.tableData.splice(index, 1)
                }else{
                    this.$message.error('删除失败！')
                }
            })
          })
          .catch(_ => {});
            
        },
        //添加商品
        handleAdd(){
            this.form.id = this.mkId()
            this.dialogVisible = true

        },
        //提交表单
        handleSubmit(){
            this.$refs['form'].validate((valid) => {
              if (valid) {
                submitGoods(this.form).then(res=>{
                if(res.code == 20000){
                    this.dialogVisible = false
                    this.resetForm()
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.reload()
                    // setTimeout(() => this.reload(),800)
                }else{
                    this.$message.error('操作失败！')
                }
            })
              } else {
                console.log('error submit!!');
                return false;
              }
            })
            
        },
        dialogClose(){
            this.$confirm('确认关闭？')
          .then(_ => {
              this.dialogVisible = false
              this.resetForm()
            done();
          })
          .catch(_ => {});
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
              this.resetForm()
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
        this.form = {
                id: '',
                name: '',
                price: '',
                type: '',
                desc: '',
                onsale: Boolean
            }
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
      margin-bottom: 3%;
      margin-left: 50%;
      transform: translate(-50%,0);
  }
</style>
