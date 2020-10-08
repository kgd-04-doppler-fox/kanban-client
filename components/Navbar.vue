<template>
    <nav class="navbar navbar-light" style="background-color: #6CBDB2">
        <span class="navbar-brand mb-0 h1" style="font-family: 'Galada', cursive; color:white; font-size: larger;">Kanban</span>
        <button class="btn btn-danger ml-auto" @click="logout" v-if="page === 'home'">logout</button>
        <button class="btn ml-auto" style="background-color: teal; color: white;" v-if="page === 'register'" @click='signin'>Sign in</button> 
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['page'],
    data (){
        
    },
    methods:{
        logout(){
            localStorage.clear()
            this.$emit('logout', 'login')
        },

        signin(){
            this.$emit('signin', 'login')
        }

    }

}
</script>

<style>

</style>