<script setup>
import IconBackArrow from '@/icons/IconBackArrow.vue';

</script>

<template>
     <nav class="navbar lato-light">
          <a class="nav-link back" href="#"> 
            <IconBackArrow class="IconBackArrow"/> back
          </a>
          <div class="col title">Set_name</div>
    </nav>
    <div class="container">
        
        <div class="container-mt-12">
            
            <h1 class="lato-light primary-text">tu beda fiszki</h1>
        

            <button type="button" class="btn btn-secondary btn-first bottom">Study</button>
            <button type="button" class="btn btn-secondary btn-first bottom2">Add new flashcard</button>

        </div>
    </div>

</template>
<style>
    .bottom {
        position: absolute;
        bottom: 20px;
        right: 20px;
        left: 20px;
        
    }

    .bottom2 {
        position: absolute;
        bottom: 70px;
        right: 20px;
        left: 20px;
        
    }
</style>