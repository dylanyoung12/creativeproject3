<template>
  <div id="login">
    <h2>Log In</h2>
    <br>
    <div class="container">
      <form>
        <div class="form-group">
          <label for="inputEmail1">Email address</label>
          <input type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input type="password" class="form-control" id="inputPassword" placeholder="Password">
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="check">
          <label class="form-check-label" for="exampleCheck1">Remember Me</label>
        </div>
        <br>
        <button type="submit" class="btn btn-primary" on-click.prevent>Submit</button>
      </form>
    </div>
    <br>
    <div class="container">
      <p>Don't have an account?&emsp;<button class="btn">Register</button></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogIn'
}
</script>

<style scoped>
  .container {
    text-align: left;
  }

  .btn-primary {
    color: black;
    background-color: rgb(126, 182, 217);
    border-color: rgb(126, 182, 217);
  }
</style>
