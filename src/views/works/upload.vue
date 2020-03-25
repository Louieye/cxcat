<template>
    <div class="mainBox">
<el-upload
  class="upload-demo"
  action="http://localhost:9528/works/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </div>
</template>

<script>
export default {
    data() {
      return {
        fileList: [{name: '', url: ''}]
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
}
</script>

<style lang="scss" scoped>
    .mainBox {
        width: 90%;
        margin-left: 3%;
        margin-top: 3%;
    }
</style>