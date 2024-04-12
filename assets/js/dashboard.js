

let btn= document.getElementById("btn");
let abs= document.getElementById("abs");
let btnn= document.getElementsByClassName("btnn");
let drop= document.getElementsByClassName("drop");
let changeArrow= document.getElementsByClassName("changeArrow");
let menu= document.getElementById("menu")
let one= document.getElementsByClassName("one")[0];
let two= document.getElementsByClassName("two")[0];
let main= document.getElementsByClassName("main")[0];

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

menu.addEventListener("click", (e)=>{

    e.stopPropagation();
    if(one.style.display="none"){
        one.style.display="block"
        one.style.position="absolute";
        one.style.background="white";
        one.style.zIndex="50";
        one.style.boxShadow="1px 1px 5px grey"
        two.style.pointerEvents="none"
        two.style.opacity="0.4"
        two.style.maxHeight="100vh"
        main.style.display="block"
    }
})

document.addEventListener("click", ()=>{
    
    if(window.innerWidth<690){
        one.style.display="none" 
        two.style.pointerEvents="auto"
        two.style.opacity="1"
        two.style.maxHeight="none"
    }
    abs.style.display="none";
})

    window.addEventListener("resize", ()=>{

        if(window.innerWidth>690){
            one.style.display="block" 
            main.style.display="grid"
            one.style.position="static";
        }else{
            one.style.display="none"
            main.style.display="block"
        }

        // console.log(window.innerWidth)
    })