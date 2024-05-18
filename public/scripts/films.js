const decade = document.querySelector('#decade');
const genre = document.querySelector('#genre');
const service = document.querySelector('#service');
const popular = document.querySelector('#popular');
const dropdowns = document.querySelectorAll('.dropdown');
const params = window.location.pathname.split('/');
const index = params.indexOf('page');
const page = index !== -1 && !isNaN(params[index + 1]) ? parseInt(params[index + 1], 10) : 1;

function initDropdowns() {
    const dropdowns = {'decade': decade, 'genre': genre, 'service': service};
    for (let i = 2; i < params.length; i++) {
        const param = params[i];
        const value = params[++i];
        const dropdown = dropdowns[param];
        if (dropdown && Array.from(dropdown.options).some(option => option.value === value)) {
            dropdown.value = value;
        }
    }
}

initDropdowns();

function handleInput() {
    let path = '';
    if (decade.value) {
        path += `/decade/${decade.value}`;
    }
    if (genre.value) {
        path += `/genre/${genre.value}`;
    }
    if (service.value) {
        path += `/service/${service.value}`;
    }
    window.location.href = `/films${path}`;
}

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('input', handleInput);
});

function updatePage(inc) {
    const newPage = Math.max(page + inc, 1);
    if (!isNaN(newPage)) {
        if (index !== -1) {
            params[index + 1] = newPage.toString();
        } else {
            params.push('page', newPage.toString());
        }
    } else {
        if (index !== -1) {
            params.splice(index, 2);
        }
    }
    const newPathname = params.join('/');
    window.location.href = newPathname;
}

function initPrev() {
    if (page === 1) {
        document.getElementById('prev').classList.add('invisible');
    }
}

function initNext() {
    if (page > (document.querySelector('#films').getAttribute('results') / 60)) {
        document.getElementById('next').classList.add('invisible');
    }
}

initPrev();
initNext();