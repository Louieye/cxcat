<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hello，{{ name }}</div>
    <el-row :gutter="20" class="head">
      <el-col :span="6"><div class="grid-content bg-purple header">
        <i class="el-icon-s-custom icon-custom" />
        <span>访客：{{ header.visited }}</span>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple header">
        <i class="el-icon-chat-dot-square icon-custom" />
        <span>消息：{{ header.message }}</span>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple header">
        <i class="el-icon-shopping-bag-1 icon-custom" />
        <span>订单：{{ header.order }}</span>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple header">
        <i class="el-icon-notebook-2 icon-custom" />
        <span>课程：{{ header.course }}</span>
      </div></el-col>
    </el-row>
    <span class="title">本周课程：</span>
    <el-card class="box-card">
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%;"
      >
        <el-table-column
          prop="day"
          label="课程时间(星期)"
          width="140px"
          sortable
          align="center"
        />
        <el-table-column
          prop="teacher"
          label="课程教师"
          align="center"
        />
        <el-table-column
          prop="classroom"
          label="上课教室"
          align="center"
        />
        <el-table-column
          prop="type"
          label="课程"
          align="center"
        />
      </el-table>
    </el-card>
    <el-card class="box-card2">
      <el-calendar v-model="value" />
    </el-card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTableData } from '@/api/dashboard'
import { getHeaderData } from '@/api/dashboard'
import { jsonFormat } from '@/utils/jsonFormat'


export default {
  name: 'Dashboard',
  data() {
    return {
      header: {},
      tableData: [],
      value: new Date(),
      loading: true
    }
  },
  async mounted() {
    // 获取课程表
    // const token = this.$store.state.user.token
    // console.log(token);
    // getTableData返回一个对象，数据在data中
    const tableData = {
        env: 'lyj-app',
        query: 'db.collection(\"classTable\").get()'
      }
    const submitTable = JSON.stringify(tableData)
    const table = await getTableData(submitTable)
    this.tableData = jsonFormat(table)
    const headData = {
        env: 'lyj-app',
        query: 'db.collection(\"homeInfo\").get()'
      }
    this.loading = false
    const submitHead = JSON.stringify(headData)
    const head = await getTableData(submitHead)
    console.log(head);
    console.log(jsonFormat(head));
    
    this.header = jsonFormat(head)
    
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    formatter(row, column) {
      return row.date
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  min-width: 890px;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.head {
  display: flex;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: skyblue;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    box-shadow: 0 0 15px 1px rgba(112, 163, 184, 0.6);
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .icon-custom {
    font-size: 50px;
    line-height: 100px;
    margin-left: 20px;
    color: honeydew;
  }
  .header {
    height: 100px;
    span {
      display: inline-block;
      font-size: 20px;
      margin-left: 15px;
      transform: translate(0,-5px);
      color: honeydew;
    }
  }
  .title {
    display: block;
    font-size: 25px;
  }
  //卡片
   .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width:49.5%;
    height: 700px;
    float: left;
    margin-top: 10px;
  }
  .box-card2 {
    width:49.5%;
    height: 700px;
    float: right;
    margin-top: 10px;
  }
</style>
