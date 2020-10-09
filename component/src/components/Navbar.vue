<template>
    <nav class="navbar navbar-light justify-content-between">
        <div><a class="navbar-brand text-dark">Kanban</a></div>
        <div>
          <button id="btn-logout" class="btn btn-info" @click="logout" v-if="page === 'mainPage'">Logout</button>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['page'],
    methods: {
        logout () {
            localStorage.clear()
            this.$emit('logoutSuccess', 'loginPage')
        }
    }
}
</script>

<style>

</style>