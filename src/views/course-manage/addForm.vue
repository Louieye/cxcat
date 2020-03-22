<template>
  <div id="test-add-form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="题号:" prop="testId">
        <el-input v-model="form.testId" class="contentInput" :disabled="testId==target.id?false:true" />
      </el-form-item>
      <el-form-item label="分类：" class="contentInput">
        <el-select v-model="form.title" placeholder="请选择问题分类">
          <el-option label="scratch" value="scratch" />
          <el-option label="python" value="python" />
          <el-option label="HTML" value="HTML" />
          <el-option label="C++" value="C++" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <el-form-item label="问题内容:">
        <el-input v-model="form.testContent" class="contentInput" />
      </el-form-item>
      <el-form-item label="选项:">
        <span>A  :  </span>
        <el-input v-model="form.a" class="checkInput" /><br>
        <span>B  :  </span>
        <el-input v-model="form.b" class="checkInput" /><br>
        <span>C  :  </span>
        <el-input v-model="form.c" class="checkInput" /><br>
        <span>D  :  </span>
        <el-input v-model="form.d" class="checkInput" />
      </el-form-item>
      <el-form-item label="正确答案:">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="A" name="type" />
          <el-checkbox label="B" name="type" />
          <el-checkbox label="C" name="type" />
          <el-checkbox label="D" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <div>
        <el-button class="submitButton" type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddForm',
  props: [
    'target'
  ],
  data() {
    return {
      form: {
        testContent: '',
        title: '',
        a: '',
        b: '',
        c: '',
        d: '',
        type: [],
        testId: ''
      }
    }
  },
  watch: {
    target() {
      this.form.testContent = this.target.question
      this.form.title = this.target.title
      this.form.a = this.target.a
      this.form.b = this.target.b
      this.form.c = this.target.c
      this.form.d = this.target.d
      this.form.type = [...this.target.answer]
      this.form.testId = this.target.id
    }
  },
  mounted() {
    this.form.testContent = this.target.question
    this.form.title = this.target.title
    this.form.a = this.target.a
    this.form.b = this.target.b
    this.form.c = this.target.c
    this.form.d = this.target.d
    this.form.type = [...this.target.answer]
    this.form.testId = this.target.id
  },
  methods: {
    handleSubmit() {
      this.$emit('submit-form', this.form)
      this.resetData()
    },
    resetData() {
      this.form.testContent = ''
      this.form.title = ''
      this.form.a = ''
      this.form.b = ''
      this.form.c = ''
      this.form.d = ''
      this.form.type = []
      this.form.testId = ''
    }
  }
}
</script>

<style lang="scss" scoped>
    .checkInput {
        width: 90%;
        margin-top: 10px;
    }
    .contentInput {
      width: 90%;
      transform: translate(20px,0);
    }
    .nextButton {
        float: right;
    }
    .submitButton {
      margin-left: 50%;
      transform: translate(-50%,0);
      width: 30%;
      margin-bottom: 10px;
    }
</style>
