<template>
  <div id="card_task">
    <p id="title_head" class="card-header">{{tugas.title}}</p>
    <div class="card-body">
        <a id="btn_edit" href="#" class="btn btn-primary btn-sm" @click="edit(tugas.id)">edit</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {    
    name: "CardTask",
    props: ['tugas'],
    data(){
      return {
        creatorName: ''
      }
    },
    methods: {
      edit(id){
        this.$emit('editPage', this.tugas)
      },

    }
}
</script>

<style scoped>
  #btn_edit{
    margin-left: 70%;
  }

  #title_head{
    background: linear-gradient(#90F7EC, #90F7EC, #32CCBC);
    font-size: small;
    font-family: 'Raleway', sans-serif
  }
</style>