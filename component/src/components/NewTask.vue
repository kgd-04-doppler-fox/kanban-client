<template>
  <div id="new-task">
        <form @submit.prevent="new_task" class="login-form">
            <h2 style="position: relative;left: 215px;font-family: Arial, Helvetica, sans-serif;top: 20px;">New Task</h2>
            <br>
            <label class="label">Title</label>
            <br>
            <input  v-model="task.title"  class="input" type="text">
            <br>
            <input class="button" type="submit" value="Save"> <button @click.prevent="add_toHome" class="button2">Cancel</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LoginForm',
    data() {
        return {
            task: {
                title:''
            },
            tasksBacklog: [],
            tasksToDo: [],
            tasksDoing: [],
            tasksDone: []
        }
    },
    methods: {
        new_task() {
            axios({
                url: `http://localhost:3000/tasks`,//https://hidden-oasis-44746.herokuapp.com =>url heroku
                method: 'post',
                data: {
                    title: this.task.title
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (({data}) => {
                localStorage.removeItem('add_token')
                this.tasksBacklog = []
                this.tasksToDo = []
                this.tasksDoing = []
                this.tasksDone = []
                this.$emit('addNew','home-page')
            })
            .catch (err => {
                console.log(err)
            })
        },
        add_toHome() {
            localStorage.removeItem('add_token')
            this.$emit('cancelCreate','home-page')
        }
    }
}
</script>

<style>

</style>