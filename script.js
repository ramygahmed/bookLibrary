let library = [];
let libraryPointer = 0;
let ref = document.querySelector('script')
let button = document.getElementById('addBook');
let userForm = document.createElement('div');
let form = document.createElement('form');
form.method="post";
userForm.appendChild(form);

/* Add Book Title to User Form */
let title = document.createElement('input');
let titleLegend = document.createElement('label');
titleLegend.innerHTML = "Book Title";
title.type = "text";
title.placeholder="Book Title";
form.appendChild(titleLegend);
form.appendChild(document.createElement('br'))
form.appendChild(title);
form.appendChild(document.createElement('br'))
form.appendChild(document.createElement('br'))

/* Add Author to User Form */
let author = document.createElement('input');
let authorLegend = document.createElement('label');
authorLegend.innerHTML = "Author Name";
author.type = "text";
author.placeholder="Author Name";
form.appendChild(authorLegend);
form.appendChild(document.createElement('br'));
form.appendChild(author);
form.appendChild(document.createElement('br'))
form.appendChild(document.createElement('br'))

/* Add Pages to User Form */
let pages = document.createElement('input');
let pagesLegend = document.createElement('label');
pagesLegend.innerHTML = "Number of Pages";
pages.type = "number";
pages.placeholder="Number of Pages";
form.appendChild(pagesLegend);
form.appendChild(document.createElement('br'));
form.appendChild(pages);
form.appendChild(document.createElement('br'))
form.appendChild(document.createElement('br'))

/* Add Read Button to User Form */
let read = document.createElement('button');
read.id = "readBtn"
read.innerHTML = "Read"
userForm.appendChild(read);


/* Add Not Read Button to User Form */
let notRead = document.createElement('button');
notRead.innerHTML = "Not Read"
notRead.id = "notReadBtn"
userForm.appendChild(notRead);
userForm.appendChild(document.createElement('br'));

/* Add Close Button to User Form */
let exit = document.createElement('button');
exit.innerHTML = "Cancel"
exit.id = "exitBtn"
userForm.appendChild(exit);
userForm.appendChild(document.createElement('br'));

/* Style User Form */
userForm.id = 'userForm';
document.body.insertBefore(userForm,document.querySelector('footer'))
let style = document.createElement('style');
style.innerHTML = 
'#userForm{'+
    'background-color: rgb(235, 235, 235);'+
    'height: 400px;'+
    'width: 250px;'+
    'padding: 10px;'+
    'padding-bottom: 20px;'+
    'position: absolute;'+
    'top: 50%;'+
    'left: 50%;'+
    'margin-left: -125px; '+
    'margin-top: -200px;' +
    'box-shadow: -9px 10px 22px #b7b7b9; }' +
'form input{'+
    'width: 100%;'+
    'height: 50px;'+
    'border: none;' +
    'background-color: rgb(230, 230, 231);'+
    'border-radius: 10px;}'+
'form {'+
    'padding: 30px;'+
    '}'+
'#readBtn{'+
    'background-color: green;'+
    'color: white;'+
    '}'+
'#notReadBtn{'+
    'background-color: red;'+
    'color: white;'+
    '}'+
'#readBtn , #notReadBtn{'+
    'width: 50%;'+
    '}'+
'#exitBtn{'+
    'width: 100%;'+
    'background-color: rgb(230, 230, 231);'+
    '}'+
'#readBtn , #notReadBtn , #exitBtn{'+
    'height: 30px;'+
    'border: none;'+
    '}'+
'#readBtn:hover , #notReadBtn:hover , #exitBtn:hover{'+
    'font-weight: 900;'+
    'transition: font-weight 0.7s ease'+
    '}';

userForm.style.display = 'none'
ref.parentNode.insertBefore(style, ref)

button.addEventListener('click',e=>{
    userForm.style.display = 'block'
})
exit.addEventListener('click',e=>{
    clearValues();
    userForm.style.display = 'none'
})
read.addEventListener('click',e=>{
    if(title.value.length < 2){
        title.placeholder = "Title must be 2+ characters";
        title.value = "";
        title.style.border = "2px solid red";
    }else{
    let newBook = Object.create(Book.prototype)
    newBook.title = title.value;
    newBook.author = author.value;
    newBook.pages = pages.value;
    newBook.read  = true;
    newBook.addBook();
    userForm.style.display = 'none';
    clearValues();
    bookGod(libraryPointer);
    libraryPointer ++;}
})
notRead.addEventListener('click',e=>{
    let newBook = Object.create(Book.prototype)
    newBook.title = title.value;
    newBook.author = author.value;
    newBook.pages = pages.value;
    newBook.read  = false;
    newBook.addBook();
    userForm.style.display = 'none';
    clearValues();
    bookGod(libraryPointer);
    libraryPointer++;
})

function clearValues(){
    title.value = "";
    author.value = "";
    pages.value = "";
}
function bookGod(index){
    let bookLibrary = document.getElementById('bookLibrary')
    let newDiv = document.createElement('div');
    let bookTitle = library[index].title;
    let bookAuthor = library[index].author;
    let bookPages = library[index].pages;
    let bookTitleDOM = document.createElement('h3');
    let bookAuthorDOM = document.createElement('p');
    let bookPagesDOM = document.createElement('p');
    let bookReadDOM = document.createElement('button');
    let bookRemoveDOM = document.createElement('button')
    bookTitleDOM.innerText = bookTitle;
    bookAuthorDOM.innerText = `Author: ${bookAuthor}`;
    bookPagesDOM.innerText = `Pages: ${bookPages}`;
    bookReadDOM.innerText = library[index].read ? "You have read this book" : "You have not read this book"
    bookReadDOM.style.backgroundColor = library[index].read ? 'Green' : 'Red';
    bookRemoveDOM.innerText = "Remove Book"
    bookRemoveDOM.style.backgroundColor = 'red';
    newDiv.appendChild(bookTitleDOM)
    newDiv.appendChild(bookAuthorDOM)
    newDiv.appendChild(bookPagesDOM)
    newDiv.appendChild(bookReadDOM);
    newDiv.appendChild(bookRemoveDOM)
    bookLibrary.appendChild(newDiv);
    bookReadDOM.addEventListener('click',e=>{
        if (bookReadDOM.innerText == "You have read this book"){
        bookReadDOM.innerText = "You have not read this book"
        bookReadDOM.style.backgroundColor = 'red'
        library[index].read = false;
    }else{
        bookReadDOM.innerText = "You have read this book"
        bookReadDOM.style.backgroundColor = 'green'
        library[index].read = true;
        }
    })
    bookRemoveDOM.addEventListener('click',e=>{
        bookLibrary.removeChild(newDiv)
        library.splice(index,1)
        libraryPointer--;
    })
}
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.addBook = function(){
    library.push({
        title: this.title,
        author: this.author,
        pages: this.pages,
        read: this.read
    })
}





