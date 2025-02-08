const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// Set a fixed resolution for the canvas
const CANVAS_WIDTH = 1200; // Match this to your background image width
const CANVAS_HEIGHT = 200;

// Set the canvas's internal resolution
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let gameSpeed = 2;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'parallax_background_layer_1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'parallax_background_layer_2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'parallax_background_layer_3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'parallax_background_layer_4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'parallax_background_layer_5.png';
const backgroundLayer6 = new Image();
backgroundLayer6.src = 'layer-5.png';

class Layer {
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 1200;
        this.height = 200;
        this.x2 = this.width;
        this.x3 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width){
            this.x2 = this.width + this.x3 - this.speed;
        }
        if (this.x3 <= -this.width){
            this.x3 = this.width + this.x - this.speed;
        }

        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
        this.x3 = Math.floor(this.x3 - this.speed);
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x3, this.y, this.width, this.height);
    }

}

const layer1 = new Layer(backgroundLayer1, 0.1)
const layer2 = new Layer(backgroundLayer2, 0.2)
const layer3 = new Layer(backgroundLayer3, 0.4)
const layer4 = new Layer(backgroundLayer4, 0.6)
const layer5 = new Layer(backgroundLayer5, 0.8)
const layer6 = new Layer(backgroundLayer6, 1.0)


const gameObjects = [layer1, layer2, layer3, layer4, layer5, layer6];

function animate (){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    })
    requestAnimationFrame(animate);
};
animate();