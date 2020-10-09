<template>
  <section class="container">   
        <div class="flex-container">
            <div class="card col-3 p-3" style="max-width: 20rem;">
                <div class="card-header m-3 bg-danger">
                    <h1 class="text-center white">Backlog</h1>
                </div>
                <div>
                <KanbanCard
                v-for="task in tasks"
                :key="task.id"
                :card="task"
                @fetchData="fetchData"> //bug
                </KanbanCard>    
                </div>

            </div>

        </div>
    </section>
</template>

<script>
import axios from 'axios'
import KanbanCard from './KanbanCard'
const baseUrl = 'http://localhost:3000'

export default {
    name: 'KanbanApp',
    props: ["card"],
    components: {
        KanbanCard
    },
    data(){
        return{
            tasks: []
        }
    },
    methods:{
        fetchData(){
            this.$emit("fetchData");
        }
    },
    created(){
        this.fetchData()
    }
}
</script>

<style>

</style>