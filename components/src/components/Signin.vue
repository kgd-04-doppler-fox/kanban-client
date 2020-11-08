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
              <GoogleLogin
                :params="params"
                :renderParams="renderParams"
                :onSuccess="onSuccess"
                :onFailure="onFailure"
              ></GoogleLogin>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              ref="myBtn"
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
import GoogleLogin from "vue-google-login";
const baseUrl = "https://shrouded-falls-16636.herokuapp.com";

export default {
  name: "Signin",
  props: [],
  data() {
    return {
      user: {
        email: "",
        password: "",
        error: ""
      },
      params: {
        client_id:
          "419148580155-l4a8am6ev1u521kdp14vjnuodvalob6m.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  methods: {
    autoClose($event) {
      const elem = this.$refs.myBtn;
      elem.click();
    },
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
          this.autoClose();
          this.$emit("page", "mainPage");
          this.$emit("fetchData");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    onSuccess(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      axios({
        url: `${baseUrl}/googleSignIn`,
        method: "POST",
        data: {
          access_token: id_token,
        },
      })
        .then((response) => {
          localStorage.setItem(`access_token`, response.data.access_token);
          console.log(response)
          this.autoClose();
          this.$emit("page", "mainPage");
          this.$emit("fetchData");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    GoogleLogin,
  },
};
</script>

<style>
</style>