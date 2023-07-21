// Set initial properties of the circles
anime.set('.circle', {
  scale: 0,
});

// Create the anime.js timeline for the popping animation
var timeline = anime.timeline({
  autoplay: false, // Set autoplay to false initially
});

// Animate the circles to scale up on page load
var scaleUpAnimation = anime({
  targets: '.circle',
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

// Function to start the popping animation for a specific task
function startPoppingAnimation(circle) {
  timeline.add({
    targets: circle,
    scale: [1, 1.5],
    opacity: 0,
    easing: 'easeOutExpo',
    duration: 500,
    complete: function(anim) {
      circle.remove(); // Remove the circle element from the DOM
    }
  }).play();
}

// Function to handle the hold gesture for a specific task
function handleHoldGesture(circle) {
  // Clear the previous hold timeout if exists
  clearTimeout(holdTimeout);

  // Add the shaking animation to the specific circle
  shakeAnimation = anime({
    targets: circle,
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
      startPoppingAnimation(circle);
    }
  }, 3000);
}

// Function to create a custom input element for editing text
function createTextInputElement(text, callback) {
  var input = document.createElement('input');
  input.type = 'text';
  input.value = text;
  input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      callback(input.value);
    }
  });
  return input;
}

// Function to handle the click event on a bubble with text
function handleClickEvent(circle) {
  var textElement = circle.querySelector('.circle-content');
  var text = textElement.textContent;

  circle.addEventListener('click', function(event) {
    var input = createTextInputElement(text, function(newText) {
      textElement.textContent = newText;
      circle.removeChild(input);
    });

    circle.appendChild(input);
    input.focus();

    // Add event listener to detect clicks outside the input
    document.addEventListener('click', function(event) {
      var isClickInside = circle.contains(event.target) || input.contains(event.target);
      if (!isClickInside) {
        textElement.textContent = input.value;
        circle.removeChild(input);
        document.removeEventListener('click', this);
      }
    });
  });
}

// Add a mousedown event listener to the circles
var circles = document.getElementsByClassName('circle');
for (var i = 0; i < circles.length; i++) {
  var circle = circles[i];
  handleClickEvent(circle);

  circle.addEventListener('mousedown', function(event) {
    // Set the holding state to true
    isHolding = true;

    // Get the circle element
    var circle = event.currentTarget;

    // Start the hold timeout
    holdTimeout = setTimeout(function() {
      // Check if the holding state is still true after the timeout
      if (isHolding) {
        handleHoldGesture(circle);
      }
    }, 3000); // Set the hold duration to 3000 milliseconds (3 seconds)
  });
}

// Add a mouseup event listener to stop the hold gesture
document.addEventListener('mouseup', function() {
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
