       // Three.js Setup for 3D Background
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

       // Add Hearts to Scene
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

       // Confetti on Yes Button
       document.querySelector('.btn-yes').addEventListener('click', (e) => {
           e.preventDefault();
           confetti({
               particleCount: 100,
               spread: 70,
               origin: { y: 0.6 },
           });
           setTimeout(() => {
               window.location.href = 'yes.html';
           }, 1000);
       });

       // Card Hover Effect
       const card = document.querySelector('.card');
       card.addEventListener('mousemove', (e) => {
           const rect = card.getBoundingClientRect();
           const x = e.clientX - rect.left;
           const y = e.clientY - rect.top;

           const centerX = rect.width / 2;
           const centerY = rect.height / 2;

           const rotateX = (y - centerY) / 30;
           const rotateY = -(x - centerX) / 30;

           card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
       });

       card.addEventListener('mouseleave', () => {
           card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
       });

       // Button Hover Effects
       const buttons = document.querySelectorAll('.btn');
       buttons.forEach(btn => {
           btn.addEventListener('mouseover', () => {
               gsap.to(btn, {
                   scale: 1.1,
                   duration: 0.3,
                   ease: "power2.out"
               });
           });

           btn.addEventListener('mouseleave', () => {
               gsap.to(btn, {
                   scale: 1,
                   duration: 0.3,
                   ease: "power2.out"
               });
           });
       });