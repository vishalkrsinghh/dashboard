

let btn= document.getElementById("btn");
let abs= document.getElementById("abs");
let btnn= document.getElementsByClassName("btnn");
let drop= document.getElementsByClassName("drop");

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
        }else{
            drop[i].style.display="block";
        }
    }
    document.addEventListener("click", ()=>{
        drop[i].style.display="none";
    })
}

document.addEventListener("click", ()=>{
    abs.style.display="none";
})