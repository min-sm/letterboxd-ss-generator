"use strict";
var htmlToImage = require("html-to-image");
var toPng = htmlToImage.toPng;

const node = document.getElementById("htmlContent");

const downloadBtn = document.getElementById("downloadBtn");

// Add click event listener to the download button
downloadBtn.addEventListener("click", () => {
  // Convert the selected element to PNG image
  toPng(node)
    .then(function (dataUrl) {
      // Create a link element
      const link = document.createElement("a");
      link.download = "my-image.png"; // Set the filename for the downloaded image
      link.href = dataUrl; // Set the data URL as href
      link.click(); // Trigger the click event on the link to start the download
    })
    .catch(function (error) {
      console.error("Oops, something went wrong!", error);
    });
});
