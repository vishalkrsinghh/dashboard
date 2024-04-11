
let showLogin= document.getElementById("showLogin");
let showRegister= document.getElementById("showRegister");
let log= document.getElementById("log");
let reg= document.getElementById("reg");


showRegister.addEventListener("click", (e)=>{

    e.preventDefault();
    log.style.display="none";
    reg.style.display="block"
    document.title="Register"
})
showLogin.addEventListener("click", (e)=>{
e.preventDefault();
log.style.display="block";
reg.style.display="none";
document.title="Login"
})