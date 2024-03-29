const book = document.querySelector("#book")
const btnAdd = document.querySelector("#add")
const bookTitle = document.querySelector('#title')
const btnSave = document.querySelector('#save')
const btnDel = document.querySelector('#delete')
const btnClear = document.querySelector("#clear")
const navBar = document.querySelector("#navBar")
const btnSideBar = document.querySelector("#btnSideBar")
   
let pageNumber = 0;
let numberOfPages = 0
let numberOfSheets = 0
let page = [...document.querySelectorAll(".page")]
let chapterText = null
let chapterTitle = null
let sideBarOpen = false

btnClear.addEventListener("click",clearStorage)
btnAdd.addEventListener("click", createNewPage)
btnSave.addEventListener("click",setTextContent)
btnDel.addEventListener("click", ()=>deletePage(pageNumber))
btnSideBar.addEventListener("click",sideBar)

select()
createNewPage()
getTextContent()

typeof(screen.width)

setInterval( () => {
    if (window.innerWidth > 700 && sideBarOpen == true) {closeBar()}
}, 1000)

/*Selecting and Updating the DOM*/
function select(){
    page = [...document.querySelectorAll(".page")]
    chapterText = [...document.querySelectorAll('textarea')]
    chapterTitle = [...document.querySelectorAll('.chapterTitle')]
    const prevBtn = [...document.querySelectorAll(".prevBtn")];
    const nextBtn = [...document.querySelectorAll(".nextBtn")];

    numberOfPages = page.length
    numberOfSheets = page.length*2
    eventListerners(prevBtn,nextBtn)
}

/*Adding the event listeners*/
function eventListerners(prevBtn,nextBtn){ 
    for (i in page){
        if (i == numberOfPages-1){
            prevBtn[i].addEventListener("click", goPrevPage);
        }
        prevBtn[i].addEventListener("click", goPrevPage);
        nextBtn[i].addEventListener("click", goNextPage);
    }
}

/*Page Turning*/
function goNextPage(){
    if (!(numberOfPages == pageNumber+1)){
        page[pageNumber].classList.add("flipped")

        if (pageNumber == 0){openBook(true)}

        setTimeout( () => {
            page[pageNumber].style.zIndex = Math.abs(page[pageNumber].style.zIndex) 
            pageNumber++
            if (!(pageNumber >= numberOfPages)){
                page[pageNumber].style.zIndex = Math.abs(page[pageNumber].style.zIndex)
            }
        }, "300")
    }
}

function goPrevPage(){
    if (pageNumber > 0) {
        pageNumber--
        page[pageNumber].classList.remove("flipped")
        if (pageNumber == 0){openBook(false)}

        if (!(pageNumber+1 >= numberOfPages)) {
            page[pageNumber+1].style.zIndex = Math.abs(page[pageNumber+1].style.zIndex)*-1
        }
    }
}

function openBook(value){
    book.classList.toggle("openBook", value);
    book.classList.toggle("closeBook", !value);
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
        
        if (className === "front"){
            const input = document.createElement("input")
            input.placeholder="Digite o título da página"
            input.classList.add("chapterTitle")

            const date = document.createElement("p")
            date.textContent = `Data: ${getCurrentDateFormatted()} | Página: ${numberOfPages}`

            const textarea = document.createElement("textarea")
            textarea.rows = "30"

            content.append(input, date, textarea);
        }

        const button = document.createElement("button");
        button.classList.add(className === "front" ? "nextBtn" : "prevBtn");
        button.textContent = buttonText;
        content.appendChild(button);

        return div;
    };

    const page = document.createElement("div");
    page.classList.add("page");
    book.appendChild(page);

    const frontDiv = createDivWithElements("front", "PRÓXIMO");
    const backDiv = createDivWithElements("back", "ANTERIOR");

    page.append(frontDiv, backDiv);
    page.style.zIndex = ((numberOfPages)*-1);

    select()
}

function deletePage(position) {
    if (position != 0 && position != 1){
        page[position].remove()
    }
}

function setTextContent(){
    localStorage.clear()
    let titleArray = []
    let textArray = []
    for (i = 0; i < numberOfPages-1; i++) {
        titleArray.push(chapterTitle[i].value)
        textArray.push(chapterText[i].value)
    }
    localStorage.setItem('pageNumber',numberOfPages)
    localStorage.setItem('bookTitle',bookTitle.value)
    localStorage.setItem('chapterTitle', JSON.stringify(titleArray))
    localStorage.setItem('chapterText', JSON.stringify(textArray))
    window.alert("Conteúdo salvo")
}

function clearStorage() {
    if (confirm("Você deseja excluir TODOS os registros salvos?") == true) {
        localStorage.clear()
        for (let i = 2; i < numberOfPages; i++) {
            deletePage(i)            
        }
        bookTitle.value = ""
        chapterTitle[0].value = ""
        chapterText[0].value = ""
    }
}

 function getTextContent(){
    const bTitle = localStorage.getItem("bookTitle")
    const cTitle = JSON.parse(localStorage.getItem("chapterTitle"))
    const cText = JSON.parse(localStorage.getItem("chapterText"))
    const pageNumber = localStorage.getItem("pageNumber")

    try {
        if (pageNumber > numberOfPages) {
            for (let index = 0; index < pageNumber-2; index++) {createNewPage()}
        }
        for (i = 0; i < numberOfPages; i++) {
            bookTitle.value = bTitle
            chapterTitle[i].value = cTitle[i]
            chapterText[i].value = cText[i]
        }  
    }
    catch{}
}

function sideBar(){
    book.addEventListener("click",closeBar)
    navBar.classList.add("sideBar","block")
    sideBarOpen = true
}

function closeBar(){
    console.log("I'm being called")
    navBar.classList.remove("sideBar", "block")
    sideBarOpen = false
}
