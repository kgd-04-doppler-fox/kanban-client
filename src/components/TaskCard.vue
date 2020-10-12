<template>
  <div id="card_task">
    <p id="title_head" class="card-header">{{tugas.title}}</p>
    <div class="card-body">
        <a id="btn_edit" href="#" class="btn btn-primary btn-sm" @click="edit(tugas.id)" v-if="authorized">edit</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default {    
    name: "CardTask",
    props: ['tugas'],
    data(){
      return {
        creatorName: '',
        authorized : false
      }
    },
    methods: {
      edit(id){
        this.$emit('editPage', this.tugas)
      },

    },
    created(){
      const token = localStorage.getItem('access_token')
      const decoded = jwt.verify(token, 'secret')
      if(decoded){
        if(decoded.id === this.tugas.UserId){
          this.authorized = true
        }
      }
      else {
        this.authorized = false
      }
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