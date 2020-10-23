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
            <div class="card-button" v-if="hideEditButton">
                <button @click="updateForm" class="fas fa-pen-square">Edit</button> 
            </div>
        </div>
    </div>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
    name : 'TaskBox',
    props : ['fetchedTasks', 'task'],
    data () {
        return {
          hideEditButton: false
        }        
    },
    methods : {
        updateForm() {
            this.$emit('updateForm', this.task)
        }
    },
    created () {
        const decoded = jwt.verify(localStorage.getItem('access_token'),'rahasia')
        console.log(decoded);
        if (decoded){
            if (decoded.id === this.task.UserId){
                this.hideEditButton = true
            } else {
                this.hideEditButton = false
            }
        }
    }
}
</script>

<style>

</style>