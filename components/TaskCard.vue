<template>
  <div id="card_task">
    <p class="card-header">{{tugas.title}}</p>
    <div class="card-body">
        <a href="#" class="btn btn-primary btn-sm">edit</a>
    </div>
  </div>
</template>

<script>
export default {    
    name: "CardTask",
    props: ['tugas']
}
</script>

<style scoped>
</style>