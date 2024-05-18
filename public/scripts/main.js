const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');

searchInput.addEventListener('keypress', function(evt) {
    if (evt.key === "Enter") {
        evt.preventDefault();
        const input = searchInput.value;
        if (input !== "") {
            window.location.href = `/search/${input}`;
        }
    }
});