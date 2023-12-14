const dialog = document.querySelector('dialog');
const addBook = document.querySelector('.add-book');
const closeButton = document.querySelector('.close');
const add = document.querySelector('.add');
const openDialog = () => dialog.showModal();
const closeDialog = () => dialog.close();
addBook.addEventListener('click', openDialog);
closeButton.addEventListener('click', closeDialog);
add.addEventListener('click', addBookToLibrary);

const myLibrary = [];

function Book(title, pages, read) {
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const title = document.querySelector('#title').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read:checked').value;
    const newBook = new Book(title, pages, read);
    myLibrary.push(newBook);
    addBooksToDisplay();
}

function addBooksToDisplay() {

    let rowTable;

    myLibrary.forEach(element => {

        rowTable = document.createElement('tr');

        const btn1 = document.createElement('button');
        btn1.textContent = "Remove";
        btn1.classList.add('remove-button');
        rowTable.appendChild(btn1);
        
        for (item in element) {
            const td = document.createElement('td');
            td.textContent = `${element[item]}`;
            rowTable.appendChild(td);
        }

        const btn2 = document.createElement('button');
        btn2.textContent = "Read";
        btn2.classList.add('read-button');
        rowTable.appendChild(btn2);
    });

    const tbody = document.querySelector('tbody');
    tbody.appendChild(rowTable);
    dialog.close();
}