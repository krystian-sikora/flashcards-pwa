<template>

<div class="newset">
    <div class="title">Enter the name</div>
    <div class="mb-3">
            <input type="email" 
                class="form-control" 
                aria-describedby="emailHelp" 
                placeholder="My new set"
                v-model="email"
            >
        </div>
    <button type="button" class="btn btn-secondary flashcard-button">Create</button>
</div>
</template>

<style>

.newset {
    font-family: 'Lato'; 
    font-size: 20px; 
    margin-bottom: 50px;
}

.title {
    margin-bottom: 50px;
    font-size: xx-large;
}


</style>
