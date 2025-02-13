        // Previous background hearts and mouse move hearts code remains the same
        function createBackgroundHearts() {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.classList.add('background-heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 10 + 5 + 's';
            document.querySelector('.background-hearts').appendChild(heart);
            setTimeout(() => heart.remove(), 15000);
        }

        setInterval(createBackgroundHearts, 300);

        document.addEventListener("mousemove", function(e) {
            if (Math.random() > 0.9) {
                const heart = document.createElement("div");
                heart.innerHTML = "❤️";
                heart.classList.add("heart");
                heart.style.left = e.clientX + 'px';
                heart.style.top = e.clientY + 'px';
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 2000);
            }
        });

        // 3D tilt effect remains the same
        const container = document.querySelector('.container');
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = -(x - centerX) / 20;
            container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(20px)';
        });

        // Enhanced No button movement with container boundaries
        document.addEventListener('DOMContentLoaded', function() {
            const noButton = document.getElementById('noButton');
            const btnContainer = document.querySelector('.btn');
            let isInitialized = false;

            function initializeButtonPosition() {
                if (!isInitialized) {
                    noButton.style.position = 'absolute';
                    noButton.style.left = '50%';
                    noButton.style.transform = 'translateX(-50%)';
                    isInitialized = true;
                }
            }

            initializeButtonPosition();

            btnContainer.addEventListener('mousemove', function(e) {
                const btnRect = btnContainer.getBoundingClientRect();
                const buttonRect = noButton.getBoundingClientRect();
                
                // Calculate relative position within the button container
                const x = e.clientX - btnRect.left;
                const y = e.clientY - btnRect.top;
                
                // Calculate button center position
                const buttonCenterX = buttonRect.left - btnRect.left + buttonRect.width / 2;
                const buttonCenterY = buttonRect.top - btnRect.top + buttonRect.height / 2;
                
                // Calculate distance between cursor and button
                const deltaX = x - buttonCenterX;
                const deltaY = y - buttonCenterY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                if (distance < 100) { // Trigger distance
                    // Calculate new position - move away from cursor
                    const angle = Math.atan2(deltaY, deltaX);
                    const moveX = Math.cos(angle) * 100;
                    const moveY = Math.sin(angle) * 100;
                    
                    // Calculate new position
                    let newX = buttonCenterX - moveX;
                    let newY = buttonCenterY - moveY;
                    
                    // Apply boundaries
                    newX = Math.max(buttonRect.width / 2, Math.min(btnRect.width - buttonRect.width / 2, newX));
                    newY = Math.max(buttonRect.height / 2, Math.min(btnRect.height - buttonRect.height / 2, newY));
                    
                    // Apply new position with smooth transition
                    noButton.style.left = `${newX - buttonRect.width / 2}px`;
                    noButton.style.top = `${newY - buttonRect.height / 2}px`;
                }
            });
        });