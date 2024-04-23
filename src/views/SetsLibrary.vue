<script setup>
    import IconBackArrow from '@/icons/IconBackArrow.vue';

</script>


<template>

    <nav class="navbar lato-light">
          <a class="nav-link back" href="#"> 
            <IconBackArrow class="IconBackArrow"/> back
          </a>
          <div class="col title">Library</div>
    </nav>
    <div class="container">
        
        <div class="container-mt-12">
            
            <h1 class="lato-light primary-text">Choose your set</h1>
        

            <button type="button" class="btn btn-secondary btn-first bottom">Create new set</button>

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
</style>