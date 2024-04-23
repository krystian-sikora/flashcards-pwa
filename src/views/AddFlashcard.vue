<script setup>
import IconBackArrow from '@/icons/IconBackArrow.vue';

</script>

<template>
    <nav class="navbar lato-light">
          <a class="nav-link back" href="#"> 
            <IconBackArrow class="IconBackArrow"/> back
          </a>
          <div class="col title">Add</div>
    </nav>
    <div class="container">
        <div class="container-mt-12">
            <h1 class="lato-light primary-text">Add new flashcard</h1>
          
            <textarea class="form-control input" 
                        id="exampleFormControlTextarea1" 
                        rows="3" 
                        placeholder="Word or phrase"></textarea>
            
            <textarea class="form-control input textarea" 
                        id="exampleFormControlTextarea1" 
                        rows="3" 
                        placeholder="Explanation"></textarea>    
                     

        </div>
                <button type="button" class="btn btn-secondary btn-first">Add</button>
                </div>
            

    </template>
    
    <style>
        .textarea {
            margin-bottom: 20px;
        }



       

    </style>