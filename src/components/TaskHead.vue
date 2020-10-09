<template>
  <div class="col-md-3">
    <div class="bg-primary rounded shadow p-3 text-left">
        <h3>{{stage.stage}}</h3> 
        </div>
        <div class="card bg-white shadow p-3 mt-0">
            <TaskBox
                v-for="task in fetchedTasksPerCategory"
                :key="task.id"
                :task='task'
                @updateForm="updateForm"
                @deleteTask="deleteTask"
            ></TaskBox>
        </div>
    </div>
</template>

<script>
import TaskBox from './TaskBox'
export default {
    name : 'TaskHead',
    components : {
        TaskBox
    },
    props: ['stage', 'fetchedTasks', 'task'],
    computed : {
        fetchedTasksPerCategory() {
            console.log(this.fetchedTasks);
            return this.fetchedTasks.filter(fetchedTask => fetchedTask.category == this.stage.stage)
        }
    },
    methods : {
        updateForm(payload) {
            this.$emit('updateForm', payload)
        },
        deleteTask(payload) {
            this.$emit('deleteTask', payload)
        }
    }
}
</script>

<style>

</style>

