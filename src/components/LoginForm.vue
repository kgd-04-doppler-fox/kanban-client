<template>
<div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card card-signin flex-row my-5">
          <div class="card-img-left d-none d-md-flex">
          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Login</h5>
            <form @submit.prevent="login" class="form-signin">
              <div class="form-label-group">
                <input v-model="user.email" type="email" id="inputEmail" class="form-control" placeholder="Email address"
                  required>
                <label for="inputEmail">Email address</label>
              </div>
              <hr>
              <div class="form-label-group">
                <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password"
                  required>
                <label for="inputPassword">Password</label>
              </div>
              <button class="btn btn-lg btn-dark btn-block text-uppercase bg-blue" type="submit">Login</button>
              <a class="d-block mt-2 text-center text-dark" @click="toRegister">Dont have an account? register here
              </a>
              <hr class="my-4">
            </form>
            <button v-google-signin-button="clientId" class="google-signin-button">Sign in With Google</button>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
import GoogleLogin from "vue-google-login";
import axios from "axios";
export default {
  name: "LoginForm",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      clientId: "35758182123-qbg069p8ce5rebfp5mfv8jmlf6jem7en.apps.googleusercontent.com",
    };
  },
  methods: {
    login() {
      axios({
        method: "POST",
        url: "https://tranquil-tundra-97414.herokuapp.com/login",
        data: {
          email: this.user.email,
          password: this.user.password,
        },
      })
        .then((response) => {
          localStorage.setItem("access_token", response.data.access_token);
          this.$emit("loginSucced", "dashboard");
          this.$emit("afterLogin");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toRegister() {
      this.$emit("changePage", "registerPage");
    },
    OnGoogleAuthSuccess (idToken) {
      let id_token = idToken;
      axios({
        url: `https://tranquil-tundra-97414.herokuapp.com/googleSignIn`,
        method: "POST",
        data: {
          access_token: id_token,
        },
      })
        .then((response) => {
          localStorage.setItem("access_token", response.data.access_token);
          this.$emit("changePage", "dashboard");
          this.$emit('fetchTask')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  },
};
</script>

<style scoped>
.container {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

body {
  background: #ffffff;
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-img-left {
  width: 45%;
  /* Link to your background image using in the property below! */
  background: scroll center
    url("https://assets.plan.io/images/blog/what-is-task-management.png");
  background-size: cover;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>