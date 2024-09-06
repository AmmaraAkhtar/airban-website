let hyper=document.querySelectorAll(".hyper");
let line=document.querySelector(".line");
hyper.forEach((as)=>{
    const a=as.querySelector("a");
    const line=as.querySelector(".line");
    a.addEventListener("mouseover",()=>{
             line.classList.remove("hide");
             a.style.fontWeight="700";
             a.style.color="#ffc609";
    });
    a.addEventListener("mouseout",()=>{
        as.style.fontWeight="400";
        line.classList.add("hide");
          a.style.color="rgb(247, 195, 81)";
    });
});
