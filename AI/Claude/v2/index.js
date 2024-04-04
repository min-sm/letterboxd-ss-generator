const form = document.getElementById("urlForm");
const urlInput = document.getElementById("urlInput");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const url = urlInput.value; // Get the URL from the input field

  // Send the URL to the back-end (Node.js)
  fetch("/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the back-end
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
