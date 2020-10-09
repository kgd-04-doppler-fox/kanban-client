<template>
    <div class="row">
        <nav class="col-10 mx-auto navbar navbar-dark bg-dark">
            <button type="button" class="btn btn-primary" @click="addTask">New Task +</button>
            <h3 class="h3"> {{this.userEmail}} </h3>
            <button type="button" class="btn btn-warning" @click="logout">Logout</button>
        </nav>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userEmail: this.getUsername(localStorage.getItem('email'))
        }
    },
    name: 'Navbar',
    methods : {
        logout(){
            localStorage.clear()
            this.$emit('changePage', 'login-page')
        },

        addTask(){
            this.$emit('changePage', 'add-task')
        },

        getUsername(emailAddress){
            return emailAddress.substring(0, emailAddress.indexOf("@"));
        }
    }
}
</script>

<style>
    h3{
        color: aliceblue;
    }
</style>