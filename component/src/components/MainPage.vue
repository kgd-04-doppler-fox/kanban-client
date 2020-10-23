<template>
    <div>
        <form @submit.prevent="addTask">
            <div class="form-group input-group mb-3">
                <div class="input-group-prepend">
                </div>
                <input v-model="title" class="form-control" name="pass_log" placeholder="Add Task" type="text">
            </div>
            <div class="form-group input-group mb-3">
            <div class="input-group-prepend">
                <select v-model="selected" class="form-control" id="exampleFormControlSelect1">
                    <option value="" disabled selected>-- Select Category --</option>
                    <option value="Backlog">Backlog</option>
                    <option value="To-Do">To-Do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            </div>
                        
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block"> Add </button>
            </div>
        </form>
        <div class="row m-0">
          <CategoryBoard v-for="(category, i) in categories" :key="i" :category="category" :tasks="tasks" @tofetchTask="fetchKanban" @toFetchDelete="fetchKanban"></CategoryBoard>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CategoryBoard from './CategoryBoard'

export default {
    name: 'MainPage',
    data () {
        return {
            tasks: [],
            categories: ['Backlog', 'To-Do', 'Doing', 'Done'],
            title: '',
            selected: ''
        }
    },
    components: {
        CategoryBoard
    },
    methods: {
        fetchKanban () {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/tasks',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({ data }) => {
                this.tasks = data
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        addTask () {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/tasks',
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    title: this.title,
                    category: this.selected
                }
            })
            .then(({ data }) => {
                this.tasks.push(data)
                this.fetchKanban()
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
    created () {
        this.fetchKanban()
    }
}
</script>

<style>

</style>