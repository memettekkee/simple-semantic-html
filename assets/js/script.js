let scrollCons = document.querySelector(".gallery");
let prev = document.getElementById("backBtn");
let next = document.getElementById("nextBtn");

scrollCons.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollCons.scrollLeft += evt.deltaY;
});

next.addEventListener("click", ()=>{
    scrollCons.scrollLeft += 900;
});
prev.addEventListener("click", ()=>{
    scrollCons.scrollLeft -= 900;
});

console.log(scrollCons)