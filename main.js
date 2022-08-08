const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Take quote by API
let apiQuotes = [];

//Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if Author fields is blank and replace with "Unknow"
    if (!quote.author) {
        authorText.textContent = "Unknow"
    } else {
        authorText.textContent = quote.author;
    }
    //Check Quote length to determine styling

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;

    // Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
async function getQuote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log("Error Loading", error)
        //Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl =
        `https://twitter.com/intent/tweet?text=${quoteText.textContent}
     - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();
// newQuote();
