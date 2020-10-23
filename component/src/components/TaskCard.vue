<template>
  <div class="card my-3">
    <div class="card-body">
        <h5 class="card-title">{{task.title}}</h5>
        <p class="card-text">
        <small class="text-muted">ID: {{ task.UserId }}</small> <br>
        <small class="text-muted">{{ task.createdAt }}</small>
        </p>
        <div class="options">
        <button class="btn" @click="getEditTask(task.id)"><i class="fas fa-pencil-alt"></i></button>
        <button class="btn" @click="deleteTask(task.id)"><i class="fas fa-trash-alt"></i></button>
        <button class="btn"><i class="fas fa-expand-arrows-alt"></i></button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "TaskCard",
    props: [ 'task' ],
    methods: {
        deleteTask (id) {
            axios({
                method: 'DELETE',
                url: 'http://localhost:3000/tasks/' + id,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({ data }) => {
                this.$emit('tofetchTask')
            })
            .catch(err => {
                console.log(err)
            })
        },
        getEditTask (id) {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/tasks/' + id,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({ data }) => {
                this.$emit('tofetchTask')
            })
            .catch(err => {
                console.log(err)
            })
        },
    }
}
</script>

<style>

</style>