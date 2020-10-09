<template>
    <div class="card-body">
        <h6 class="card-title"> {{task.title}}</h6>
        <p class="card-text">{{task.description}}</p>
        <small class="text-muted">by {{task.User.email}}  | </small> <small class="text-muted">{{generateDate(task.updatedAt)}} </small>
        <div class="btn btn-group">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" v-if="task.category != 'Backlog'" @click.prevent="downgradeCategory(task.category, task.id)">
                <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
            </svg>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" v-if="task.User.email == this.userEmail" @click="updateTask()">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg" @click="deleteTask">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" v-if="task.category != 'Done' " @click.prevent="updateCategory(task.category, task.id)">
                <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"/>
            </svg>
        </div>                 
    </div>
</template>

<script>
import axios from '../config/axios'

export default {
    name: 'TaskItem',
    props:['task'],
    data (){
        return{
            userEmail: localStorage.getItem('email')
        }
    },
    methods: {
        updateCategory(category, id){
            let nextCategory
            if (category == 'Backlog'){
                nextCategory = 'Todo'
            }else if (category == 'Todo'){
                nextCategory = 'Doing'
            }else{
                nextCategory = 'Done'
            }

            axios({
                url: `/tasks/${id}`,
                method: 'patch',
                data: {
                    category: nextCategory
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(task => {
                this.$emit('changePage', 'main-page')
            })
            .catch(err => {
                console.log(err)
            })

        },

        downgradeCategory(category, id){
            let previousCategory
            if (category == 'Done'){
                previousCategory = 'Doing'
            }else if (category == 'Doing'){
                previousCategory = 'Todo'
            }else{
                previousCategory = 'Backlog'
            }

            axios({
                url: `/tasks/${id}`,
                method: 'patch',
                data: {
                    category: previousCategory
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(task => {
                this.$emit('changePage', 'main-page')
            })
            .catch(err => {
                console.log(err)
            })
        },

        updateTask(){
            this.$emit('toEditTask', this.task)
        },

        deleteTask(){
            axios({
                url: `/tasks/${this.task.id}`,
                method: 'delete',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(task => {
                this.$emit('changePage', 'main-page')
            })
            .catch(err => {
                console.log(err)
            })
        },

        generateDate(date){
            let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [year, month, day].join('-');
        }
    }
}
</script>

<style>
    .card-body{
        border: lightpink 0.5px solid;
    }
    .card-body:hover{
        background-color: lightpink;
    }
    svg{
        background-color: lavender;
        margin: 2px;
    }
    svg:hover{
        background-color: hotpink;
    }
</style>