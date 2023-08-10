const inputEl = document.querySelector('.link-input');
const submitBtn = document.querySelector('.shorten-btn');
const errorMsg = document.querySelector('.error-msg');
const linksEl = document.querySelector('.short-links');
const loader = document.querySelector('.loader')


submitBtn.addEventListener('click', () => {
    if (inputEl.value === '') {
        inputEl.classList.add('active');
        errorMsg.classList.add('active');
        errorMsg.innerHTML = 'Please add a link';
    } else if (!inputEl.value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) {
        inputEl.classList.add('active');
        errorMsg.classList.add('active');
        errorMsg.innerHTML = 'Please provide a valid URL'
    } else {
        inputEl.classList.remove('active');
        errorMsg.classList.remove('active');
        shortenUrl();
        inputEl.value = '';
    }
});

function showLoader() {
    loader.classList.add('active')
}

function hideLoader() {
    loader.classList.remove('active')
}

async function shortenUrl() {
    let longUrl = inputEl.value;
    showLoader()
    const result = await fetch(`https://api.shrtco.de/v2/shorten?url=${longUrl}`);
    const data = await result.json();
    hideLoader();

    const shortUrl = data.result.short_link;

    const linkDiv = document.createElement('div');
    linkDiv.classList.add('link-div');
    linksEl.appendChild(linkDiv);

    const prevLink = document.createElement('p');
    prevLink.classList.add('prev-link');
    prevLink.innerText = longUrl;
    linkDiv.appendChild(prevLink);

    const shortLink = document.createElement('p');
    shortLink.classList.add('short-url');
    shortLink.innerText = data.result.short_link;
    linkDiv.appendChild(shortLink);

    const copyBtn = document.createElement('button');
    copyBtn.classList.add('copy-btn');
    copyBtn.innerText = 'Copy'
    linkDiv.appendChild(copyBtn);

    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-btn');
    linkDiv.appendChild(closeBtn);
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fa-solid');
    closeIcon.classList.add('fa-xmark');
    closeBtn.appendChild(closeIcon);

    const copybuttons = document.querySelectorAll('.copy-btn');
    copybuttons.forEach((copybutton) => {
        copybutton.addEventListener('click', () => {
            navigator.clipboard.writeText(shortLink.innerText);
            copybutton.style.backgroundColor = '#3b3054';
            copybutton.innerText = 'Copied!'
        });
    });

    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach((closeButton) => {
        closeButton.addEventListener('click', () => {
            closeButton.parentElement.remove();
        });
    });
};


/*-----menu-----*/

const menuToggle = document.querySelector('.navbar-menu');

const menu = document.querySelector('.navbar-div');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});