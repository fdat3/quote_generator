const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const quoteText = document.getElementById('quote');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')
const twitterBtn = document.getElementById('twitter')

// Loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Complete Loading

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

let apiQuote = [];

async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const respone = await fetch(apiURL);
        apiQuote = await respone.json();
        newQuote();
    } catch (error) {
        console.log(error)
    }
}

function newQuote() {
    loading();
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    if (!quote.author) {
        quoteAuthor.textContent = "Unknown";
    } else {
        quoteAuthor.textContent = quote.author;
    }

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    complete();
}

// Share Twitter

function tweetQuote() {
    const twitterUrl =
        `https://twitter.com/intent/tweet?text=${quoteText.textContent}
        - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

// New quote

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load 

getQuotes();

