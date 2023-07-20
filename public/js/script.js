// Set initial properties of the circle
anime.set('#circle', {
  scale: 0,
});

// Create the anime.js timeline for the popping animation
var timeline = anime.timeline({
  autoplay: false, // Set autoplay to false initially
});

// Animate the circle to scale up on page load
var scaleUpAnimation = anime({
  targets: '#circle',
  scale: 1,
  easing: 'easeOutExpo',
  duration: 800,
  autoplay: false
});

// Variables to track the hold gesture
var holdTimeout;
var isHolding = false;

// Animation object for the shaking animation
var shakeAnimation;

// Function to start the popping animation
function startPoppingAnimation() {
  timeline.add({
    targets: '#circle',
    scale: [1, 1.5],
    opacity: 0,
    easing: 'easeOutExpo',
    duration: 500,
  }).play();
}

// Function to handle the hold gesture
function handleHoldGesture() {
  // Clear the previous hold timeout if exists
  clearTimeout(holdTimeout);

  // Add the shaking animation
  shakeAnimation = anime({
    targets: '#circle',
    translateX: ['-10px', '10px'],
    easing: 'easeInOutSine',
    duration: 100,
    delay: 0, // Start the animation without delay
    direction: 'alternate',
    loop: true
  });

  // Start the popping animation after 3 seconds
  setTimeout(function() {
    // Check if the shaking animation is still active
    if (shakeAnimation) {
      shakeAnimation.pause(); // Pause the shaking animation
      startPoppingAnimation();
    }
  }, 3000);
}

// Add a mousedown event listener to the circle element
document.getElementById('circle').addEventListener('mousedown', function() {
  // Set the holding state to true
  isHolding = true;

  // Start the hold timeout
  holdTimeout = setTimeout(function() {
    // Check if the holding state is still true after the timeout
    if (isHolding) {
      handleHoldGesture();
    }
  }, 3000); // Set the hold duration to 3000 milliseconds (3 seconds)
});

// Add a mouseup event listener to stop the hold gesture
document.getElementById('circle').addEventListener('mouseup', function() {
  // Clear the hold timeout
  clearTimeout(holdTimeout);

  // Reset the holding state
  isHolding = false;

  // Check if the shaking animation is active and stop it
  if (shakeAnimation) {
    shakeAnimation.pause();
    shakeAnimation = null;
  }
});

// Play the scale up animation on page load
scaleUpAnimation.play();
