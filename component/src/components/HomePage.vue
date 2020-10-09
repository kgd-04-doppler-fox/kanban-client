<template>
  <div id="home">
        <nav class="navbar">
            <h2>KamVan Board</h2>
            <button @click.prevent="logout" class="logout">Logout</button>
        </nav>
        <br>
        <button @click.prevent="to_addTask" class="new-task">New Task</button>
        <section class="content">
            <table>
                <tr>
                    <th class="th1">Backlog</th>
                </tr>
                <tr v-for="task in tasksBacklog" v-bind:key="task.id">
                    <td>{{ task.title }}<br><button class="button3" v-on:click.prevent="updateBacklog(task.id)" >Update</button> | <button class="button3" v-on:click.prevent="deleteTask(task.id)" >Delete</button></td>
                </tr>
            </table>
            <table>
                <tr>
                    <th class="th2">To-Do</th>
                </tr>
                <tr v-for="task in tasksToDo"  v-bind:key="task.id">
                    <td>{{ task.title }}<br><button class="button3" v-on:click.prevent="updateToDo(task.id)" >Update</button> | <button class="button3" v-on:click.prevent="deleteTask(task.id)" >Delete</button></td>
                </tr>
            </table>
            <table>
                <tr>
                    <th class="th3">Doing</th>
                </tr>
                <tr v-for="task in tasksDoing"  v-bind:key="task.id">
                    <td>{{ task.title }}<br><button class="button3" v-on:click.prevent="updateDoing(task.id)" >Update</button> | <button class="button3" v-on:click.prevent="deleteTask(task.id)" >Delete</button></td>
                </tr>
            </table>
            <table>
                <tr>
                    <th class="th4">Done</th>
                </tr>
                <tr v-for="task in tasksDone"  v-bind:key="task.id">
                    <td>{{ task.title }}<br><button class="button3" v-on:click.prevent="deleteTask(task.id)" >Delete</button></td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'HomePage',
    data() {
        return{
            tasksBacklog: [],
            tasksToDo: [],
            tasksDoing: [],
            tasksDone: []
        }
    },
    methods: {
        logout(){
            localStorage.clear()
            this.$emit('logoutSuccess','login-page')
        },
        to_addTask() {
            localStorage.setItem('add_token','add-task')
            this.$emit('toNewTask','add-page')
        },
        fetchTask() {
            axios({
                url: `http://localhost:3000/tasks`,
                method: 'get',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (({data}) => {
                for(let i = 0; i < data.length; i ++){
                    if (data[i].category === 'backlog'){
                        this.tasksBacklog.push(data[i])
                    }else if (data[i].category === 'todo'){
                        this.tasksToDo.push(data[i])
                    }else if (data[i].category === 'doing'){
                        this.tasksDoing.push(data[i])
                    }else if (data[i].category === 'done'){
                        this.tasksDone.push(data[i])
                    }
                }
            })
            .catch (err => {
                console.log(err)
            })
        },
        updateBacklog(id) {
            axios({
                url: `http://localhost:3000/tasks/${id}`,
                method: 'patch',
                data: {
                    category: "todo"
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (({data}) => {
                this.tasksBacklog = []
                this.tasksToDo = []
                this.tasksDoing = []
                this.tasksDone = []
                this.$emit('changePage','home-page')
                this.fetchTask()
            })
            .catch (err => {
                console.log(id)
            })
        },
        updateToDo(id) {
            axios({
                url: `http://localhost:3000/tasks/${id}`,
                method: 'patch',
                data: {
                    category: "doing"
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (({data}) => {
                this.tasksBacklog = []
                this.tasksToDo = []
                this.tasksDoing = []
                this.tasksDone = []
                this.$emit('changePage','home-page')
                this.fetchTask()
            })
            .catch (err => {
                console.log(err)
            })
        },
        updateDoing(id) {
            axios({
                url: `http://localhost:3000/tasks/${id}`,
                method: 'patch',
                data: {
                    category: "done"
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (({data}) => {
                this.tasksBacklog = []
                this.tasksToDo = []
                this.tasksDoing = []
                this.tasksDone = []
                this.$emit('changePage','home-page')
                this.fetchTask()
            })
            .catch (err => {
                console.log(err)
            })
        },
        deleteTask(id) {
            axios({
                url: `http://localhost:3000/tasks/${id}`,
                method: 'delete',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (({data}) => {
                console.log(id)
                this.tasksBacklog = []
                this.tasksToDo = []
                this.tasksDoing = []
                this.tasksDone = []
                this.$emit('changePage','home-page')
                this.fetchTask()
            })
            .catch (err => {
                console.log(err)
            })
        }
    },
    created () {
        this.fetchTask()
    }
}
</script>

<style>

</style>