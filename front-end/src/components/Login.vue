<template>
<div class="hero">
  <div class="heroBox">
    <form class="pure-form">
        <legend>Register for an account</legend><br>
        <input placeholder="first name" v-model="firstName"><br>
        <input placeholder="last name" v-model="lastName"><br>
        <input placeholder="username" v-model="username"><br>
        <input type="password" placeholder="password" v-model="password"><br>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">Register</button>
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <form class="pure-form space-above">
        <legend>Login</legend><br>
        <input placeholder="username" v-model="usernameLogin"><br>
        <input type="password" placeholder="password" v-model="passwordLogin"><br>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HomePage',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },

  }
}
</script>

<style scoped>
.space-above {
  margin-top: 50px;
}

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.heroBox {
  text-align: center;
  display: flex;
  justify-content: space-evenly;
}

.hero form {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero form legend {
  font-size: 20px;
}

input {
  margin: 7px;
  padding: 5px;
  font-size: 16px;
  border: solid 1px #ccc;
  border-radius: 35px;
  width: 100%;
  padding: 18px;
  text-align: left;
  font-size: 20px;
  letter-spacing: 1px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}

button {
    background-color: rgb(43, 42, 42);
    border: none;
    padding: 13px;
    color: #fff;
    border-radius: 30px;
    width: 65%
}

button:hover {
    cursor: pointer;
    background-color: rgb(51, 50, 50);
}
</style>
