<template>
  <div class="card shadow-sm rounded mt-3">
    <div class="card-body p-2">
      <div class="card-body p-2 bg-light">
        <div class="card-title">
          <button type="button" class="close text-right" aria-label="Close" @click="hapusTask()">
            <span aria-hidden="true">&times;</span>
          </button>
          <a href="" class="lead font-weight-light">{{ task.title }}</a>
        </div>
        <p>{{ task.description }}</p>
        <button class="btn btn-primary btn-sm" @click="edit(task.id)">edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "KanbanCard",
  props: ["task", "categories"],
  methods:{
    hapusTask(){
      axios({
        method:"DELETE",
        url:`http://localhost:3000/tasks/${this.task.id}`,
        headers:{
          access_token:localStorage.getItem('access_token')
        }
      })
      .then(response=>{
          console.log(response)
      })
      .catch(err=>{
        console.log(err)
      })
    },
  }
};
</script>

<style>
</style>