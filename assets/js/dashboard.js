

let btn= document.getElementById("btn");
let abs= document.getElementById("abs");

btn.addEventListener("click", (e)=>{
    e.stopPropagation();
    if(abs.style.display=="block"){
        abs.style.display="none";
    }else{
        abs.style.display="block";
    }
})
document.addEventListener("click", ()=>{
    abs.style.display="none";
})