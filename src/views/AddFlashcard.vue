
<template>
    <nav class="navbar bg-light nav">
        <div class="container text-center">
    <div class="row align-items-start">
        <div class="col">
        One of three columns
        </div>
        <div class="col">
        One of three columns
        </div>
        <div class="col">
        One of three columns
        </div>
    </div>
</div>
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

        li {
            
                
            
        }

        
header {
width: 90%;
background-image: linear-gradient(top, #BB5D88 46%, #B24A79 58%);
height: 30px;
border: 1px solid #6B2D49;
padding: 2px 30px;
}

a {
border: 1px solid rgba(0,0,0,0.5);
border-left-color: transparent;
padding: 5px 7px 5px 10px;
background-image: linear-gradient(top, #B24A79 46%, #943E65 58%);
border-radius: 5px;
display: inline-block;
font-weight: bold;
color: white;
text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);
text-decoration: none;
position: relative;
font-family: "Helvetica Neue", Helvetica, sans-serif;
font-size: 14px;
line-height: 18px;
box-shadow: 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 1px 1px rgba(0, 0, 0, 0.2);
} 

a:before {
border: 1px solid rgba(0,0,0,0.4);
background-image: linear-gradient(-45deg, #B24A79 46%, #943E65 58%);
border-width: 0px 0 1px 1px;
content: "";
width: 19px;
height: 19px;
position: absolute;
top: 4px;
left: -8px;
transform: rotate(45deg);
}

a span {
position: relative;
z-index: 2;
}
    </style>