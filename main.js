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
        title:''
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
                console.log(err)
            })
        },
        register() {
            axios({
                url: `${this.baseUrl}/register`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                localStorage.removeItem('register_token')
                this.page = 'login-page'
                this.fetchTask()
            })
            .catch (err => {
                console.log(err)
            })
        },
        logout() {
            localStorage.clear()
            this.tasksBacklog = []
            this.tasksToDo = []
            this.tasksDoing = []
            this.tasksDone = []
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
        updateBacklog(id) {
            axios({
                url: `${this.baseUrl}/tasks/${id}`,
                method: 'patch',
                data: {
                    category: "todo"
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (({data}) => {
                this.tasksBacklog = []
                this.tasksToDo = []
                this.tasksDoing = []
                this.tasksDone = []
                this.page = 'home-page'
                this.fetchTask()
            })
            .catch (err => {
                console.log(id)
            })
        },
        updateToDo(id) {
            axios({
                url: `${this.baseUrl}/tasks/${id}`,
                method: 'patch',
                data: {
                    category: "doing"
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (({data}) => {
                this.tasksBacklog = []
                this.tasksToDo = []
                this.tasksDoing = []
                this.tasksDone = []
                this.page = 'home-page'
                this.fetchTask()
            })
            .catch (err => {
                console.log(err)
            })
        },
        updateDoing(id) {
            axios({
                url: `${this.baseUrl}/tasks/${id}`,
                method: 'patch',
                data: {
                    category: "done"
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (({data}) => {
                this.tasksBacklog = []
                this.tasksToDo = []
                this.tasksDoing = []
                this.tasksDone = []
                this.page = 'home-page'
                this.fetchTask()
            })
            .catch (err => {
                console.log(err)
            })
        },
        deleteTask(id) {
            axios({
                url: `${this.baseUrl}/tasks/${id}`,
                method: 'delete',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (({data}) => {
                console.log(id)
                this.tasksBacklog = []
                this.tasksToDo = []
                this.tasksDoing = []
                this.tasksDone = []
                this.page = 'home-page'
                this.fetchTask()
            })
            .catch (err => {
                console.log(err)
            })
        },
        new_task() {
            axios({
                url: `${this.baseUrl}/tasks`,
                method: 'post',
                data: {
                    title: this.title
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then (({data}) => {
                localStorage.removeItem('add_token')
                this.tasksBacklog = []
                this.tasksToDo = []
                this.tasksDoing = []
                this.tasksDone = []
                this.page = 'home-page'
                this.fetchTask()
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