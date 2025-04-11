const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

// List of image URLs
const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" }
];

// Function to download an image
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img); // Resolve with the image
        img.onerror = () => reject(`Failed to load image: ${url}`); // Reject with an error message
    });
}

// Function to download all images
function downloadImages() {
    output.innerHTML = ""; // Clear output
    errorDiv.innerHTML = ""; // Clear errors
    loading.style.display = "block"; // Show loading spinner

    const imagePromises = images.map(img => downloadImage(img.url));

    Promise.all(imagePromises)
        .then(images => {
            loading.style.display = "none"; // Hide loading spinner
            images.forEach(img => output.appendChild(img)); // Append images to output div
        })
        .catch(error => {
            loading.style.display = "none"; // Hide loading spinner
            errorDiv.innerHTML = error; // Show error message
        });
}

// Attach event listener to button
btn.addEventListener("click", downloadImages);
