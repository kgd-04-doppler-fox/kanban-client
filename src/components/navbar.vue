<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <button v-if="currentPage == 'home-page'" @click="logout" class="btn btn-warning">Logout</button>
        </div>
    </nav>
</template>

<script>
export default {
    name : "navbar",
    props : ["currentPage"],
    methods : {
        logout() {
            this.$emit('logout', this.logout)
        }
    }
}
</script>

<style>

</style>