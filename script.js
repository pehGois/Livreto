const book = document.querySelector("#book");
const btnCreate = document.querySelector("#create");

btnCreate.addEventListener("click", createNewPage)
let pageNumber = 0;
let numberOfPages = 0
let maxLocation = 0 
let page = [...document.querySelectorAll(".page")]
select()

/*Selecting and Updating the DOM*/
function select(){
    page = [...document.querySelectorAll(".page")]
    const prevBtn = [...document.querySelectorAll(".prevBtn")];
    const nextBtn = [...document.querySelectorAll(".nextBtn")];

    numberOfPages = page.length
    maxLocation = numberOfPages+1
    console.log(prevBtn.length, nextBtn.length)

    eventListerners(prevBtn,nextBtn)
}

/*Adding the event listeners*/
function eventListerners(prevBtn,nextBtn){ 
    for (i in page){
        prevBtn[i].addEventListener("click", goPrevPage);
        nextBtn[i].addEventListener("click", goNextPage);
    }
}

/*Page Turning*/
function goNextPage(){
    if (!(pageNumber > maxLocation)){
        if (pageNumber == 0){openBook(true)}
        page[pageNumber].classList.add("flipped")
        setTimeout(function() {
            page[pageNumber].style.zIndex = pageNumber-maxLocation
            pageNumber++
            if (!(pageNumber >= numberOfPages)){
                page[pageNumber].style.zIndex = numberOfPages
            }
          }, 300)
    }
}

function goPrevPage(){
    if (pageNumber <= maxLocation){
        pageNumber--
        if (pageNumber == 0){openBook(false)}
        page[pageNumber].classList.remove("flipped")
        page[pageNumber].style.zIndex = numberOfPages
        if (!(pageNumber+1 >= numberOfPages)) {
            page[pageNumber+1].style.zIndex = pageNumber-maxLocation
        }
    }
}

function openBook(value){
    if (value){
        book.style.transform = 'translateX(50%)'
    }
    else{
        book.style.transform = 'translateX(-0%)'
    }
}

/*Page Creation*/
function getCurrentDateFormatted() {
    const currentDate = new Date();
  
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear()).slice(-2);
  
    return `${day}/${month}/${year}`;
  }

function createNewPage() {
    const createDivWithElements = (className, buttonText) => {
        const div = document.createElement("div");
        div.classList.add(className);

        const content = document.createElement("div")
        content.classList.add("content")
        div.appendChild(content)

        const input = document.createElement("input")
        const date = document.createElement("p")
        date.textContent = `Data de criação: ${getCurrentDateFormatted()}`
        const textarea = document.createElement("textarea")
        textarea.rows = "26"
        content.appendChild(input)
        content.appendChild(date)
        content.appendChild(textarea)

        const button = document.createElement("button");
        button.classList.add(className === "front" ? "nextBtn" : "prevBtn");
        button.textContent = buttonText;
        content.appendChild(button);

        return div;
    };

    const page = document.createElement("div");
    page.classList.add("page");
    book.appendChild(page);

    const frontDiv = createDivWithElements("front", "Próximo");
    page.appendChild(frontDiv);

    const backDiv = createDivWithElements("back", "Antes");
    page.appendChild(backDiv);

    page.style.zIndex = (numberOfPages * -1 + 1);
    select();
}