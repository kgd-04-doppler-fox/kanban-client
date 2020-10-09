<template>
    <div class="col mt-3">
        <div class="mb-1 card text-white bg-dark" style="max-width: 18rem;">
            <div class="card-header"> {{category.category}} </div>
                <draggable>
                    <TaskItem
                    v-for="task in taskPerCategory" :key="task.id"
                    :task="task"
                    @changePage="changePage"
                    @toEditTask="toEditTask"
                ></TaskItem>
                </draggable>
        </div>
    </div>
</template>

<script>
import TaskItem from './TaskItem'
import draggable from 'vuedraggable'

export default {
    name: 'TaskBoard',
    props: ['category', 'tasks'],
    methods: {
        changePage(){
            this.$emit("changePage", "main-page")
        },

        toEditTask(task){
            this.$emit('toEditTask', task)
        }
    },

    components:{
        TaskItem,
        draggable
    },

    computed:{
        taskPerCategory(){
            return this.tasks.filter(task => task.category == this.category.category)
        }
    }
}
</script>

<style>

</style>