<template>
  <div>
      <form id="form-create" @submit.prevent="addTask" class="shadow-lg p-3 mb-5 bg-white rounded">
      <h3 id="createHead">Create New Task</h3>
          <label for="title">Title</label>
          <input type="text" class="form-control form-control-sm" v-model="title">
          <button class="btn btn-warning mt-3" id="btn_create">Create</button>
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
                url: `https://warm-waters-28393.herokuapp.com/tasks`,
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

    #createHead{
        text-align: center;
        font-family: 'Raleway', sans-serif;
    }

    #form-create {
        width: 300px;
        margin: auto;
        margin-top:7%;
    }

    #btn_create{
        margin: auto;
    }

</style>