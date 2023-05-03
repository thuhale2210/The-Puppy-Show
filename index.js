var imageList = [];
var durationList = [];
var titleList = [];
var currentIndex = 0;
var autoChangeInterval;

// Function to load image list from JSON file using AJAX
function loadImageList() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "imageList.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    imageList = data.images;
                    durationList = data.duration;
                    titleList = data.titles;
                    showImage(currentIndex);
                    showImageInGallery();
                    showInfo(currentIndex);
                    startAutoChange();
                } catch (error) {
                    console.error("Failed to parse image list:", error);
                }
            } else {
                console.error("Failed to load image list. Status:", xhr.status);
            }
        }
    };
    xhr.send();
}

// Load image list when page loads
loadImageList();

// Function to show image at given index
function showImage(index) {
    var image = document.getElementById("current-image");
    image.src = imageList[index];
}

// Function to show info of current image
function showInfo(index) {
    var durationBox = document.getElementById("durationBox");
    durationBox.innerHTML = "This " + titleList[index] + " picture is available in " + durationList[index] + " seconds";
}

// Function to show image at gallery
function showImageInGallery() {
    document.getElementById("imgGallery1").src = imageList[0];
    document.getElementById("imgGallery2").src = imageList[1];
    document.getElementById("imgGallery3").src = imageList[2];
    document.getElementById("imgGallery4").src = imageList[3];
    document.getElementById("imgGallery5").src = imageList[4];
    document.getElementById("imgGallery6").src = imageList[5];
}

// Function to show previous image
function showPrevious() {
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    showImage(currentIndex);
    showInfo(currentIndex);
}

// Function to show next image
function showNext() {
    currentIndex = (currentIndex + 1) % imageList.length;
    showImage(currentIndex);
    showInfo(currentIndex);
}

// Function to start interval for automatically changing images
function startAutoChange() {
    clearInterval(autoChangeInterval);
    var duration = imageList[currentIndex].duration || 2000;
    autoChangeInterval = setInterval(showNext, duration);
    // timeChangeInterval = setInterval(timer, duration);
}

// Event listener for previous button
document.getElementById("btn-previous").addEventListener("click", function () {
    showPrevious();
    startAutoChange();
});

// Event listener for next button
document.getElementById("btn-next").addEventListener("click", function () {
    showNext();
    startAutoChange();
});

// Event listener for update button
document.getElementById("btn-update").addEventListener("click", function () {
    loadImageList();
});