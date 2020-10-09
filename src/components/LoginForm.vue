<template>
  <div class="login-form">
    <form @submit.prevent="login">
      <h2 class="text-center">Log in</h2>
      <div class="form-group">
        <input
          v-model="user.email"
          type="text"
          class="form-control"
          placeholder="Email"
          required="required"
        />
      </div>
      <div class="form-group">
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          placeholder="Password"
          required="required"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block bg-dark rounded">
          Log in
        </button>
      </div>
      <div class="clearfix"></div>
      <input
        type="button"
        class="btn btn-info rounded"
        value="Create an account"
        @click.prevent="toRegister"
      />
    </form>
    <button v-google-signin-button="clientId" class="google-signin-button">
      Continue with Google
    </button>
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
      clientId:
        "35758182123-qbg069p8ce5rebfp5mfv8jmlf6jem7en.apps.googleusercontent.com",
    };
  },
  methods: {
    OnGoogleAuthSuccess(idToken) {
      console.log(idToken);
      localStorage.setItem('access_token', idToken)
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
    login() {
      axios({
        method: "POST",
        url: "http://localhost:3000/login",
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
  },
};
</script>

<style>
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