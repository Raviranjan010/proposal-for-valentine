       // Create floating hearts
        // Max number of hearts allowed at a time
        const MAX_HEARTS = 15;

        // Create floating hearts
        function createHeart() {
            if (document.querySelectorAll('.floating-heart').length >= MAX_HEARTS) return;
        
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
            heart.style.setProperty('--tr', (Math.random() * 360) + 'deg');
            document.body.appendChild(heart);
        
            setTimeout(() => heart.remove(), 3000); // Ensure heart disappears after a fixed time
        }
        
        // Create hearts periodically (keep count in check)
        setInterval(createHeart, 300);
        
        // Mouse trail hearts (with limit)
        document.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.1) { // Reduce frequency
                if (document.querySelectorAll('.floating-heart').length >= MAX_HEARTS) return;
        
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.innerHTML = '❤️';
                heart.style.left = e.pageX + 'px';
                heart.style.top = e.pageY + 'px';
                heart.style.setProperty('--tx', (Math.random() * 100 - 50) + 'px');
                heart.style.setProperty('--tr', (Math.random() * 360) + 'deg');
                document.body.appendChild(heart);
        
                setTimeout(() => heart.remove(), 3000); // Ensure heart disappears after a fixed time
            }
        });
          // Add Hearts to Scene
          function addHeart() {
                    const heartGeometry = createHeartShape();
                    const heartMaterial = new THREE.MeshStandardMaterial({
                        color: 0xff4b8b,
                        metalness: 0.3,
                        roughness: 0.6,
                    });
                    const heart = new THREE.Mesh(heartGeometry, heartMaterial);
                    
                    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
                    heart.position.set(x, y, z);
                    heart.rotation.set(
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        Math.random() * Math.PI
                    );
                    heart.scale.set(0.5, 0.5, 0.5);
                    scene.add(heart);
                    return heart;
                }
        
                // Add multiple hearts
                const hearts = Array(50).fill().map(addHeart);
        
                // Lighting
                const pointLight = new THREE.PointLight(0xff4b8b, 1);
                pointLight.position.set(5, 5, 5);
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
                scene.add(pointLight, ambientLight);
        
        
                // Add hover effect to the card
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
        
                // Add button hover effects
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