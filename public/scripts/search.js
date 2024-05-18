const results = document.querySelector('#search-results').getAttribute('results');
if (results == 0) {    
    document.querySelector('#no-results').classList.remove('hidden');
}