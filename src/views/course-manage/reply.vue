<template>
  <div>
    <div class="head">课程反馈</div>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="200"
        column-key="date"
        :filter-method="filterHandler"
      />
      <el-table-column
        prop="course"
        label="课程"
        width="200"
        sortable
        column-key="course"
        :filter-method="filterHandler"
      />
      <el-table-column
        prop="teacher"
        label="教师"
        width="200"
        sortable
        column-key="teacher"
        :filter-method="filterHandler"
      />
      <el-table-column
        prop="updateDate"
        label="更新时间"
      />
      <el-table-column
        prop="tag"
        label="状态"
        width="100"
        :filters="[{ text: '已反馈', value: '已反馈' }, { text: '未反馈', value: '未反馈' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '未反馈' ? 'primary' : 'success'"
            disable-transitions
          >{{ scope.row.tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
      >
        <template slot-scope="scope">
          <el-button
          @click="showCard(scope.$index)"
          size="mini"
          type="success">查看</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
  title="反馈内容"
  :visible.sync="dialogVisible"
  width="800px"
  :before-close="handleClose">
  <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="内容">
        <el-input v-model="desc" type="textarea" />
      </el-form-item>
      <el-form-item size="large" class="el-form-button">
        <el-button ref="content" type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
</el-dialog>
<el-card :class="[this.cardShow?'box-card':'hidden']" shadow="always">
  <div slot="header" class="clearfix">
    <span>反馈详情</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="cardShow=false">关闭</el-button>
  </div>
  <div class="text item">
    {{desc}}
  </div>
</el-card>
  </div>
</template>

<script>
import { getReplyData, submitReply } from '@/api/reply'
import { formatDate } from '@/utils/date'

export default {
  data() {
    return {
      index: '',
      dialogVisible: false,
      cardShow: false,
      desc: '',
      tableData: []
    }
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    handleEdit(index, row) {
      if(this.index != index){
        this.desc = ''
      }
      this.index = index
      this.dialogVisible = true
      this.cardShow = false
    },
    async handleDelete(index, row) {
      this.$confirm('确认删除？')
          .then (_ => {
            const deleteData = this.tableData[index]
            deleteData.flag = 1
            console.log(deleteData.flag);
            
            this.tableData.splice(index,1)
            submitReply(deleteData).then(res=>{
              if(res.code == 20000){
                this.$message({
                type: 'success',
                message: '删除成功'
                })
              }else{
                this.$message.error('删除失败')
                console.log(res)
              }
            })
          })
          .catch(_ => {});
    },
    // formatter(row, column) {
    //   return row.text
    // },
    filterTag(value, row) {
      return row.tag === value
    },
    async onSubmit() {
      const table = this.tableData[this.index]
      this.tableData[this.index].desc = this.desc
      const date = new Date().getTime()
      this.tableData[this.index].updateDate = formatDate(date)
      this.tableData[this.index].desc = this.desc
      this.tableData[this.index].tag = '已反馈'
      const res = await submitReply(this.tableData[this.index])
      if(res){
        this.$message({
          type: 'success',
          message: '提交成功'
        })
      }else{
        this.$message.error('提交失败')
      }
      this.index = ''
      this.desc = ''
      this.dialogVisible = false
    },
    showCard(index) {
      this.cardShow = true
      this.desc = this.tableData[index].desc
    }
  },
  async mounted(){
    const table = await getReplyData()
    this.tableData = table.data
  }
}
</script>

<style lang="scss" scoped>
    .head {
        text-align: center;
        font-size: 25px;
        margin-top: 20px;
        margin-bottom: 20px;
        color: slategray;
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
    .el-textarea__inner {
      resize: none;
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
