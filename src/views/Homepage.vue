<template>
         <section>
            <div id="mainpage">
                <div class="container-fluid">
                    <h3 class="text-center mt-2">Kanban</h3>
                    <button @click.prevent="changePage" class="btn btn-warning"> Add New Task </button><br><br>
                    <div class="row">
                        <TaskHead 
                            v-for="(stage, i) in stages"
                            :key='i'
                            :stage="stage"
                            :fetchedTasks="fetchedTasks"
                            @updateForm="updateForm"
                            @deleteTask="deleteTask"
                        ></TaskHead>
                            <!-- <div class="col-md-3">
                            <div class="bg-secondary rounded p-3 text-left">To-Do</div>
                        </div>
                        <div class="col-md-3">
                            <div class="bg-info rounded p-3 text-left">Doing</div>
                        </div>
                        <div class="col-md-3">
                            <div class="bg-warning rounded p-3 text-left">Done</div>
                        </div> -->
                    </div>
                </div>
            </div>
        </section>
</template>

<script>
import TaskHead from '../components/TaskHead'
import axios from '../config/axios'
export default {
    name : 'Homepage',
    components : {
        TaskHead
    },
    props : ['stages'],
    data() {
        return {
            fetchedTasks : []
        }
    },
    methods : {
    fetchTasks() {
      axios({
        url : '/tasks',
        method : 'get',
        headers : {
          access_token : localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
        this.fetchedTasks = data.tasks
        console.log(data, '<<< data fetch');
      })
      .catch(err => {
        console.log(err.response, 'error fetch');
      })
    },
    changePage() {
        this.$emit('changePage', 'add-task')
    },
    updateForm(payload) {
        this.$emit('updateForm', payload)
    },
    deleteTask(payload) {
        this.$emit('deleteTask', payload)
        this.fetchTasks()
    }
  },
  created() {
    this.fetchTasks()
  }
}
</script>

<style>

</style>