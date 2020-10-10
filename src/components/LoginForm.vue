<template>
  <div class="container-fluid" id="loginPage">
    <div class="row my-3">
      <div class="col-12 text-center">
        <h2 class="py-3">Manage your tasks with Kanban</h2>

        <img
          class="pb-3"
          src="../assets/undraw_Done_checking_re_6vyx.svg"
          alt="Manage tasks"
        />
        <h5 class="font-weight-light mb-3">Sign in to your account</h5>

        <div class="col-md-6 mx-auto">
          <form @submit.prevent="login">
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
              <input
                v-model="user.email"
                id="email-log"
                name="email"
                class="form-control"
                placeholder="Email address"
                type="email"
              />
            </div>

            <div class="form-group input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                v-model="user.password"
                id="password-log"
                class="form-control"
                name="password"
                placeholder="Enter password"
                type="password"
              />
            </div>

            <button type="submit" class="btn btn-primary">Sign in</button>
          </form>

          <p class="text-center pt-4">
            Don't have an account yet?
            <a href="#register" id="login-from-form" @click="register"
              >Register</a
            >
          </p>

          <p class="divider-text pt-1">
            <span>OR</span>
          </p>

          <button
            v-google-signin-button="clientId"
            class="google-signin-button"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      clientId:
        "949059631197-56af1qsb9b5f8frjf68jgquolkdu7o1g.apps.googleusercontent.com",
    };
  },
  methods: {
    login() {
      axios({
        url: "http://localhost:3000/login",
        method: "POST",
        data: {
          email: this.user.email,
          password: this.user.password,
        },
      })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("email", res.data.email);
          this.$emit("switchPage", "main");
        })
        .catch((err) => {
          console.log(err);
        });
      this.user.email = "";
      this.user.password = "";
    },
    register() {
      this.$emit("switchPage", "register");
    },
    OnGoogleAuthSuccess(idToken) {
      console.log(idToken);
      let id_token = idToken;
      axios({
        url: `http://localhost:3000/googleSignIn`,
        method: "POST",
        data: {
          access_token: id_token,
        },
      })
        .then((response) => {
          localStorage.setItem("access_token", response.data.access_token);
          this.$emit("switchPage", "main");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    OnGoogleAuthFail(error) {
      console.log(error, "error");
    },
  },
};
</script>

<style scoped>
#loginPage {
  min-height: 100vh;
}

img {
  position: relative;
  width: 40%;
}

.google-signin-button {
  color: white;
  background-color: #47bea3;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
}

.google-signin-button:hover {
  -webkit-box-shadow: 0px 3px 16px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 16px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 3px 16px -2px rgba(0, 0, 0, 0.75);
}
</style>