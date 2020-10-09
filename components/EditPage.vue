<template>
  <div class="shadow-lg p-3 mb-5 bg-white rounded" style="width: 500px; margin:auto; margin-top: 60px;" id="start-page" >
    <p>Task Description</p>
    <p>{{editData.title}}</p>
    <div>
      <button class="btn btn-outline-warning btn-sm" v-if="editData.category !== 'backlog'">{{buttonL}}</button>
      <button class="btn btn-outline-danger btn-sm">Delete</button>
      <button class="btn btn-outline-success btn-sm" v-if="editData.category !== 'done'">{{buttonR}}</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "EditPage",
    props: ['editData'],
    data(){
      return {
        buttonR: '',
        buttonL: ''
      }
    },
    methods:{

        edit(){

            this.currentPage = 'edit'
            const id = localStorage.getItem('taskId')
            axios ({
            url: `http://localhost:3000/tasks/${id}`,
            method: 'get',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
            })
            .then(response => {
            console.log(response.task)
            this.editTask = response
            currentStatus = response.status
            })
            .catch(err => {
            console.log(err)
            })
        }
    },
    created (){
      if(this.editData.category === 'backlog'){
          this.buttonR = 'To-Do'
        }else if(this.editData.category === 'to-do'){
          this.buttonR = 'Doing'
          this.buttonL = 'Backlog'
        }else if(this.editData.category === 'doing'){
          this.buttonR = 'Done'
          this.buttonL = 'To-Do'
        }else if (this.editData.category === 'done'){
          this.buttonL = 'Doing'
        }
    }
}
</script>

<style>

</style>