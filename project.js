const baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
const key = 'AIzaSyC1rv8gjG8rNbYi8Q3_O-oXa1Uq63BvdbQ';
let url;

const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

const section = document.querySelector('section');
nav.style.display = 'none';
let pageNumber = 0;
console.log('PageNumber:', pageNumber);
let displayNav = false;

searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function fetchResults(e) {
    e.preventDefault();
    url = baseURL + '?q=' + searchTerm.value + 'projection=lite&' + '&startIndex='+ pageNumber*10 + '&maxResults=10' + '&key=' + key;
    console.log('URL:', url);

    fetch(url)
        .then(function (result) {
            return result.json();
        }).then(function (json) {
            displayResults(json);
        });
};

function displayResults(json) {
    console.log(json.items);
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    let bookresults = json.items;
    console.log(bookresults);


    if (json.totalItems == 0) {
        console.log("No results");
        let result = document.createElement('h2');
        result.textContent = "No Results Found";
        section.appendChild(result);
    } else {
        if (bookresults.length === 10 && pageNumber === 0) {
            nav.style.display = 'block';
            previousBtn.style.display = "none";
        } else{
            nav.style.display = "block";
            previousBtn.style.display = "block";
        }
        for (let i = 0; i < bookresults.length; i++) {
            let result = document.createElement('div');
            let book = document.createElement('h2');
            let link = document.createElement('a');
            let img = document.createElement('img');
            let sub = document.createElement('p');
            let authors = document.createElement('p');
            let cat = document.createElement('p');
            let desc = document.createElement('p');
            let page = document.createElement('p');
            let type = document.createElement('p');
            let date = document.createElement('p');
            let pub = document.createElement('p');
            let clearfix = document.createElement('div');

            let current = bookresults[i].volumeInfo;

            sub.textContent = "Subtitle: " + current.subtitle;
            authors.textContent += "Author(s): " + current.authors;
            cat.textContent += "Genre: " + current.categories;
            desc.textContent += "Description: " + current.description;
            page.textContent += "Page Count: " + current.pageCount;
            type.textContent += "Type: " + current.printType;
            date.textContent += "Date of Publication: " + current.publishedDate;
            pub.textContent += "Publisher: " + current.publisher;

            img.src = current.imageLinks.thumbnail;
            
            link.href = current.infoLink;
            link.textContent = current.title;

            clearfix.setAttribute('class', 'clearfix');
            result.appendChild(book);
            result.appendChild(sub);
            result.appendChild(authors);
            result.appendChild(cat);
            result.appendChild(desc);
            result.appendChild(page);
            result.appendChild(type);
            result.appendChild(date);
            result.appendChild(pub);
            book.appendChild(link);
            book.appendChild(img);
            section.appendChild(result);
        }
    }
    
};

function nextPage(e) {
    pageNumber++;
    fetchResults(e);
    console.log("Page number:", pageNumber);
    console.log("Next button clicked");
};

function previousPage(e) {
    if (pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
    console.log("Page:", pageNumber);
    //console.log("Next button clicked");
};