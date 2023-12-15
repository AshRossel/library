const myLibrary = [];
const dialog = document.querySelector('dialog');
const addBook = document.querySelector('.add-book');
const closeButton = document.querySelector('.close');
const add = document.querySelector('.add');
const openDialog = () => dialog.showModal();
const closeDialog = () => {
    dialog.close();
    document.querySelector('span').setAttribute('id', '');
    const title = document.querySelector('#title');
    const pages = document.querySelector('#pages');
    title.value = '';
    pages.value = '';
}


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

    for (const element of myLibrary) {
        if (element.title === title && element.pages == pages) {
            return document.querySelector('span').setAttribute('id', 'error');
        }
    }

    const read = document.querySelector('#read:checked').value;
    const newBook = new Book(title, pages, read);
    myLibrary.push(newBook);
    document.querySelector('span').setAttribute('id', '');
    addBooksToDisplay();

    const titleElement = document.querySelector('#title');
    const pagesElement = document.querySelector('#pages');
    titleElement.value = '';
    pagesElement.value = '';
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
        btn1.addEventListener('click', removeBook);
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
    const title = e.target.parentElement.querySelector('td').textContent;
    const pages = e.target.parentElement.querySelector('td:nth-child(3)').textContent;
    myLibrary.some(element => {
        for (item in element) {
            if (element.title === title && element.pages == pages) {
                return element.toggleRead();
            }
        }
    })
}

const removeBook = function(e) {
    const title = e.target.parentElement.querySelector('td').textContent;
    const pages = e.target.parentElement.querySelector('td:nth-child(3)').textContent;
    myLibrary.some((element, index) => {
        for (item in element) {
            if (element.title === title && element.pages == pages) {
                return myLibrary.splice(index, 1);
            }
        }
    })
    addBooksToDisplay();
}

addBook.addEventListener('click', openDialog);
closeButton.addEventListener('click', closeDialog);
add.addEventListener('click', addBookToLibrary);