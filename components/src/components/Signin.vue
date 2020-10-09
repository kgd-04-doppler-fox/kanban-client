<template>
  <div
    class="modal fade"
    id="signinModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Signin</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            id="closeSignin"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="container">
              <form id="signinForm" @submit.prevent="signin">
                <div class="form-group">
                  <label for="emailSignin">Email address</label>

                  <input
                    type="email"
                    class="form-control"
                    v-model="user.email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <small id="emailHelp" class="form-text text-muted"
                    >We'll never share your email with anyone else.</small
                  >
                </div>
                <div class="form-group">
                  <label for="passwordSignin">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.password"
                    placeholder="Password"
                  />
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
              <div class="text-center m-2">
                <small>OR</small>
              </div>

              <!-- GOOGLE SIGN -->
              <div id="gSignin" class="text-center">
                <div id="customBtn" class="g-signin2" data-onsuccess="onSignIn">
                  <span class="icon"></span>
                  <span class="buttonText">Google</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:3000";

export default {
  name: "Signin",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signin() {
      axios({
        method: "POST",
        url: `${baseUrl}/users/login`,
        data: {
          email: this.user.email,
          password: this.user.password,
        },
      })
        .then((response) => {
          localStorage.setItem(`access_token`, response.data.access_token);
          this.$emit("page", "mainPage");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style>
</style>