<template>
  <div class="card-board-content py-1 px-3 overflow-auto"
    style="background-color: #f8f9fc; max-height: 80vh;">
    <div class="card my-3">
    <div class="card-body">
        <h5 class="card-title">Task Card</h5>
        <p class="card-text">
        <small class="text-muted">user@gmail.com</small> <br>
        <small class="text-muted">created date</small>
        </p>
        <div class="options">
        <button class="btn"><i class="fas fa-pencil-alt"></i></button>
        <button class="btn"><i class="fas fa-trash-alt"></i></button>
        <button class="btn"><i class="fas fa-expand-arrows-alt"></i></button>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    name: TaskCard
}
</script>

<style>

</style>