class mouseMove{
    constructor(x, y){
        this.xPosition = x;
        this.yPosition = y;
    }
}

class mouseButton{
    constructor(mouseButtonDown){
        this.isDown = mouseButtonDown;
    }
}

class documentConstructor{
    constructor(documentId){
        this.documentId = documentId;
        this.document = document.getElementById(documentId);
        this.style = this.document.style;
    }
}

class debugConstructor{
    constructor(documentId){
        this.documentId = documentId;
        this.document = document.getElementById(documentId);
        this.documentINNERHTML = this.document.innerHTML;
    }

    showDebug(textToDisplay) {
        this.documentINNERHTML = `${this.document}: ${textToDisplay}`;
    }
}


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