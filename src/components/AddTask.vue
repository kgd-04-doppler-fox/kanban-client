<template>
    <div class="container">
        <div class="row mt-5">
                <div class="col-6 mx-auto card text-white bg-dark" style="max-width: 18rem;">
                <div class="card-header">New Task</div>
                <h6 class="h6 text-center">Title</h6><br>
                <input type="text" name="" id="" class="form-control-sm" v-model="title"><br>
                <h6 class="h6 text-center"> Description</h6><br>
                <textarea name="" id="" cols="24" rows="3" v-model="description"></textarea>
                <button class="btn btn-succes btn-success" @click.prevent="addTask">Add</button>
            <button class="btn btn-secondary btn-sm" @click="backToMainPage">Cancel</button>
          </div>
      </div>
  </div>
</template>
<script>
import axios from '../config/axios'

export default {
    data(){
        return{
            title: '',
            description: ''
        }
    },
    name: 'AddTask',
    methods: {
        backToMainPage(){
            this.$emit("changePage", "main-page")
        },

        addTask(){
            axios({
                url: "/tasks",
                method: "post",
                data: {
                    title: this.title,
                    description: this.description
                },
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(task => {
                this.$emit('changePage', 'main-page')
            })
            .catch(err => {
                console.log(err)
            })
        }

    }
}
</script>

<style>

</style>