<script setup>
    import IconBackArrow from '@/icons/IconBackArrow.vue';

</script>
<template>
    <nav class="navbar lato-light">
          <a class="nav-link back" href="#"> 
            <IconBackArrow class="IconBackArrow"/> back
          </a>
          <div class="col title">New</div>
    </nav>
    <div class="container">
        <div class="container-mt-12">
            <h1 class="lato-light primary-text" style="margin-top: 100px"> Enter the name</h1>
            <input class="form-control input" placeholder="My new set">
            <button type="button" class="btn btn-secondary btn-first">Create</button>
            </div>
            

    </div>
    </template>
    
    <style>
    
    </style>