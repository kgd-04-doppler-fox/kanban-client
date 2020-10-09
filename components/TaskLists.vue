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
        @editPage="editTask"
      ></TaskCard>
      <div>
          <button id="add" class="btn btn-outline-info btn-sm" @click="addTask">+ Add Task</button>
      </div>
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
        },
        editTask(data){
            this.$emit('emitEdit', data)
        },
        addTask(){
            this.$emit('addTask', 'create')
        }

    }
}
</script>

<style scope>
  #headTask {
      background: #FFC300;
      padding: 7px;
      width: auto;
      text-align: center;
      font-family: 'Poppins', sans-serif;
      color: white;
      border-radius: 70px;
  }

  #taskBox {
      border: solid #E6E6E6 1px;
      margin-bottom: 10px;
  }

  #add{
      display: flex;
      float: right;
  }
</style>