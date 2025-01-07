const API_URL = "http://localhost:3000/random-camera";

const cameraFeed = document.getElementById("camera-feed");
const randomizeButton = document.getElementById("randomize-button");

// Function to load a random camera feed
async function loadRandomCamera() {
  try {
    const response = await fetch(API_URL); // Fetch a random camera feed from the backend
    const data = await response.json();
    cameraFeed.src = data.url; // Update the iframe's source to display the camera feed
  } catch (error) {
    console.error("Error loading random camera:", error);
    alert("Failed to load random camera. Please try again.");
  }
}

// Load the first camera automatically on page load
window.onload = loadRandomCamera;

// Attach the event listener to the button
randomizeButton.addEventListener("click", loadRandomCamera);
