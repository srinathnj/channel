<?php
// include '../auth.php' ;
// echo PASSWORD_DEFAULT;
// echo "-------------";
// echo password_hash('123',PASSWORD_DEFAULT);
if (isset($_SESSION['user_id'])) {
    header("Location: views/index.php");
    exit();
}
include('Header.php');
 ?>
<section class='login-section justify-content-center'>
 <div class="col-md-4">
  <div class="backdrop justify-contents-center">
    <div class="display-4 text-center">
      Login
    </div>
    <form id="login-form" class="row g-3 needs-validation" action="auth_proxy.php" method="post" novalidate>
    <div class="col-md-12">
      <label for="validationCustomUsername" class="form-label">Username</label>
      <div class="input-group has-validation">
        <span class="input-group-text" id="inputGroupPrepend">@</span>
        <input type="text" class="form-control" name="username" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required value=<?php if(isset($_COOKIE['rememberMe'])) {echo $_COOKIE['rememberMe'];} ?>>
        <div class="invalid-feedback">
          Please enter a username.
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <label for="validationPassword" class="form-label">Password</label>
      <input type="password" class="form-control" id="validationPassword" name="password" required>
      <div class="invalid-feedback">
        Please provide a strong password
      </div>
    </div>
    <div class="col-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" unchecked <?php if(isset($_COOKIE['rememberMe'])) {echo 'checked';} ?> name="rememberMe">
        <label class="form-check-label" for="rememberMe">
          Remember
        </label>
        <p>Don't have an account? <a href="signup.php">Sign Up</a></p>
      </div>
    </div>

    <div class="col-12 text-center">
      <button class="btn btn-primary align-self-center" name="login" type="submit">Login</button>
    </div>

  </form>
  </div>
  </div>
  </section>
 <?include('_plainFooter.php')?>
