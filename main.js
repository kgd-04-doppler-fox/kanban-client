var app = new Vue({
    el: '#app',
    data: {
        email_login: '',
        password_login: '',
        isLogin: false,
        isRegister: false,
        errMessage: '',
        first_name: '',
        last_name: '',
        password_reg: '',
        email_reg: '',
        baseUrl: 'http://localhost:3000',
        errormsg: 'transparent',
        errorLogin: 'transparent',
        tasks: []
    },
    methods: {
        signin(){
            this.isRegister = false
        },

        login(){
            axios({
                url: `${this.baseUrl}/login`,
                method: 'post',
                data: {
                    email: this.email_login,
                    password: this.password_login
                }
            })
                .then(response => {
                    localStorage.setItem('access_token', response.data.access_token)
                    this.isLogin = true
                    this.fetchRead()
                })
                .catch(err => {
                    this.errorLogin = 'red'
                })
            
            this.email_login = ''
            this.password_login = ''
        },

        registration(){
            axios({
                url: `${this.baseUrl}/register`,
                method: `post`,
                data: {
                    name: `${this.first_name} ${this.last_name}`,
                    email: this.email_reg,
                    password: this.password_reg
                }
            })
            .then(response => {
                this.isRegister = true
                this.first_name = ""
                this.last_name = ""
                this.email_reg = ""
                this.password_reg = ""
                this.errormsg = "green"
            })
            .catch(err=>{
                console.log(err)
            })
        },

        resetError (){
            this.errorLogin = 'transparent'
        },
        
        signup(){
            this.isRegister = true 
        },
        
        cancel(){
            this.isLogin = false
            this.isRegister = false
        },

        fetchRead (){
            axios({
                url: `${this.baseUrl}/tasks`,
                method: `get`,
                headers: {
                    access_token : localStorage.getItem('access_token')
                }
            })
            .then(response => {
                this.tasks = response.data
            })
            .catch(err => {
                throw err
            })
        },

        logout(){
            localStorage.clear()
            this.isLogin = false
        }


    },
    created() {
        if (localStorage.getItem('access_token')){
            this.isLogin = true
            this.fetchRead()
        }
        else {
            this.isLogin = false
        }
    }
})