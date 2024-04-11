

let btn= document.getElementById("btn");
let abs= document.getElementById("abs");
let btnn= document.getElementsByClassName("btnn");
let drop= document.getElementsByClassName("drop");
let changeArrow= document.getElementsByClassName("changeArrow");

btn.addEventListener("click", (e)=>{
    e.stopPropagation();
    if(abs.style.display=="block"){
        abs.style.display="none";
    }else{
        abs.style.display="block";
    }
})

for(let i=0; i<btnn.length; i++){
    btnn[i].onclick= (e)=>{
        e.stopPropagation();
        if(drop[i].style.display=="block"){
            drop[i].style.display="none";
            changeArrow[i].innerHTML=`<i class="fa-solid fa-angle-right"></i>`
        }else{
            drop[i].style.display="block";
            changeArrow[i].innerHTML=`<i class="fa-solid fa-angle-down"></i>`
        }
    }
    document.addEventListener("click", ()=>{
        drop[i].style.display="none";
        changeArrow[i].innerHTML=`<i class="fa-solid fa-angle-right"></i>`
    })
}

document.addEventListener("click", ()=>{
    abs.style.display="none";
})