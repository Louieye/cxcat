<template>
<div id="test-add-form">
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="题号">{{form.testId}}</el-form-item>
  <el-form-item label="问题内容">
    <el-input v-model="form.testContent"></el-input>
  </el-form-item>
    <el-form-item label="选项">
      <span>A  :  </span>
      <el-input class="checkInput" v-model="form.a"></el-input><br>
      <span>B  :  </span>
      <el-input class="checkInput" v-model="form.b"></el-input><br>
      <span>C  :  </span>
      <el-input class="checkInput" v-model="form.c"></el-input><br>
      <span>D  :  </span>
      <el-input class="checkInput" v-model="form.d"></el-input>
    </el-form-item>
  <el-form-item label="正确答案">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="A" name="type"></el-checkbox>
      <el-checkbox label="B" name="type"></el-checkbox>
      <el-checkbox label="C" name="type"></el-checkbox>
      <el-checkbox label="D" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <div>
    <el-button>取 消</el-button>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
  </div>
</el-form>
</div>
</template>

<script>
export default {
  name: 'addForm',
  props: {
  },
    data() {
      return {
        form:{
            testContent: '',
            a: '',
            b: '',
            c: '',
            d: '',
            type: [],
            testId: 1
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$emit('submit-form',this.form)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .checkInput {
        width: 90%;
    }
    .nextButton {
        float: right;
    }
</style>
