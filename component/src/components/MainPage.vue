<template>
    <div>
        <div class="row m-0">
          <CategoryBoard v-for="(category, i) in categories" :key="i" :category="category" :tasks="tasks"></CategoryBoard>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CategoryBoard from './CategoryBoard'

export default {
    name: 'MainPage',
    data () {
        return {
            tasks: [],
            categories: ['Backlog', 'To-Do', 'Doing', 'Done']
        }
    },
    components: {
        CategoryBoard
    },
    methods: {
        fetchKanban () {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/tasks',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({ data }) => {
                this.tasks = data
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created () {
        this.fetchKanban()
    }
}
</script>

<style>

</style>