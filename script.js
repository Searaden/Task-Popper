const circle = document.querySelector('.circle');
const originalRadius = parseFloat(circle.getAttribute('r'));
const targetRadius = originalRadius * 1.5;

anime({
  targets: circle,
  r: targetRadius,
  easing: 'easeInOutSine',
  duration: 500,
  update: function(anim) {
    circle.setAttribute('r', anim.animations[0].currentValue);
  }
});
