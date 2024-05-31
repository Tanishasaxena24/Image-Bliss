const accessKey="UA8E4Mi7LRQaxfF7IrhQMNtyBBmkTzC9gBE5yepytJk"

const formEle=document.querySelector("form")
const search_input=document.querySelector("#search-input")
// const search_button=document.querySelector("#search-button")
const search_results=document.querySelector(".search-results")
// const search_result=document.querySelector(".search-result")
const show_more=document.querySelector("#show-more")

let inputdata="";
let page=1;

async function searchImages(){
    inputdata=search_input.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accessKey}`;

const response=await fetch(url);
const data=await response.json();

const results=data.results;

if(page===1){
    search_results.innerHTML="";
}

results.map((result)=>{
    const imageWrapper=document.createElement("div")
    imageWrapper.classList.add("search-result")
    const image=document.createElement("img")
    image.src=result.urls.small
    image.alt=result.alt_description
    const imageLink=document.createElement("a")
    imageLink.href=result.links.html
    imageLink.target="_blank"
    imageLink.textContent=result.alt_description

    imageWrapper.appendChild(image)
    imageWrapper.appendChild(imageLink)
    search_results.appendChild(imageWrapper)
});

page++;
if(page>1){
    show_more.style.display="block";
 }
}

formEle.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    searchImages()
})

show_more.addEventListener("click",(e)=>{
    searchImages()
})