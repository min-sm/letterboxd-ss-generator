document
  .getElementById("downloadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    try {
      // Send an AJAX request to trigger the screenshot capture
      const response = await fetch("/download", {
        method: "POST",
      });

      if (response.ok) {
        console.log("Screenshot captured successfully.");
        // Optionally, you can handle the response here
      } else {
        console.error("Failed to capture screenshot.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
