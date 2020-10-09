<template>
    <div class="container">
        <div class="row">
                <TaskBoard
                v-for="(category, i) in categories" :key="i"
                :category="category"
                @changePage="changePage"
                @toEditTask="toEditTask"
                :tasks="tasks"
            ></TaskBoard>
        </div>
    </div>
</template>

<script>
import TaskBoard from './TaskBoard'
import axios from '../config/axios'

export default {
    props:['categories'],
    components:{
        TaskBoard,
    },
    name: 'BoardList',
    data(){
        return{
            tasks: []
        }
    },
    methods: {
        fetchTask(){
            axios({
                url: "/tasks",
                method: "get",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(({data}) =>{
                this.tasks = data.tasks
            })
            .catch(err => {
                console.log(err)
            })
        },
        changePage(){
            this.fetchTask()
            this.$emit('changePage', 'main-page')
        },
        toEditTask(task){
            this.$emit('toEditTask', task)
        }
    },
    created(){
        this.fetchTask()
    }
}
</script>

<style>

</style>