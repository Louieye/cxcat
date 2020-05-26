<template>
  <div class="main">
      <div class="head">
          <div>
              课程： {{ data.course }}
          </div>
          <div>
              教师： {{ data.teacher }}
          </div>
          <div>
              课时： {{ data.lesson }}
          </div>
          <div>
              创建日期： {{ data.date }}
          </div>
      </div>
      <div class="content">
          <div>
              内容：
          </div>
          <div class="desc">
              <p class="noContent" v-if="data.desc === ''">暂无内容</p>
              {{ data.desc }}
          </div>
      </div>
      <div class="footer">
          <el-button type="primary" @click="goBack">返回</el-button>
      </div>
  </div>
</template>

<script>

export default {
    name: 'Look',
    data () {
        return {
            data: []
        }
    },
    created () {
        this.$route.params.reply && (this.data = this.$route.params.reply)
        if(this.data.length === 0){
            this.$router.push('/example')
        }
    },
    methods: {
        goBack () {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
    .main {
        color: rgb(38, 41, 41);
        font-size: 16px;
        margin: 20px 15px;
    }
    .head {
        display: flex;
        justify-content: space-around;
    }
    .content {
        margin: 50px 30px;
        .desc {
            text-indent: 2em;
            text-align: justify;
            text-justify: inter-ideograph;
        }
    }
    .noContent {
        font-size: 14px;
        color: rgb(138, 138, 138);
    }
    .footer {
        margin: 25px 25px;
    }
</style>