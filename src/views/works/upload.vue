<template>
    <div class="mainBox">
      <el-button type="primary" @click="handleUpload">上传作品</el-button>
      <el-button type="primary" plain id="fileImport" @click="clickLoad">上传文件</el-button>
      <input type="file" id="files" ref="refFile" style="display: none" @change="fileLoad">
    </div>
</template>

<script>
import { invokeCloudFunction } from '@/api/submitFn'
import axios from 'axios'

export default {
    data() {
      return {
        file: ''
      };
    },
    methods: {
      handleUpload(){

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      clickLoad() {
      this.$refs.refFile.dispatchEvent(new MouseEvent('click'))
      },
      fileLoad() {
      const selectedFile = this.$refs.refFile.files[0];
      const fileName = selectedFile.name
      // this.uploadFile(fileName)
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(selectedFile)
        reader.onload = function(){
          resolve(this.result)
        }
      }).then(res => {
        this.file = res
        this.uploadFile(fileName)
        
      })
    },
    async uploadFile(fileName){
      const path = 'works/' + fileName
      const list = {
        path: path,
        fileName: fileName,
        file: this.file
      }
      const res = await invokeCloudFunction('uploadFile',list)
      const cloudId = JSON.parse(res.data.resp_data).fileID
      console.log(cloudId);
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