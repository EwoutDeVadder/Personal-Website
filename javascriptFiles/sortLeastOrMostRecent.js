// LIST WHICH CHECKS ALL ITEMS IN A HTML LIST AND MAKE IT SORT ONE WAY AND THE OTHER. FROM EXAMPLE -> 1,2,3,4,5 OR 5,4,3,2,1 TO MAKE IT LEAST AND MOST
// RECENTLY SORTED AND JUST DISPLAY IT IN THAT ORDER. SEPERATORS CAN EASILY BE ADDED IF THEY ARE NOT INCLUDED IN THE LIST (I THINK)
var leastRecent = true;

const leastText = "LEAST";
const mostText = "MOST";

function stateSwitcher(){
    leastRecent = !leastRecent;
    const text = document.getElementById("least_most_text");
    
    if(leastRecent){
        text.textContent = leastText;
    }
    else{
        text.textContent = mostText;
    }

    const carrierList = document.getElementById("list_of_carrier");
    const carrierItems = carrierList.querySelectorAll("li");
    removeAllChildren(carrierList);
    reverseAllChildren(carrierList, carrierItems);

}

function reverseAllChildren(carrierList, carrierItems){
    for(let i = carrierItems.length; i > 0; i--){
        carrierList.appendChild(carrierItems.item(i-1));
    }
}

function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }