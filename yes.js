var radius = 240;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = 120;
var imgHeight = 170;

setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aCards = ospin.getElementsByClassName('card');

ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";
var tX = 0, tY = 10, desX = 0, desY = 0;

function init(delayTime) {
  for (var i = 0; i < aCards.length; i++) {
    aCards[i].style.transform = "rotateY(" + (i * (360 / aCards.length)) + "deg) translateZ(" + radius + "px)";
    aCards[i].style.transition = "transform 1s";
    aCards[i].style.transitionDelay = delayTime || (aCards.length - i) / 4 + "s";
  }
}

function applyTransform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

if (autoRotate) {
  ospin.style.animation = `spin ${Math.abs(rotateSpeed)}s infinite linear`;
}

document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  var sX = e.clientX, sY = e.clientY;

  document.onpointermove = function (e) {
    var nX = e.clientX, nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTransform(odrag);
    sX = nX;
    sY = nY;
  };

  document.onpointerup = function () {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTransform(odrag);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
      }
    }, 17);
    document.onpointermove = document.onpointerup = null;
  };
};

// Flip cards on button click
document.getElementById('flip-button').addEventListener('click', () => {
  Array.from(aCards).forEach(card => {
    const currentTransform = card.style.transform;
    card.classList.toggle('flipped');
    requestAnimationFrame(() => {
      // Maintain the card's position in 3D space while flipping
      if (card.classList.contains('flipped')) {
        card.style.transform = currentTransform + ' rotateY(180deg)';
      } else {
        card.style.transform = currentTransform.replace(' rotateY(180deg)', '');
      }
    });
  });
});
function createReflections() {
  Array.from(aCards).forEach((card, index) => {
    const reflection = card.cloneNode(true);
    reflection.classList.add('reflection');
    ground.appendChild(reflection);
    
    // Position reflection
    const angle = (index * (360 / aCards.length));
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.sin(radian);
    const z = radius * Math.cos(radian);
    
    reflection.style.transform = `
      translate(${x}px, ${z}px)
      rotateX(180deg)
      scale(1, -1)
      translateY(${radius * 2}px)
    `;
  });
}

function updateReflections() {
  const reflections = ground.getElementsByClassName('reflection');
  Array.from(reflections).forEach((reflection, index) => {
    const card = aCards[index];
    const cardTransform = window.getComputedStyle(card).transform;
    reflection.style.transform = `${cardTransform} rotateX(180deg) scale(1, -1)`;
  });
}

function createReflections() {
  Array.from(aCards).forEach((card, index) => {
    const reflection = card.cloneNode(true);
    reflection.classList.add('reflection');
    ground.appendChild(reflection);
    
    // Position reflection
    const angle = (index * (360 / aCards.length));
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.sin(radian);
    const z = radius * Math.cos(radian);
    
    reflection.style.transform = `
      translate(${x}px, ${z}px)
      rotateX(180deg)
      scale(1, -1)
      translateY(${radius * 2}px)
    `;
  });
}

function updateReflections() {
  const reflections = ground.getElementsByClassName('reflection');
  Array.from(reflections).forEach((reflection, index) => {
    const card = aCards[index];
    const cardTransform = window.getComputedStyle(card).transform;
    reflection.style.transform = `${cardTransform} rotateX(180deg) scale(1, -1)`;
  });
}
// Music player functionality
const audio = document.getElementById('background-music');
const playPauseBtn = document.getElementById('play-pause');
const playPauseIcon = playPauseBtn.querySelector('i');
const volumeControl = document.getElementById('volume-control');

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseIcon.className = 'fas fa-pause';
  } else {
    audio.pause();
    playPauseIcon.className = 'fas fa-play';
  }
});

volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});

// Floating Hearts Effect
const MAX_HEARTS = 20; // Increased max hearts

function createHeart() {
  if (document.querySelectorAll('.floating-heart').length >= MAX_HEARTS) return;

  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.innerHTML = '❤️';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Random duration for each heart
  heart.style.fontSize = (Math.random() * 20 + 20) + 'px'; // Random size for each heart
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 5000); // Remove heart after 5 seconds
}

setInterval(createHeart, 300); // Create hearts at intervals
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create Heart Shape
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 0);
heartShape.bezierCurveTo(0, 0.5, 0.5, 1, 1, 1);
heartShape.bezierCurveTo(1.5, 1, 2, 0.5, 2, 0);
heartShape.bezierCurveTo(2, -0.5, 1.5, -1, 1, -1);
heartShape.bezierCurveTo(0.5, -1, 0, -0.5, 0, 0);

const heartGeometry = new THREE.ExtrudeGeometry(heartShape, {
  depth: 0.1,
  bevelEnabled: true,
  bevelSegments: 5,
  steps: 2,
  bevelSize: 0.1,
  bevelThickness: 0.1,
});
const hearts = [];
for (let i = 0; i < 50; i++) {
  const heartMaterial = new THREE.MeshStandardMaterial({
    color: 0xff4b8b,
    metalness: 0.3,
    roughness: 0.6,
  });
  const heart = new THREE.Mesh(heartGeometry, heartMaterial);
  heart.position.set(
    THREE.MathUtils.randFloatSpread(10),
    THREE.MathUtils.randFloatSpread(10),
    THREE.MathUtils.randFloatSpread(10)
  );
  heart.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  heart.scale.set(0.5, 0.5, 0.5);
  scene.add(heart);
  hearts.push(heart);
}

// Lighting
const pointLight = new THREE.PointLight(0xff4b8b, 1);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(pointLight, ambientLight);

camera.position.z = 5;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  hearts.forEach(heart => {
    heart.rotation.x += 0.01;
    heart.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
}
animate();
 // Add 3D hearts to background
 function create3DHearts() {
  const container = document.getElementById('background');
  const numHearts = 15;

  for (let i = 0; i < numHearts; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-3d';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${Math.random() * 100}vh`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(heart);
  }
}

// Enhanced reflection handling
function createEnhancedReflections() {
  Array.from(aCards).forEach((card, index) => {
    const reflection = card.cloneNode(true);
    reflection.classList.add('reflection');
    ground.appendChild(reflection);
    
    const angle = (index * (360 / aCards.length));
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.sin(radian);
    const z = radius * Math.cos(radian);
    
    reflection.style.transform = `
      translate3d(${x}px, ${z}px, 0)
      rotateX(180deg)
      scale(1, -0.5)
      translateY(${radius * 2}px)
      perspective(1000px)
    `;
  });
}

function updateEnhancedReflections() {
  const reflections = ground.getElementsByClassName('reflection');
  Array.from(reflections).forEach((reflection, index) => {
    const card = aCards[index];
    const cardTransform = window.getComputedStyle(card).transform;
    const reflectionTransform = `
      ${cardTransform}
      rotateX(180deg)
      scale(1, -0.5)
      perspective(1000px)
    `;
    reflection.style.transform = reflectionTransform;
    
    // Update reflection opacity based on card position
    const cardRect = card.getBoundingClientRect();
    const distanceFromCenter = Math.abs(cardRect.top + cardRect.height/2 - window.innerHeight/2);
    const maxDistance = window.innerHeight/2;
    const opacity = 0.4 * (1 - distanceFromCenter/maxDistance);
    reflection.style.opacity = opacity;
  });
}