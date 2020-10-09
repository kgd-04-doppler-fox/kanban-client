<template>
  <section class="container">   
        <div class="flex-container">
            <div class="card col-3 p-3" style="max-width: 20rem;">
                <div :class="status.color">
                    <h1 class="text-center white">{{status.name}}</h1>
                </div>
                <div>
                <KanbanCard
                v-for="task in filterTask"
                :key="task.id"
                :card="task"
                @card="fetchData"> 
                </KanbanCard>    
                </div>

            </div>

        </div>
    </section>
</template>

<script>

import KanbanCard from './KanbanCard'


export default {
    name: 'KanbanApp',
    props: ["card", "status"],
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
    computed:{
        filterTask(){
            return this.card.filter(task=>task.status ==this.status.id)
        }
    }
}
</script>

<style>

</style>