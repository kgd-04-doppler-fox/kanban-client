<template>
  <div class="col-lg-3 col-md-6 col-sm-12 pb-3">
    <!-- backlog header  -->
    <div class="card-board-header py-2 rounded-top d-flex">
        <h4 class="mx-3 my-2">{{ category }}</h4>
    </div>
    <!-- backlog header ends -->
    <!-- backlog content  -->
    <div class="card-board-content py-1 px-3 overflow-auto"
        style="background-color: #f8f9fc; max-height: 80vh;">
        <!-- single card -->
        <TaskCard v-for="task in filterTask" :key="task.id" :task="task" @tofetchTask="fetchDelete"></TaskCard>
        <!-- card ends  -->
    </div>
    <!-- backlog content ends  -->
    <!-- backlog footer -->
    <div class="card-board-footer rounded-bottom mb-3">
        <div class="add-task">
            <button class="btn"><i class="fas fa-plus"></i> Add task</button>
        </div>
    </div>
    <!-- backlog footer ends -->
  </div>
</template>

<script>
import TaskCard from './TaskCard'
import axios from 'axios'
// import Test from './Test'

export default {
    name: 'CategoryBoard',
    components: { TaskCard },
    props: ['category', 'tasks'],
    computed: {
        filterTask () {
            return this.tasks.filter(task => task.category === this.category)
        }
    },
    methods: {
        deleteTask (id) {
            axios({
                method: 'DELETE',
                url: 'http://localhost:3000/tasks/' + id,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({ data }) => {
                this.$emit('tofetchTask')
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchDelete () {
            this.$emit('toFetchDelete')
        }
    }
}
</script>

<style>

</style>