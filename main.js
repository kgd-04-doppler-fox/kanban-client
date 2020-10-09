const app = new Vue ({
    el:"#app",
    data: {
        email: '',
        password: '',
        baseUrl: 'http://localhost:3000',
        page: '',
        tasksBacklog: [],
        tasksToDo: [],
        tasksDoing: [],
        tasksDone: [],
        taskId: 0
    },
    methods: {
        login() {
            axios({
                url: `${this.baseUrl}/login`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                localStorage.setItem('access_token',data.access_token)
                this.page = 'home-page'
                this.fetchTask()
            })
            .catch (err => {
                console.log(err, 'error login')
            })
        },
        logout() {
            localStorage.clear()
            this.page = 'login-page'
        },
        fetchTask() {
            axios({
                url: `${this.baseUrl}/tasks`,
                method: 'get',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (({data}) => {
                for(let i = 0; i < data.length; i ++){
                    if (data[i].category === 'backlog'){
                        this.tasksBacklog.push(data[i])
                    }else if (data[i].category === 'todo'){
                        this.tasksToDo.push(data[i])
                    }else if (data[i].category === 'doing'){
                        this.tasksDoing.push(data[i])
                    }else if (data[i].category === 'done'){
                        this.tasksDone.push(data[i])
                    }
                }
            })
            .catch (err => {
                console.log(err)
            })
        },
        update() {
            axios({
                url: `${this.baseUrl}/tasks/${this.taskId}`,
                method: 'patch',
                data: {
                    category: "todo"
                }
            })
            .then (({data}) => {
                console.log(data)
                this.page = 'home-page'
                this.fetchTask()
            })
            .catch (err => {
                console.log(this.taskId)
            })
        },
        to_register() {
            localStorage.setItem('register_token','register')
            this.page = 'register-page'
            console.log(this.page)
        },
        to_login() {
            localStorage.removeItem('register_token')
            this.page = 'login-page'
        },
        to_addTask() {
            localStorage.setItem('add_token','add-task')
            this.page = 'add-page'
        }
    },
    created() {
        if(localStorage.access_token && !localStorage.register_token && !localStorage.add_token){
            this.page = 'home-page'
            this.fetchTask()
        }else if (!localStorage.access_token && localStorage.register_token && !localStorage.add_token){
            this.page = 'register-page'
        }else if (localStorage.access_token && !localStorage.register_token && localStorage.add_token){
            this.page = 'add-page'
        }else {
            this.page = 'login-page'
        }
    }
})