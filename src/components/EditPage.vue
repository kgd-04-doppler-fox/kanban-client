<template>
  <div class="shadow-lg p-3 mb-5 bg-white rounded" style="width: 500px; margin:auto; margin-top: 60px;" id="start-page" @click="resetError">
    <h1 id="editHead">Edit Task</h1>
    <p id="errorMsg" v-bind:style="{ color: colorFont}">Unauthorized Access</p>
    <p><b>Task Description</b></p>
    <p>{{editData.title}}</p>
    <div>
      <button class="btn btn-outline-warning btn-sm" v-if="editData.category !== 'backlog'" @click="changeStatus('L')">{{buttonL}}</button>
      <button class="btn btn-outline-danger btn-sm" @click="deleteTask(editData.id)">Delete</button>
      <button class="btn btn-outline-success btn-sm" v-if="editData.category !== 'done'" @click="changeStatus('R')">{{buttonR}}</button>
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
        buttonL: '',
        statusEdit: '',
        colorFont: 'transparent'
      }
    },
    methods:{
        changeStatus(cond){
          if (cond === 'R'){
            this.statusEdit = this.buttonR
            this.edit(this.editData.id)
          }else {
            this.statusEdit = this.buttonL
            this.edit(this.editData.id)
          }          
        },
        
        edit(id){
            axios ({
              url: `http://localhost:3000/tasks/${id}`,
              method: 'patch',
              data: {
                category: this.statusEdit.toLowerCase()
              },
              headers: {
                access_token: localStorage.getItem('access_token')
              }
            })
            .then(response => {
              this.$emit('editSuccess', 'home')
              localStorage.removeItem('edit')
            })
            .catch(err => {
              this.colorFont = 'red'
              console.log(err)
            })
        },
    
        deleteTask(id){
          axios ({
            url: `http://localhost:3000/tasks/${id}`,
            method: 'delete',
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
          .then(response => {
            this.$emit('editSuccess', 'home')
          })
          .catch(err => {
            console.log(err)
            this.colorFont = 'red'

          })
        },

        resetError(){
          this.colorFont = 'transparent'
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

<style scope>
  #editHead{
    text-align: center;
    margin-bottom: 10px;
  }

  #errorMsg{
    text-align: center;
    font-style: italic;
    color: transparent;
    transition: 1s;
    color:transparent
  }
</style>