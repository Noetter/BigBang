window.onload = function() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const particles = [];
    const colors = ["blue", "green",  "orange", "red", "white", "#4488FF", "yellow"];
    let countToStart = 0;
    
    canvas.width = window.innerWidth; // full width Canvas
    canvas.height = window.innerHeight; // full height Canvas

    // a helper function that returns a random number between min and max
    const random = (min, max) => Math.random() * (max - min) + min;

    const createParticles = function(n) {
        for (let i = 0; i < n; i ++) {
            particles.push({
				x: random(canvas.width / 2, (canvas.width/2) + 1),
				y: random(canvas.height / 2, (canvas.height/2) + 1),

                color: colors[parseInt(random(0, colors.length))],
                size: random(1, 10),
				speed: {
					x: random(-0.001, 0.001),
					y: random(-0.001, 0.001)
				},
				vel: { // velocity unit vector
						x: random(-0.1, 0.1),
						y: random(-0.1, 0.1),
				},
                vectors:[{
						x: random(-0.1, 0.1),
						y: random(-0.1, 0.1),
					speed: {
						x: random(-0.001, 0.001),
						y: random(-0.001, 0.001)
					}
				}]
            });
        }
    };

    // update each particle"s position based on its current velocity vector
    const update = function() {
		
        countToStart ++;
            particles.forEach(p => {
				p.vectors = [];
				particles.forEach(particle => {
					if(p.speed.x !== particle.speed.x){
						var gravitationX = calculateGravitationX(p, particle);
						var gravitationY = calculateGravitationY(p, particle);
						var speedX = gravitationX / (p.size);
						var speedY = gravitationY / (p.size);

						
						p.vel.x += gravitationX;
						p.vel.y += gravitationY;
						p.speed.x += speedX;
						p.speed.y += speedY;
						
						p.x += p.vel.x * p.speed.x;
						p.y += p.vel.y * p.speed.y;
					}
				});
				/*
				p.vectors.forEach(v => {
					p.vel.x += v.vel.x;
					p.vel.y += v.vel.y;
					p.speed.x += v.speed.x;
					p.speed.y += v.speed.y;
				});
				*/
			});
			
       
		document.getElementById('years').innerText = "Years since Big-Bang: "+countToStart+" Milion years";
    };

    // draw each particle as a Rectangle (Circle would be nice too)
    const draw = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            context.fillStyle = p.color;
            context.fillRect(p.x, p.y, p.size/5, p.size/5);
            context.globalAlpha = 1;
        });
    };

    const tick = function() {
        update();
        draw();
        requestAnimationFrame(tick);
    };
	
	function calculateGravitationX(p, particle){
		var massP = p.size;
		var massParticle = particle.size;
		var distanceX = Math.abs(p.x - particle.x);
		var constant = 6.67 * (Math.pow(10,-11));
		var gravitation = (constant * massP * massParticle) / (distanceX * distanceX);
		return gravitation;
		
	}
	function calculateGravitationY(p, particle){
		var massP = p.size;
		var massParticle = particle.size;
		var distanceY = Math.abs(p.y - particle.y);
		var constant = 6.67 * (Math.pow(10,-11));
		var gravitation = (constant * massP * massParticle) / (distanceY * distanceY);
		return gravitation;
		
	}
	

    createParticles(5000);
    tick();
}