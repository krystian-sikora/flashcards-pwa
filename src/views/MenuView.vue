<template>
    <div class="menu">
      <h1>Flashcards</h1>
      <div class="button-container">
        <button type="button" class="btn btn-secondary flashcard-button">Create new set</button>
        <button type="button" class="btn btn-secondary flashcard-button">Sets library</button>
        <button type="button" class="btn btn-secondary flashcard-button">Previous session</button>
        </div>
    </div>
  </template>
  
  <style>
    .menu {font-family: 'Lato'; font-size: 20px}

    .flashcard-button {
        height: 100px;
        font-size: 1em;
        margin-top: 30px;
        margin-bottom: 30px;
        font-family: 'Lato';
        margin-left: auto;
        margin-right: auto; 
        width: 90%;
        max-width: 400px;

    }

    h1 {
        font-family: 'Chewy'; font-size: 50px; color: green;
        margin-bottom: 40px;
    }

    .button-container{
        display: flex;
        flex-direction: column;
    }



</style>