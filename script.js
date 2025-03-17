// ======== Face Recognition Setup with Loader ========
async function startFaceRecognition() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);

    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

        loader.remove(); // Remove loader when models are ready

        const video = document.createElement('video');
        document.body.appendChild(video);

        navigator.mediaDevices
            .getUserMedia({ video: {} })
            .then((stream) => {
                video.srcObject = stream;
            });

        video.addEventListener('play', () => {
            const canvas = faceapi.createCanvasFromMedia(video);
            document.body.appendChild(canvas);

            const displaySize = { width: video.width, height: video.height };
            faceapi.matchDimensions(canvas, displaySize);

            setInterval(async () => {
                const detections = await faceapi
                    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceDescriptors();

                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

                faceapi.draw.drawDetections(canvas, resizedDetections);
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

                if (detections.length > 0) {
                    document.getElementById("status").textContent = "✅ Face Detected!";
                    canvas.getContext('2d').strokeStyle = "#4CAF50"; // Green outline for detected faces
                } else {
                    document.getElementById("status").textContent = "❌ No Face Detected!";
                }
            }, 1000);
        });
    } catch (error) {
        loader.remove(); // Ensure loader disappears even on error
        alert("❌ Failed to load face recognition models. Please try again.");
    }
}

// ======== Attendance Marking (Fixed) ========
document.addEventListener("DOMContentLoaded", () => {
    const checkInBtn = document.querySelector(".check-in-btn");
    if (checkInBtn) {
        checkInBtn.addEventListener("click", () => {
            const currentTime = new Date().toLocaleTimeString();
            showPopup(`✅ Attendance Marked Successfully at ${currentTime}`, "success");
        });
    }

    // Verify Location Button
    const verifyBtn = document.querySelector(".verify-btn");
    if (verifyBtn) {
        verifyBtn.addEventListener("click", () => {
            if (!navigator.geolocation) {
                showPopup("❌ Geolocation is not supported by your browser.", "error");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    showPopup(`📍 Location Verified!\nLatitude: ${latitude}\nLongitude: ${longitude}`, "success");
                },
                (error) => {
                    showPopup("❌ Location access denied. Please enable GPS.", "error");
                }
            );
        });
    }

    // Initialize Face Recognition and Time/Date Display
    startFaceRecognition();
    updateDateTime();
});

    
// ======== Live Date & Time Display ========
function updateDateTime() {
    const timeElement = document.getElementById("current-time");
    const dateElement = document.getElementById("current-date");

    if (timeElement && dateElement) {
        setInterval(() => {
            const now = new Date();
            
            // Format Time
            const formattedTime = now.toLocaleTimeString();

            // Format Date
            const formattedDate = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Display Date & Time
            timeElement.textContent = formattedTime;
            dateElement.textContent = formattedDate;
        }, 1000); // Update every second
    }
}

// ======== Initialize Date & Time Display on Load ========
window.onload = () => {
    updateDateTime();  // Start live date and time display
};


// ======== Popup Notification Function ========
function showPopup(message, type) {
    const popup = document.createElement('div');
    popup.className = `popup ${type}`;
    popup.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

// ======== Loader Animation for Better UX ========
function createLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `<div class="spinner"></div>`;
    document.body.appendChild(loader);
    return loader;
}

// Remove loader when content is ready
window.onload = () => {
    const loader = document.querySelector('.loader');
    if (loader) loader.remove();
};
