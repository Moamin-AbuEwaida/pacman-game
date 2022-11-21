const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const scoreEl = document.querySelector('#scoreEl');
const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');

canvas.width=innerWidth;
canvas.height=innerHeight;



class Boundary {
    static width= 40;
    static height= 40;
    constructor({position, image}){
        this.position = position;
        this.width = 40;
        this.height= 40;
        this.image = image
    };
    draw(){
        // c.fillStyle = 'blue';
        // c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.drawImage(this.image, this.position.x, this.position.y)
    };
};

class Player {
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
    }

    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'yellow';
        c.fill();
        c.closePath();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
};

class Ghost {
    static speed = 2
    constructor({position, velocity, color ='red'}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.color = color;
        this.prevCollisions = [];
        this.speed = 2
    }

    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
};
class Pellet {
    constructor({position}){
        this.position = position;
        this.radius = 3;
    }

    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'white';
        c.fill();
        c.closePath();
    }
};

const pellets = [];
const boundaries = [];
const ghosts = [
    new Ghost({
        position:{
            x: Boundary.width * 6 + Boundary.width/2,
            y: Boundary.height + Boundary.height/2
        },
        velocity:{
            x: Ghost.speed,
            y:0
        }
    })
];
const player = new Player({
    position:{
        x: Boundary.width + Boundary.width/2,
        y: Boundary.height + Boundary.height/2
    }, 
    velocity:{
        x:0,
        y:0
    }
});

const keys ={
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    },
}

let lastKey = '';
let score = 0;
let seconds = 0;
let minutes = 0;
// let seconds = 0;

// setInterval(() => {
//     timeEl.innerText = seconds++;
// },1000)

let counter = setInterval(() => {
    seconds++;
    if(seconds <= 9){
        secondsEl.innerHTML = "0" + seconds;
    }
    
    if (seconds > 9){
        secondsEl.innerHTML = seconds;
    }
  
    if (seconds > 59) {
    //   console.log("minutes");
      minutes++;
      minutesEl.innerHTML = "0" + minutes;
      seconds = 0;
      secondsEl.innerHTML = "0" + 0;
    }
    if (minutes > 9){
      minutesEl.innerHTML = minutes;
    }
},1000)
    







const map=[
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
];


function createImage(src){
    const image = new Image();
    image.src= src;
    return image;
};

map.forEach((row, i)=>{
    row.forEach((symbol, j)=>{
        switch (symbol){
            case '-':
                boundaries.push(new Boundary({
                    position:{
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./images/pipeHorizontal.png')
                }))
            break;
            case '|':
                boundaries.push(new Boundary({
                    position:{
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./images/pipeVertical.png')
                }))
            break;
            case '1':
                boundaries.push(new Boundary({
                    position:{
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./images/pipeCorner1.png')
                }))
            break;
            case '2':
                boundaries.push(new Boundary({
                    position:{
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./images/pipeCorner2.png')
                }))
            break;
            case '3':
                boundaries.push(new Boundary({
                    position:{
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./images/pipeCorner3.png')
                }))
            break;
            case '4':
                boundaries.push(new Boundary({
                    position:{
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./images/pipeCorner4.png')
                }))
            break;
            case 'b':
                boundaries.push(new Boundary({
                    position:{
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./images/block.png')
                }))
            break;
            case '[':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./images/capLeft.png')
          })
        )
        break
      case ']':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./images/capRight.png')
          })
        )
        break
      case '_':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./images/capBottom.png')
          })
        )
        break
      case '^':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./images/capTop.png')
          })
        )
        break
      case '+':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./images/pipeCross.png')
          })
        )
        break
      case '5':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./images/pipeConnectorTop.png')
          })
        )
        break
      case '6':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./images/pipeConnectorRight.png')
          })
        )
        break
      case '7':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./images/pipeConnectorBottom.png')
          })
        )
        break
      case '8':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./images/pipeConnectorLeft.png')
          })
        )
        break
      case '.':
        pellets.push(
          new Pellet({
            position: {
              x: j * Boundary.width + Boundary.width / 2,
              y: i * Boundary.height + Boundary.height / 2
            }
          })
        )
        break
        }
    })
});

function circleCollidesWithRectangle({circle, rectangle}){
    const padding = Boundary.width/2  - circle.radius - 1;
    return (
            circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding &&
            circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding && 
            circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding &&
            circle.position.x - circle.radius + circle.velocity.x  <= rectangle.position.x + rectangle.width + padding
            ) 
};

let animationId;

function animate(){
    animationId = requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);
    if(keys.w.pressed && lastKey === 'w'){
        for (let i =0; i<boundaries.length; i++){
            const boundary = boundaries[i]
        if (circleCollidesWithRectangle({
            circle: {
                ...player,
                velocity: {
                x: 0,
                y: -5
                }
            },
            rectangle: boundary
            })
            ){
                player.velocity.y = 0; 
                break;           
            } else {
                player.velocity.y = -5;
            }
        }
    } else if(keys.a.pressed && lastKey === 'a'){
        for (let i =0; i<boundaries.length; i++){
            const boundary = boundaries[i]
        if (circleCollidesWithRectangle({
            circle: {
                ...player,
                velocity: {
                x: -5,
                y: 0
                }
            },
            rectangle: boundary
            })
            ){
                player.velocity.x = 0; 
                break;           
            } else {
                player.velocity.x = -5;
            }
        }
    } else if(keys.s.pressed && lastKey === 's'){
        for (let i =0; i<boundaries.length; i++){
            const boundary = boundaries[i]
        if (circleCollidesWithRectangle({
            circle: {
                ...player,
                velocity: {
                x: 0,
                y: 5
                }
            },
            rectangle: boundary
            })
            ){
                player.velocity.y = 0; 
                break;           
            } else {
                player.velocity.y = 5;
            }
        }
    } else if(keys.d.pressed && lastKey === 'd'){
        for (let i =0; i<boundaries.length; i++){
            const boundary = boundaries[i]
        if (circleCollidesWithRectangle({
            circle: {
                ...player,
                velocity: {
                x: 5,
                y: 0
                }
            },
            rectangle: boundary
            })
            ){
                player.velocity.x = 0; 
                break;           
            } else {
                player.velocity.x = 5;
            }
        }
    }

    //touching pellet detector
for (let i= pellets.length - 1; i> 0; i--){
    const pellet = pellets[i];

    pellet.draw();

        if (Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y)< pellet.radius + player.radius){
            // console.log('eat');
            pellets.splice(i,1);
            score += 10;
            scoreEl.innerText = score;
        }
}

 

    boundaries.forEach(boundary=>{
        boundary.draw();

        if (circleCollidesWithRectangle(
            {
            circle: player,
            rectangle: boundary
            })
        ) {
                // console.log("collision is happening")
                player.velocity.x = 0;
                player.velocity.y = 0;
            }
    });
    player.update();
    ghosts.forEach(ghost=>{
        ghost.update();
            if (Math.hypot(ghost.position.x - player.position.x, ghost.position.y - player.position.y)< ghost.radius + player.radius){
                cancelAnimationFrame(animationId);
                console.log('you lose :P ');
                clearInterval(counter);
            }


        const collisions = [];
        boundaries.forEach(boundary=>{
            if (!collisions.includes('right') && circleCollidesWithRectangle({
            circle: {
                ...ghost,
                velocity: {
                x: ghost.speed,
                y: 0
                }
            },
            rectangle: boundary
            })
            ){
                collisions.push('right')
            }
            if (!collisions.includes('left') && circleCollidesWithRectangle({
            circle: {
                ...ghost,
                velocity: {
                x: -ghost.speed,
                y: 0
                }
            },
            rectangle: boundary
            })
            ){
                collisions.push('left')
            }
            if (!collisions.includes('down') && circleCollidesWithRectangle({
            circle: {
                ...ghost,
                velocity: {
                x: 0,
                y: ghost.speed
                }
            },
            rectangle: boundary
            })
            ){
                collisions.push('down')
            }
            if (!collisions.includes('up') && circleCollidesWithRectangle({
            circle: {
                ...ghost,
                velocity: {
                x: 0,
                y: -ghost.speed
                }
            },
            rectangle: boundary
            })
            ){
                collisions.push('up')
            }
        })
        if (collisions.length > ghost.prevCollisions.length){
            ghost.prevCollisions =  collisions;
        }
            if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)){
                // console.log('no');
                // console.log(collisions)
                // console.log(ghost.prevCollisions)
                if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
                else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
                else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
                else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')
                
                const pathways = ghost.prevCollisions.filter((collision) =>{
                    return !collisions.includes(collision)
                })
                // console.log({pathways})
                const direction = pathways[Math.floor(Math.random() * pathways.length)]
                // console.log({direction})
                switch (direction) {
                    case 'down':
                        ghost.velocity.y = ghost.speed;
                        ghost.velocity.x= 0;
                        break;
                    case 'up':
                        ghost.velocity.y = -ghost.speed;
                        ghost.velocity.x= 0;
                        break;
                    case 'right':
                        ghost.velocity.y = 0;
                        ghost.velocity.x= ghost.speed;
                        break;
                    case 'left':
                        ghost.velocity.y = 0;
                        ghost.velocity.x= -ghost.speed;
                        break;
                };
                ghost.prevCollisions = [];
            }
    })
};

animate()


addEventListener('keydown', ({key})=>{
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 's':
            keys.s.pressed = true;   
            lastKey = 's';         
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';            
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
    }
}); 

addEventListener('keyup', ({key})=>{
    switch (key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }
});