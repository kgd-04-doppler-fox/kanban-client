<template>
  <div>
      <h1>Create New Task</h1>
      <form id="form-create" @submit.prevent="addTask" class="shadow-lg p-3 mb-5 bg-white rounded">
          <label for="title">Title</label>
          <input type="text" class="form-control form-control-sm" v-model="title">
          <button>Create</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AddTask',
    data(){
        return {
            title: '',
            status: '' 
        }    
    },
    methods: {
        addTask(){
            axios ({
                url: `http://localhost:3000/tasks`,
                method: 'post',
                data: {
                    title: this.title,
                    category: this.status 
                },
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(response => {
                this.$emit('addDone', 'home')
                this.$emit ('fetchNewData', 'newData')
            })
            .catch (err => {
                console.log(err)
            })
            this.title = ''
            this.status = ''
        }
       
    }
}
</script>

<style scope>
    #form-create {
        width: 200px;
    }
</style>