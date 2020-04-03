<template>
    <div class="block">
  <el-timeline :reverse="reverse">
    <el-timeline-item
    :key="item.id"
    v-for="item in classTable"
    :timestamp="item.time"
    :icon="item.time.split(':')[0] < now?'el-icon-check':''"
    :color="item.time.split(':')[0] < now?'#0bbd87':''"
    placement="top">
    <!-- <el-tooltip class="item" effect="dark" :content="" placement="top"> -->
      <el-card>
        <h3>{{ item.name }}</h3>
        <p>{{ item.teacher }}老师的{{ item.type }}课程，上课地点：{{ item.classroom }}</p>
      </el-card>
    <!-- </el-tooltip> -->
    </el-timeline-item>
  </el-timeline>
</div>
</template>

<script>
import { getInfo, addInfo, deleteInfo, updateInfo } from '@/api/submitFn'
import { jsonFormat } from '@/utils/jsonFormat'

export default {
    data() {
        return {
            reverse: false,
            now: this.getTime(),
            classTable:[]
        }
    },
    async mounted(){
        const query = 'db.collection("classTable").get()'
        const res = await getInfo(query)
        const data = jsonFormat(res)
        const table = data.filter(item => item.day == new Date().getDay())
        //将课程按时间排序
        function compare(item){
            return function(a,b){
                return(a[item].split(':')[0] - b[item].split(':')[0])
            }
        }
        table.sort(compare('time'))
        if(this.$store.state.user.roles != 'admin'){
            const teacher = this.$store.state.user.name
            this.classTable = table.filter(item => item.teacher == teacher)  
        }else{
            this.classTable = table
        }
    },
    methods:{
        getTime(){
            return new Date().getHours()
        }
    }
}
</script>

<style lang="scss" scoped>
    .block {
        margin-top: 3%;
        width: 90%;
    }
</style>
