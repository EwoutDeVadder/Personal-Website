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
        return this.xPosition
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

const SLIDERDOCUMENTWIDTH = 300 ; // in px
const SLIDERDOCUMENTGAPWIDTH = 5; // in px

class sliderCollection{
    constructor(amountOfSliders){
       this.mousePixelsMoved = 0;
       this.screenFalloff = {left: 0, right: (amountOfSliders * SLIDERDOCUMENTWIDTH) + (amountOfSliders * SLIDERDOCUMENTGAPWIDTH)};
       this.mousePositionAtMouseDown = 0;
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
const contentWrapperDocument = new documentConstructorById("main_contentwrapper");

const articleLength = document.getElementsByClassName("main_article").length;

const slider = new sliderCollection(articleLength);

var copy = document.querySelector("#article_slide").cloneNode(true);
document.querySelector("#main_contentwrapper").appendChild(copy);

window.addEventListener("mousemove", (event)=>{
    myMouse.position(event.clientX, event.clientY);

    mainLoop();
});

contentWrapperDocument.document.addEventListener("mousedown", (event)=>{
    myMouse.buttonDown(true);
});

window.addEventListener("mouseup", (event)=>{
    myMouse.buttonDown(false);
});

//const test1 = new debugConstructor("test");

function mainLoop(){
    pointerToStyleRight = (myPointer)=>{contentWrapperDocument.document.style.right = myPointer;}; 
    slider.move(myMouse.isDown, myMouse.xPosition, contentWrapperDocument.document.style.right, pointerToStyleRight);
    slider.loopBack(contentWrapperDocument.document.style.right, pointerToStyleRight);

    //test1.showDebug(myMouse.xPosition + "px");
}