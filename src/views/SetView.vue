<script setup>
import IconBackArrow from '@/icons/IconBackArrow.vue';
import defineProps from 'vue'


// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: String
})
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
            <div class="rectangle">
                <h6 class="flashcard-text lato-light">&#9634; Flashcard 1</h6>
                <h1 class="flashcard-text">Word or phrase</h1>
                <h5 class="flashcard-text">Explanation</h5>
            </div>
            


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

    .rectangle {
        height: 120px;
        width: auto;
        background-color: #b1b1b1;
        margin: auto;
        margin-top: 10px;
        border-radius: 10px;
        }

    .flashcard-text {
        text-align: left;
        margin-left: 8px;

        }
</style>