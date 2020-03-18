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
        width="230"
        column-key="date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler"
      />
      <el-table-column
        prop="course"
        label="课程"
        width="230"
      />
      <el-table-column
        prop="teacher"
        label="教师"
        width="230"
      />
      <el-table-column
        prop="text"
        label="标题"
        :formatter="formatter"
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
    <div v-if="isActive" class="formbox"><el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="sizeForm.name" />
      </el-form-item>
      <!-- <el-form-item label="教师">
        <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="内容" prop="desc">
        <el-input v-model="sizeForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2020-03-18',
        course: 'scratch',
        teacher: '王小虎',
        text: 'asdasdasdasdasd',
        tag: '已反馈'
      }, {
        date: '2018-05-02',
        course: 'scratch',
        teacher: '王大虎',
        text: 'asdasdasdasdasd',
        tag: '已反馈'
      }, {
        date: '2018-07-02',
        course: 'scratch',
        teacher: '王二虎',
        text: 'asdasdasdasdasd',
        tag: '未反馈'
      }, {
        date: '2019-05-02',
        course: 'scratch',
        teacher: '王三虎',
        text: 'asdasdasdasdasd',
        tag: '未反馈'
      }],
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      this.isActive = true
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    formatter(row, column) {
      return row.text
    },
    filterTag(value, row) {
      return row.tag === value
    },
    onSubmit(value, row) {
      this.isActive = false
    }
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
    .el-table .cell {
        height: 50px;
        overflow: hidden;
    }
    .formbox {
        height: 600px;
        width: 800px;
        border: 1px solid gainsboro;
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%,0);
        box-shadow: 0 0px 5px 2px gainsboro;
        z-index: 2;
    }
</style>
