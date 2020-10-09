<template>
  <div
    class="modal fade"
    id="modalSignup"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Signup</h5>
          <button
            type="button"
            class="close"
            id="closeSignup"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <form id="signupForm" @submit.prevent="signup">
              <div class="form-group">
                <label for="nameSignup">Name</label>
                <input
                  type="name"
                  class="form-control"
                  v-model="user.name"
                  placeholder="Name"
                />
              </div>
              <div class="form-group">
                <label for="emailSignup">Email address</label>

                <div id="alertEmailSignUp"></div>
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
                <label for="passwordSignup">Password</label>
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
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" ref="myBtn" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "https://shrouded-falls-16636.herokuapp.com";

export default {
  name: "Signup",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    autoClose($event) {
      const elem = this.$refs.myBtn;
      elem.click();
    },
    signup() {
      axios({
        method: "POST",
        url: `${baseUrl}/users/register`,
        data: {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        },
      })
        .then((response) => {
          this.autoClose()
          console.log(response);
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