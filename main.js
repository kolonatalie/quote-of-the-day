// navbar
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function() {
    links.classList.toggle("show-links");
});

// Displaying the quote content
function showQuote(item) {
    const author = document.getElementById('author');
    const info = document.getElementById('info');
    author.textContent = item.name;
    info.textContent = item.text;
}
// Displaying the date
function displayDate(today) {
    const dateElement = document.getElementById('dateToday');
    const options = {weekday: 'short', year:'numeric', month: 'long', day: 'numeric'};
    dateElement.textContent = today.toLocaleDateString(undefined, options);
}

// Main logic
document.addEventListener('DOMContentLoaded', function() {
    const quoteArticle = document.querySelector('.hide');
    let quotes = [];
    const today = new Date();

    fetch('./assets/quotes.json')
        .then(response => response.json())
        .then(data => {
            quotes = data;

            if(quotes.length > 0) {
                const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
                const dailyIndex = dayNumber % quotes.length;

                showQuote(quotes[dailyIndex]);
                displayDate(today);
                quoteArticle.style.visibility = 'visible';
            }
        })
    .catch(error => console.error('Error fetching quotes:', error));

});