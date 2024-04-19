<template>
    <div class="signIn container">
      <h1>Flashcards</h1>
      <h2 class="large">Sign in</h2>
      <div class="mb-3">
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
      <div class="mb-3">
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter password">
        </div>
      <button type="button" class="btn btn-secondary">Sign In</button>
      <h2 class="medium">Or</h2>
      <button type="button" class="btn btn-secondary">Sing Up with Google</button>
        <h2 class="small">Forgot password?</h2>
        <h2 class="small">Dont't have an account?</h2>
    </div>
  </template>
  
  <style>
    .signIn {font-family: 'Lato'; font-size: 20px; 
    margin-bottom: 50px;}

    button {
        width: 90%;
        max-width: 400px;
        font-size: 1em;
        margin-top: 30px;
        margin-bottom: 30px;
        margin-left: auto;
        margin-right: auto;
        font-family: 'Lato';
 
    } 

    h1 {
        font-family: 'Chewy'; font-size: 50px; color: green;
        margin-bottom: 40px;
    }

    .large {
        margin-bottom: 60px;
    }

    .medium {
        font-size: 15px;

    }

    .small {
        margin-bottom: 20px;
        font-size: 10px;

    }

    .form-control {
        width: 90%;
        margin-left: auto;
        margin-right: auto; 
        max-width: 400px;
        font-family: 'Lato';
    }

</style>