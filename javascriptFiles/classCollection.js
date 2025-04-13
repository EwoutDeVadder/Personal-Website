// CHECK LIJN 112


class Mouse{
    constructor(){
        this.xPosition = 0;
        this.yPosition = 0;
        this.isDown = false;
    }

    position(x, y){
        this.xPosition = x;
        this.yPosition = y;
    }

    buttonDown(mouseButtonDown){
        this.isDown = mouseButtonDown;
    }
    getPositionX(){
        return this.xPosition;
    }

    getPositionY(){
        return this.yPosition;
    }
}

class documentConstructorById{
    constructor(documentId){
        this.documentId = documentId;
        this.document = document.getElementById(this.documentId);
    }
}

class debugConstructor{
    constructor(documentId){
        this.documentId = documentId;
        this.document = document.getElementById(documentId);
    }

    showDebug(textToDisplay) {
        this.document.innerHTML = `${this.documentId}: ${textToDisplay}`;
    }
}

const SLIDERDOCUMENTWIDTH = 400 ; // in px
const SLIDERDOCUMENTGAPWIDTH = 5; // in px

class sliderCollection{
    constructor(amountOfSliders){
       this.mousePixelsMoved = 0;
       this.screenFalloff = {left: 0, right: (amountOfSliders * SLIDERDOCUMENTWIDTH) + (amountOfSliders * SLIDERDOCUMENTGAPWIDTH)};
       this.mousePositionAtMouseDown = 0;
       this.over_element;
        this.pos_at_down;
        this.pos_at_up;
    }

    move(mouseDown, mousePositionX, cssDocumentRight, myPointer){
        if(mouseDown == true){
            this.mousePixelsMoved = this.mousePositionAtMouseDown - mousePositionX;
            this.mousePositionAtMouseDown = mousePositionX;
            myPointer((this.makeInteger(cssDocumentRight) + this.mousePixelsMoved).toString() + "px");
        }        
        this.mousePositionAtMouseDown = mousePositionX;
    }

    loopBack(documentPositionRight, myPointer){
        if(this.makeInteger(documentPositionRight) <= this.screenFalloff.left){
            myPointer((this.screenFalloff.right - 1).toString() + "px");
        }else if(this.makeInteger(documentPositionRight) >= this.screenFalloff.right){
            myPointer((this.screenFalloff.left + 1).toString() + "px");
        }
    }

    makeInteger(documentPosition){
        if(documentPosition == ""){
            return 0;
        }else{
            documentPosition = documentPosition.replace("px", "");
            return Number(documentPosition);
        }
    }
}

// ##############################
//
//  Events, Functions, vars, ...
//
// ##############################

const myMouse = new Mouse();
const contentWrapperDocument = new documentConstructorById("article_wrapper");

const articleLength = document.getElementsByClassName("main_article").length;

const slider = new sliderCollection(articleLength);

var copy = document.querySelector("#article_slide").cloneNode(true);
document.querySelector("#article_wrapper").appendChild(copy);

const copy_to_project = document.getElementById("current_project");

const in_document_move = document.getElementById("article_wrapper");

window.addEventListener("mousemove", (event)=>{
    myMouse.position(event.clientX, event.clientY);

    mainLoop();
});

in_document_move.addEventListener("mousedown", (event)=>{
    myMouse.buttonDown(true);
    slider.pos_at_down = myMouse.xPosition;
    slider.over_element = event['target'];
});

in_document_move.addEventListener("wheel", (event)=>{
    event.preventDefault()
    if(event["deltaY"] < 0){
        slider.mousePositionAtMouseDown = 0;
        pointerToStyleRight = (myPointer)=>{contentWrapperDocument.document.style.right = myPointer;}; 
        slider.move(true, 50, contentWrapperDocument.document.style.right, pointerToStyleRight);
        slider.loopBack(contentWrapperDocument.document.style.right, pointerToStyleRight);
    }
    else{
        slider.mousePositionAtMouseDown = 0;
        pointerToStyleRight = (myPointer)=>{contentWrapperDocument.document.style.right = myPointer;}; 
        slider.move(true, -50, contentWrapperDocument.document.style.right, pointerToStyleRight);
        slider.loopBack(contentWrapperDocument.document.style.right, pointerToStyleRight);
    }
})

in_document_move.addEventListener("mouseup", (event)=>{
    click(slider.pos_at_down, myMouse.xPosition, event);
});

window.addEventListener("mouseup", (event)=>{
    myMouse.buttonDown(false);
});

function click(x_start, x_end, event){
    if(x_start - x_end < 2 && x_start - x_end > -2 && slider.over_element.id != 'article_wrapper'){
        copy_to_project.src = slider.over_element.id;
        fetch(slider.over_element.id).then(resp => resp.text()).then(resp => {
            copy_to_project.style.height = Math.floor(resp.length/5) + 'px';
        });
    }
}


//const test1 = new debugConstructor("test");

function mainLoop(){
    pointerToStyleRight = (myPointer)=>{contentWrapperDocument.document.style.right = myPointer;}; 
    slider.move(myMouse.isDown, myMouse.xPosition, contentWrapperDocument.document.style.right, pointerToStyleRight);
    slider.loopBack(contentWrapperDocument.document.style.right, pointerToStyleRight);

    //test1.showDebug(myMouse.xPosition + "px");
}