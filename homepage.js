// Array of inspiring quotes
const quotes = [
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    // Add more quotes here
  ];
  
  // Function to display a random quote
  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteElement = document.getElementById('quote-text');
    const authorElement = document.getElementById('quote-author');
    
    quoteElement.textContent = `"${quotes[randomIndex].text}"`;
    authorElement.textContent = `- ${quotes[randomIndex].author}`;
  }
  
  // Function to handle the search
  function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input').value;
    // For demo purposes, let's just log the search query
    console.log(`Searching for: ${searchInput}`);
    // You can implement the actual search functionality here
  }
  
  // Function to update custom text
  function updateCustomText() {
    const customTextarea = document.getElementById('custom-textarea');
    const customText = customTextarea.value;
    // For demo purposes, let's just log the custom text
    console.log(`Custom Text: ${customText}`);
    // You can implement the actual functionality for custom text here
  }
  
  // Event listener for the search form submission
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', handleSearch);
  
  // Call the function to display a random quote when the page loads
  window.onload = displayRandomQuote;
  