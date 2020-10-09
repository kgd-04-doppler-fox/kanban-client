<template>
  <div class="card bg-white shadow p-3 mt-0">
        <div class="column">
            <div class="col mt-0">
                <h5>Title: {{task.title}}</h5>
            </div>
            <div class="col">
                <h5>Category: {{task.category}}</h5>
            </div>
            <div class="col">
                <h5>By: {{task.UserId}}</h5>
            </div>
            <div class="card-button">
                <button @click="updateForm" class="fas fa-pen-square">Edit</button> 
                <button @click="deleteTask" class="fas fa-pen-square">Delete</button> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'TaskBox',
    props : ['fetchedTasks', 'task'],
    methods : {
        updateForm() {
            this.$emit('updateForm', this.task)
        },
        deleteTask() {
            this.$emit('deleteTask', this.task)
        }
    }
}
</script>

<style>

</style>