<template>
  <div class="container-fluid" id="register-page">
    <div class="row my-3">
      <div class="col-12 text-center">
        <h2 class="py-3">Manage your tasks with Kanban</h2>
        <img
          class="reg-img pb-3"
          src="../assets/undraw_User_flow_re_bvfx.svg"
          alt="Manage tasks"
        />
        <h5 class="font-weight-light mb-3">Create a new account</h5>

        <div class="col-md-6 mx-auto">
          <form id="register" @submit.prevent="register">
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
              <input
                v-model="user.email"
                id="email-reg"
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
                id="password-reg"
                class="form-control"
                name="password"
                placeholder="Enter password"
                type="password"
              />
            </div>

            <button type="submit" class="btn btn-primary">Register</button>
          </form>

          <p class="text-center pt-4">
            Have an account?
            <a href="#login" id="login-from-form" @click="login">Log In</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterForm",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      axios({
        url: "http://localhost:3000/googleSignIn",
        method: "POST",
        data: {
          email: this.user.email,
          password: this.user.password,
        },
      })
        .then(() => {
          this.$emit("switchPage", "login");
        })
        .catch((err) => {
          console.log(err);
        });
      this.user.email = "";
      this.user.password = "";
    },
    login() {
      this.$emit("switchPage", "login");
    },
  },
};
</script>

<style scoped>
.container-fluid {
  min-height: 100vh;
}
</style>