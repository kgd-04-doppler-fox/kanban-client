<template>
    <div id="addNewTask">
        <h3 class="text-center text-white pt-2"> Edit Task Form </h3>
        <div class="container">
            <div id="addNew-row" class="row justify-content-center align-items-center">
                <div id="addNew-column" class="col-md-6">
                    <div id="addNew-box" class="col-md-12">
                        <form @submit.prevent="editTask" id="addNew-form" class="form">
                            <h3 class="text-center text-info">Edit Task</h3>
                            <div class="form-group">
                                <label for="title" class="text-info">Title:</label><br>
                                <input v-model="title" type="text" name="title" id="title" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="category" class="text-info">Category:</label><br>
                                <select v-model="category" id="category" name="category">
                                    <option value="" disabled> Please Select </option>
                                    <option value="Back-Log">Back-Log</option>
                                    <option value="To-Do">To-Do</option>
                                    <option value="Doing">Doing</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="submit" name="submit" class="btn btn-info btn-md" value="submit">
                            </div>
                        </form>
                        <button @click="deleteTask" class="fas fa-pen-square">Delete</button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'AddTask',
    props : ['taskDataForEdit'],
    data () {
        return {
            title : this.taskDataForEdit.title,
            category : this.taskDataForEdit.category
        }
    },
    methods : {
        addTask() {
            let payload = {
                title : this.title,
                category : this.category
            }
            this.$emit('addTask', payload)
        },
        editTask() {
            let payload = {
                id : this.taskDataForEdit.id,
                title : this.title,
                category : this.category
            }
            this.$emit('editTask', payload)
        },
        deleteTask() {
            let payload = {
                id : this.taskDataForEdit.id,
            }
            this.$emit('deleteTask', payload)
        }
    }

}
</script>

<style>

</style>