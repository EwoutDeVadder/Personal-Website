const interval = 4000; //in ms
const photoAmount = 8;
var curPhoto = 1;

function yourFunction(){
    var curDocPhoto = document.getElementById("me_"+curPhoto.toString());
    curDocPhoto.classList.remove("fadeout");

    checkNumber(1);

    var curDocPhoto = document.getElementById("me_"+curPhoto.toString());
    curDocPhoto.classList.remove("moveaside");
    curDocPhoto.classList.add("fadeout");

    checkNumber(1);

    var curDocPhoto = document.getElementById("me_"+curPhoto.toString());
    curDocPhoto.classList.remove("movemain");
    curDocPhoto.classList.add("moveaside");

    checkNumber(1);

    var curDocPhoto = document.getElementById("me_"+curPhoto.toString());
    curDocPhoto.classList.remove("fadein");
    curDocPhoto.classList.add("movemain");

    checkNumber(1);

    var curDocPhoto = document.getElementById("me_"+curPhoto.toString());
    curDocPhoto.classList.add("fadein");

    checkNumber(-3);

    console.log("curPhoto:", curPhoto);
    // do yourFunction after interval amount of miliseconds
    setTimeout(yourFunction, interval);
}

function checkNumber(diff){
    if(diff > 0){ 
        for(i = diff; i > 0; i--){
            curPhoto = curPhoto + 1;

            if(curPhoto > photoAmount){
                curPhoto = 1;
            }

        }
    }
    else{
        for(i = -diff; i > 0; i--){
            curPhoto = curPhoto - 1;

            if(curPhoto < 1){
                curPhoto = photoAmount;
            }
        }
    }
}

window.onload = yourFunction;