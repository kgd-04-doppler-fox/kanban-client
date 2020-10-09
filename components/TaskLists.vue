<template>
  <div class="boardList" >
      <div>
          <p id="headTask">{{category}}</p>
      </div>
      <TaskCard
        v-for="task in taskFilter()"
        :key="task.id"
        :tugas="task"
        id="taskBox"
      ></TaskCard>
  </div>
</template>

<script>
import axios from 'axios'
import TaskCard from './TaskCard'

export default {
    name: 'TaskLists',
    props: ['category', 'assignments'],
    components:{
        TaskCard
    },
    methods : {
        taskFilter(){
            return this.assignments.filter(task=> task.category === this.category)
        }
    }
}
</script>

<style scope>
  #headTask {
      background: #FFC719 ;
      padding: 7px;
      width: auto;
      text-align: center;
      font-family: 'Poppins', sans-serif;
      color: white;
  }

  #taskBox {
      border: solid #E6E6E6 1px;
      margin-bottom: 10px;
  }
</style>