<template>
    <div class="signIn">
      <h1>Flashcards</h1>
      <h2>Sign up</h2>
      <div class="mb-3">
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="mb-3">
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter password">
            </div>
        <div class="mb-3">
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Repeat password">
        </div>
      <button type="button" class="btn btn-secondary">Sign In</button>
      <h3>Or</h3>
      <button type="button" class="btn btn-secondary">Sing Up with Google</button>
      <h4>Already have an account?</h4>
    </div>
  </template>
  
  <style>
    .signIn {font-family: 'Lato'; font-size: 20px; 
    margin-bottom: 50px;}

    button {
    width: 30%;
    font-size: 1em;
    margin-top: 30px;
    margin-bottom: 30px;
    }

    h1 {
        font-family: 'Chewy'; font-size: 50px; color: green;
        margin-bottom: 40px;
    }

    h2 {
        margin-bottom: 100px;
    }

    h4 {
        margin-bottom: 20px;
        font-size: 15px;

    }

    .form-label {
        font-family: 'Lato'; font-size: 20px; 
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .form-control {
        align-items: center;
        width: 30%;
    }

</style>