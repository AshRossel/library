const dialog = document.querySelector('dialog');
const addBook = document.querySelector('.add-book');
const closeButton = document.querySelector('.close');
const add = document.querySelector('.add');
const openDialog = () => dialog.showModal();
const closeDialog = () => dialog.close();


const myLibrary = [];

function Book(title, pages, read) {
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    if (this.read === 'No') {
        this.read = 'Yes';
    } else {
        this.read = 'No';
    }
    addBooksToDisplay();
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
    let tbody = document.querySelector('tbody');
    let rowsTable = tbody.querySelectorAll('tr:nth-child(1n + 2)');
    rowsTable.forEach(element => element.remove());
    
    myLibrary.forEach(element => {

        rowTable = document.createElement('tr');

        const btn1 = document.createElement('button');
        btn1.textContent = "Remove";
        btn1.classList.add('remove-button');
        rowTable.appendChild(btn1);
        
        for (item in element) {
            if  (item !== 'toggleRead') {
                const td = document.createElement('td');
                td.textContent = `${element[item]}`;
                rowTable.appendChild(td);
            }
        }

        const btn2 = document.createElement('button');
        btn2.textContent = "Read";
        btn2.classList.add('read-button');
        btn2.addEventListener('click', changeRead);
        rowTable.appendChild(btn2)
        tbody.appendChild(rowTable);
    });

    dialog.close();
}

const changeRead = function(e) {
    const titleName = e.target.parentElement.querySelector('td').textContent;
    myLibrary.some(element => {
        for (item in element) {
            if (element.title === titleName) {
                return element.toggleRead();
            }
        }
    })
}

addBook.addEventListener('click', openDialog);
closeButton.addEventListener('click', closeDialog);
add.addEventListener('click', addBookToLibrary);