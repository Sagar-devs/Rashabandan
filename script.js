document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const rakshaImg = document.getElementById('rakshaImg');
    const modal = document.getElementById('myModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const countdown = document.getElementById('countdown');
    const modalImg = document.getElementById('modalImg');
    const wishesText = document.getElementById('wishesText');
    const wishesThanks = document.getElementById('wishesThanks');
    let heartTimeouts = [];
    let heartInterval;
    let countdownInterval;
    let heartsVisible = false;
    let modalTimeout;

    // Define the deadline
    const deadline = new Date(2024, 7, 18, 19, 30, 0); // 19 July 2024, 7 AM

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const size = Math.random() * 30 + 10; // Random size between 10 and 40px
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        const x = Math.random() * (window.innerWidth - size); // Random x position within window width
        const y = Math.random() * (window.innerHeight - size); // Random y position within window height
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        body.appendChild(heart);

        // Remove the heart element after animation
        heart.addEventListener('animationend', function() {
            heart.remove();
        });

        // Remove the heart after 10 seconds
        const timeout = setTimeout(function() {
            heart.remove();
        }, 10000); // 10000 milliseconds = 10 seconds
        heartTimeouts.push(timeout);
    }

    function createMultipleHearts() {
        for (let i = 0; i < 5; i++) { // Create 5 hearts at a time
            createHeart();
        }
    }

    function calculateTimeRemaining() {
        const currentDate = new Date();
        const timeDifference = deadline - currentDate;
        if (timeDifference <= 0) {
            // Time is up
            return "The time has passed!";
        }
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    function updateCountdown() {
        const timeRemaining = calculateTimeRemaining();
        countdown.innerText = `Time remaining for Raksha Bandhan: ${timeRemaining}`;
        if (timeRemaining === "The time has passed!") {
            clearInterval(countdownInterval);
            countdown.innerText = "";
        }
    }

    function toggleModal() {
        const timeRemaining = calculateTimeRemaining();
        if (timeRemaining !== "The time has passed!") {
            modalImg.style.display = "none";
            wishesText.style.display = "none";
            wishesThanks.style.display = "none";
        } else {
            modalImg.style.display = "block";
            wishesText.style.display = "block";
            wishesThanks.style.display = "block";
        }

        if (modal.style.display === "none" || modal.style.display === "") {
            // Show the modal
            rakshaImg.classList.add('zoomOut');
            modal.style.display = "block";
            updateCountdown();

            // Update the countdown every second
            countdownInterval = setInterval(updateCountdown, 1000);

            // Auto-close modal after a short duration
            modalTimeout = setTimeout(function() {
                countdown.innerText = ""; // Clear countdown text
            }, 30000); // Auto-close after 30 seconds
        } else {
            // Hide the modal
            modal.style.display = "none";
            clearInterval(countdownInterval);
            rakshaImg.classList.remove('zoomOut');
            rakshaImg.classList.add('zoomIn');
            
            // Remove hearts and clear timeouts
            heartTimeouts.forEach(timeout => clearTimeout(timeout));
            heartTimeouts = [];
            clearInterval(heartInterval);
        }
    }

    function showHearts() {
        // Display hearts
        heartInterval = setInterval(createMultipleHearts, 100); // Create multiple hearts more frequently
        setTimeout(function() {
            clearInterval(heartInterval);
        }, 30000); // Display hearts for 30 seconds
    }

    rakshaImg.addEventListener('click', function() {
        if (rakshaImg.classList.contains('zoomOut')) {
            rakshaImg.classList.remove('zoomOut');
            rakshaImg.classList.add('zoomIn');
        } else {
            rakshaImg.classList.remove('zoomIn');
            rakshaImg.classList.add('zoomOut');
        }

        showHearts(); // Show hearts every time the image is clicked
        toggleModal(); // Toggle modal display
    });

    closeModal.onclick = function() {
        modal.style.display = "none";
        rakshaImg.classList.remove('zoomOut');
        rakshaImg.classList.add('zoomIn');
        clearInterval(countdownInterval);
        clearTimeout(modalTimeout);
        heartTimeouts.forEach(timeout => clearTimeout(timeout));
        heartTimeouts = [];
        clearInterval(heartInterval);
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal.click();
        }
    }
});
