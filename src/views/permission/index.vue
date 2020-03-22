<template>
  <div>
    <el-button
      icon="el-icon-circle-plus-outline"
      type="primary"
      class="addButton"
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
  </div>

</template>

<script>
import { permissionInfo } from '@/api/permission'

export default {
  data() {
    return {
      tableData: []
    }
  },
  async mounted() {
    await permissionInfo().then(res => {
      this.tableData = res.data
    })
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
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
</style>
