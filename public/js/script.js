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
      //Calling DELETE route to remove
      var textElement = circle.querySelector('.circle-content');
      const taskID = textElement.dataset.id;
      deleteTask(taskID);

    }
  }, 500);
}

// Function to handle the click event on a bubble with text
function handleClickEvent(circle) {
  var textElement = circle.querySelector('.circle-content');
  var text = textElement.textContent;

  circle.addEventListener('click', function(event) {
    event.stopPropagation();
    
    // Remove existing update box if it already exists
    var updateBox = document.querySelector('.update-box');
    if (updateBox) {
      updateBox.parentNode.removeChild(updateBox);
    }
    var addBox = document.querySelector('.add-box');
    if (addBox) {
      addBox.parentNode.removeChild(addBox);
    }



    // Create the update box
    var updateContainer = document.createElement('div');
    updateContainer.className = 'update-box';
    updateContainer.innerHTML = `
      <div class="update-title">Update Task</div>
      <input type="text" class="update-input" value="${text}">
      <button class="update-button">Confirm</button>
    `;

    var input = updateContainer.querySelector('.update-input');
    var confirmButton = updateContainer.querySelector('.update-button');

    confirmButton.addEventListener('click', function() {
      textElement.textContent = input.value;
      updateContainer.parentNode.removeChild(updateContainer);
      
      //Using PUT route to update task
      const taskID = textElement.dataset.id;
      updateTask(taskID, input.value)
    });

    // Position the update box above the bubble
    var circleRect = circle.getBoundingClientRect();
    updateContainer.style.position = 'absolute';
    updateContainer.style.top = circleRect.top - updateContainer.offsetHeight - 10 + 'px';
    updateContainer.style.left = circleRect.left + (circleRect.width - updateContainer.offsetWidth) / 2 + 'px';

    document.body.appendChild(updateContainer);
    input.focus();
  });
}

//Call PUT route
const updateTask = async (id, updatedTaskName) => {
  console.log(`calling PUT route for ${id}, changing to ${updatedTaskName}`)
  const url = `/api/task/${id}`;

  try {
    const res = await fetch(url,{
      method:'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: updatedTaskName})
    });

    if (!res.ok){
      throw new Error('Update failed!')
    }

    console.log("Update Successful!")
  }catch(err){
    console.error(err);
  }
};


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
    }, 500); // Set the hold duration to 500 milliseconds (.5 seconds)
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

//Call PUT route
const deleteTask = async (id) => {
  console.log(`calling delete route for ${id}`)
  const url = `/api/task/${id}`;

  try {
    const res = await fetch(url,{ method:'DELETE' });

    if (!res.ok){
      throw new Error('Delete failed!')
    }
    console.log("Delete Successful!")
  }catch(err){
    console.error(err);
  }
};