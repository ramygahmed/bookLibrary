
(function(){
    let library = [];
    let libraryPointer = 0;
    let ref = document.querySelector('script')
    let button = document.getElementById('addBook');
    let userForm = document.getElementById('userForm')
    let form = document.getElementById('form')
    let title = document.getElementById('titleInput');
    let titleLegend = document.getElementById('titleLabel');
    let author = document.getElementById('authorInput');
    let authorLegend = document.getElementById('authorLabel');
    let pages = document.getElementById('pagesInput');
    let pagesLegend = document.getElementById('pagesLabel');
    let read = document.getElementById('readBtn');
    let notRead = document.getElementById('notReadBtn');
    let exit = document.getElementById('exitBtn');

    hide(true);
    button.addEventListener('click',e=>{
    hide(false)
    })
    exit.addEventListener('click',e=>{
    clearValues();
    hide(true)
    })
    read.addEventListener('click',e=>{
        if(title.value.length < 2){
            title.placeholder = "Title must be 2+ characters";
            title.value = "";
            title.style.border = "2px solid red";
        }else{
        let newBook = new Book(title.value,author.value,pages.value,true)
        newBook.addBook();
}
    })
notRead.addEventListener('click',e=>{
    let newBook = new Book(title.value,author.value,pages.value,false)
    newBook.addBook();
})

class Book{
    constructor(title,author,pages,read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    addBook=()=>{
        library.push({
            title: this.title,
            author: this.author,
            pages: this.pages,
            read: this.read
        })
        let bookLibrary = document.getElementById('bookLibrary')
        let newDiv = document.createElement('div');
        let bookTitleDOM = document.createElement('h3');
        let bookAuthorDOM = document.createElement('p');
        let bookPagesDOM = document.createElement('p');
        let bookReadDOM = document.createElement('button');
        let bookRemoveDOM = document.createElement('button')
        bookTitleDOM.innerText = this.title;
        bookAuthorDOM.innerText = `Author: ${this.author}`;
        bookPagesDOM.innerText = `Pages: ${this.pages}`;
        bookReadDOM.innerText = this.read ? "You have read this book" : "You have not read this book"
        bookReadDOM.style.backgroundColor = this.read ? 'Green' : 'Red';
        bookRemoveDOM.innerText = "Remove Book"
        bookRemoveDOM.style.backgroundColor = 'red';
        newDiv.append(bookTitleDOM,bookAuthorDOM,bookPagesDOM,bookReadDOM,bookRemoveDOM)
        bookLibrary.appendChild(newDiv);
        bookReadDOM.addEventListener('click',e=>{
            if (this.read){
            bookReadDOM.innerText = "You have not read this book"
            bookReadDOM.style.backgroundColor = 'red'
            this.read = false;
        }else{
            bookReadDOM.innerText = "You have read this book"
            bookReadDOM.style.backgroundColor = 'green'
            this.read = true;
            }
        })
        bookRemoveDOM.addEventListener('click',e=>{
            bookLibrary.removeChild(newDiv)
            library.splice(libraryPointer,1)
            libraryPointer--;
        })
        hide(true);
        clearValues();
        libraryPointer++;
    }
}

function hide(boo){
    (boo)?userForm.style.display = "none": userForm.style.display = 'block'
}
function clearValues(){
    title.value = "";
    author.value = "";
    pages.value = "";
}
})()



