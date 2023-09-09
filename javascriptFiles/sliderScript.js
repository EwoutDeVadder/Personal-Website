// DEBUG VARIABLES
//const DEBUG_mousePosition = document.getElementById("test");
//const DEBUG_mouseButtonDown = document.getElementById("test2");
//const DEBUG_extraDebugText = document.getElementById("test3");
//const DEBUG_extraDebugText2 = document.getElementById("test4");

// HTML + CSS VARIABLES

const contentWrapper = document.getElementById("main_contentwrapper");
const articleSlide = document.getElementById("article_slide");

// COPY SLIDE LIST FOR SMOOTH TRANSITION

var articleLength = document.getElementsByClassName("main_article").length;

var copy = document.querySelector("#article_slide").cloneNode(true);
document.querySelector("#main_contentwrapper").appendChild(copy)


// LOCAL JAVASCRIPT VARIABLES

let mousePosition = {x: undefined, y:undefined};
let mouseButtonDown = new Boolean(false);
let mouseDownPositionX = undefined;
let mouseDifferance = undefined;

let screenFalloffNumbers = {x1: undefined, x2: undefined};
screenFalloffNumbers = {x1: (0),
    x2: (articleLength * 300) + (articleLength * 5) };

let pageIsLoaded = new Boolean(false);

// EVENTS

window.addEventListener("mousemove", (event)=>{
    mousePosition = {x: event.clientX, y: event.clientY};
    mouseMoveEvent();
});


// Contentwrapper so you cant slide the slider when you're out of the spot to slide it
contentWrapper.addEventListener("mousedown", (event)=>{
    mouseButtonDown = true;
});

window.addEventListener("mouseup", (event)=>{
    mouseButtonDown = false;
});

// To make sure that a function doesn't go off before completely loading the page
window.onload = ()=>{
    mouseButtonDown = false;
}

// FUNCTIONS

function mouseMoveEvent(){
    // Move if conditions are met
    sliderFunction_Move();
    
    // Vfx
    sliderFunction_ToOtherSide();

    //DEBUG
    //debugFunction();
}

function sliderFunction_Move(){
    if(mouseButtonDown){
        mouseDifferance = mouseDownPositionX - mousePosition.x;
        // Changes the style ex:"20px" to 20
        let articleVal = toInt(contentWrapper.style.right);
        contentWrapper.style.right = (articleVal+mouseDifferance).toString()+"px";
    }

    // Resets mouseDownPosition for the next loop
    mouseDownPositionX = mousePosition.x;
}

function sliderFunction_ToOtherSide(){
    // Check if the slider should go back or forth so it isn't white infinitely
    if(screenFalloffNumbers.x1 >= toInt(contentWrapper.style.right)){
        contentWrapper.style.right = (screenFalloffNumbers.x2 - 1).toString()+"px";
    }
    else if(screenFalloffNumbers.x2 <= toInt(contentWrapper.style.right)){
        contentWrapper.style.right = (screenFalloffNumbers.x1 + 1).toString()+"px";
    }
}

function toInt(i){
    // If there's nothing return 0
    if(i == ""){
        return 0
    }else{
        // replace the px with nothing and return a number
        i = i.replace("px", "")
        return Number(i)
    }
}

function debugFunction(){
    DEBUG_mousePosition.innerHTML = `mousePos=(${mousePosition.x}, ${mousePosition.y})`;
    DEBUG_mouseButtonDown.innerHTML = `mouseDown=(${mouseButtonDown})`;

    DEBUG_extraDebugText.innerHTML = `articleSlideRight=(${contentWrapper.style.right})`;

    DEBUG_extraDebugText2.innerHTML = `articleLength:${articleLength}`;
}
