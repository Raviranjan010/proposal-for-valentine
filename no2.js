        // Three.js Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('bg-canvas'),
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 30;

        // Create Heart Shape
        const heartShape = new THREE.Shape();
        const x = 0, y = 0;
        heartShape.moveTo(x, y);
        heartShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2.0, y + 3.0, x, y + 3.0);
        heartShape.bezierCurveTo(x - 2.0, y + 3.0, x - 2.5, y + 2.5, x, y);

        const extrudeSettings = {
            depth: 0.5,
            bevelEnabled: true,
            bevelSegments: 3,
            steps: 2,
            bevelSize: 0.3,
            bevelThickness: 0.3
        };

        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        const material = new THREE.MeshPhongMaterial({
            color: 0xff69b4,
            shininess: 100,
            specular: 0xffffff
        });

        // Create multiple hearts
        const hearts = [];
        for(let i = 0; i < 30; i++) {
            const heart = new THREE.Mesh(geometry, material);
            heart.position.set(
                Math.random() * 40 - 20,
                Math.random() * 40 - 20,
                Math.random() * 30 - 15
            );
            heart.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            heart.scale.set(0.3, 0.3, 0.3);
            scene.add(heart);
            hearts.push({
                mesh: heart,
                rotationSpeed: Math.random() * 0.02,
                floatSpeed: Math.random() * 0.02
            });
        }

        // Lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xff69b4, 0.5));

        // 3D Container Tilt Effect
        const container = document.querySelector('.container');
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            gsap.to('.card', {
                duration: 0.5,
                rotateX: ((y - centerY) / 10) * -1,
                rotateY: (x - centerX) / 10,
                ease: 'power2.out'
            });
        });

        container.addEventListener('mouseleave', () => {
            gsap.to('.card', {
                duration: 0.5,
                rotateX: 0,
                rotateY: 0,
                ease: 'power2.out'
            });
        });

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            
            hearts.forEach(heart => {
                heart.mesh.rotation.x += heart.rotationSpeed;
                heart.mesh.rotation.y += heart.rotationSpeed;
                heart.mesh.position.y += Math.sin(Date.now() * heart.floatSpeed) * 0.02;
            });

            renderer.render(scene, camera);
        }

        // Handle Window Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();

        // Button Hover Effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
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
