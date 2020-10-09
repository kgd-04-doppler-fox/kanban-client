<template>
  <div id="card_task">
    <p class="card-header">{{tugas.title}}</p>
    <div class="card-body">
        <a href="#" class="btn btn-primary btn-sm" @click="edit(tugas.id)">edit</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {    
    name: "CardTask",
    props: ['tugas'],
    methods: {
      edit(id){
        localStorage.setItem('taskId', id)
        this.$emit('editPage', this.tugas)
      }
    }
}
</script>

<style scoped>
</style>