var skill = document.querySelector("#skills");
var html= document.querySelector(".html");
var css = document.querySelector(".css");
var scss = document.querySelector(".scss");
var javascript = document.querySelector(".javascript");
var jquery = document.querySelector(".jquery");

let skill_scrollY = window.scrollY + skill.getBoundingClientRect().top; // skillDOM的y軸絕對座標

window.addEventListener("scroll",function(e){
    if (window.scrollY > skill_scrollY-vh(45)){
        html.classList.add("html");
        css.classList.add("css");
        scss.classList.add("scss");
        javascript.classList.add("javascript");
        jquery.classList.add("jquery");
    }
    if(window.scrollY < skill_scrollY - vh(70)) {
        html.classList.remove("html");
        css.classList.remove("css");
        scss.classList.remove("scss");
        javascript.classList.remove("javascript");
        jquery.classList.remove("jquery");
    }
})

/* 
    Get vh from those calculated function 
    https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element-relative-to-the-browser-window
*/
function vh(v) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}
