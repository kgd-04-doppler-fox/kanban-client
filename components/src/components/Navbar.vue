<template>
    <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">~Kanban Sensei~</a>

        <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
            </ul>
            <ul class="navbar-nav">                 
                <li class="nav-item active">
                    <a class="nav-link outside" href="#" data-toggle="modal" data-target="#modalSignup" v-if="page === 'login'">Signup</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link outside" href="#" data-toggle="modal" data-target="#signinModal" v-if="page === 'login'">Signin</a>
                </li>
                           
                <li class="nav-item active">
                    <button type="button" class="btn btn-success" href="#" data-toggle="modal" data-target="#addTaskModal" v-if="page === 'mainPage'" >Add Task</button>
                </li>
                <li class="nav-item active">
                    <button type="button" class="btn btn-danger" href="" @click.prevent="logout" v-if="page === 'mainPage'">Logout</button>
                </li>
                
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['page'],
    methods: {
        logout(){
            localStorage.clear()
            this.$emit('logoutSuccess','login')
        }
    }
}
</script>

<style>

</style>