// book search Data 
const searchBooks = async() => {
    const inputSearch = document.getElementById('input_search');
    const searchText = inputSearch.value;

    // reset search value
    inputSearch.value = '';
    if (searchText === '') {
        document.getElementById('error_messsage').innerText = 'Please type something for found data';
        document.getElementById('book-searching-results').textContent = '';
        document.getElementById('results-found').textContent = '';
        return;
    }
    document.getElementById('error_messsage').textContent = '';
    document.getElementById('book-searching-results').textContent = '';
    document.getElementById('results-found').innerText = '';

    toggleSpinner('block');

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();

    displaySearchResults(data.docs);
    resultNumber(data.numFound);
}

// spinner 
const toggleSpinner = displayStyle => {
    document.getElementById('toggle_spinner').style.display = displayStyle;
}

// search result
const displaySearchResults = books => {
    const searchResults = document.getElementById('book-searching-results');

    // Error Handling
    if (books.length === 0) {
        document.getElementById('error_messsage').innerText = 'Not found Any Book.';
        toggleSpinner('none');
        return;
    }
    searchResults.textContent = '';

    //check undefined data
    const filterBooks = books.filter(info => info.cover_i !== undefined && info.author_name !== undefined && info.first_publish_year !== undefined && info.publisher !== undefined);




    filterBooks.slice(0, 15).forEach(filterbook => {
        console.log(filterbook);
        const bookCoverUrl = `https://covers.openlibrary.org/b/id/${filterbook.cover_i}-M.jpg`
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="bg-gray-200 pt-5 rounded" style="height:450px">

                    <img class="mx-auto mb-5" src="${bookCoverUrl}" >

                    <h2>Book Title: <span class="font-bold">${filterbook.title}</span></h2>

                    <h3>Author: ${filterbook.author_name[0]? filterbook.author_name[0]: 'Author Not Found'}</h3>

                    <h3>Publisher: ${filterbook.publisher[0]? filterbook.publisher[0]: 'Publisher Not Found'}</h3>

                    <h3>First Published: ${filterbook.first_publish_year? filterbook.first_publish_year: ' Not Found'}</h3>
                </div>
        
        `
        searchResults.appendChild(div);
    });
    toggleSpinner('none');

}

// number of result found 

const resultNumber = totalFound => {
    const resultsFound = document.getElementById('results-found');
    if (totalFound !== 0) {
        resultsFound.innerHTML = `
        <h2 class="text-xl">Total books found: <span class="font-bold">${totalFound}</span>
        `;
    };

}