let canvas = document.querySelector('canvas');

let ctx = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;


/*start circle*/

class Circle {
    constructor(x, y, radius, acceleration) {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.speed = 1
        this.acceleration = acceleration
    }

    drow() {
        ctx.beginPath();
        ctx.fillStyle = 'red'
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.fill()
        ctx.stroke();
    }

    update() {
        if (this.y + this.radius >= h) {
            lose()
        }
        this.y += this.speed;
        this.speed += this.acceleration;
        this.drow();
    }
}



/*end circle*/



function lose() {
    document.getElementById('lose').style.display = 'block';
    //circle.y = innerHeight / 2;
    circle.speed = 0;
    circle.acceleration = 0;
    line1.speed = 0;
    line2.speed = 0;
}


window.onclick = function() {
    circle.speed = -15;
}




let h = canvas.height,
    w = canvas.width,
    flag = '',
    score = 0,
    board = document.querySelector('span');


let Speed, circleRadius;
if (w <= 800) {
    Speed = -3;
    circleRadius = 15;
} else {
    circleRadius = 30;
    Speed = -10;
}

class Line {
    constructor(x1, y1, x2, y2, line_width = 1, color = 'gray', speed = Speed) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.line_width = line_width
        this.color = color
        this.speed = speed

    }

    drow() {
        ctx.beginPath();
        ctx.lineWidth = this.line_width;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.strokeStyle = this.color;
        ctx.stroke()
    };

    update() {
        this.x1 += this.speed;
        this.x2 += this.speed;
        this.drow();

        if (this.behave == 'hard' && this.x1 <= 0) {
            this.speed = -this.speed;
            this.color = 'red';
        }
    };

};





let spaceAllow = 200;


let freeSpaceStart = Math.floor(Math.random() * (h / 2))
if (freeSpaceStart <= 50) freeSpaceStart = 100;
let line1 = new Line(w, 0, w, freeSpaceStart, 10);
let line2 = new Line(w, spaceAllow + freeSpaceStart, w, h, 10);


///////////////////////////////////////

let circle = new Circle(w / 2, 0, circleRadius, 1);

///////////////////////////////////////

let line_move = () => {
    console.log(line1.x1)
    if (line1.x1 > w && line1.speed > 0) {
        line1.x1 = w + 100;
        line1.x2 = w + 100;
        line2.x1 = w + 100;
        line2.x2 = w + 100;

        line1.speed = -line1.speed;
        line2.speed = -line2.speed;
        line1.color = 'gray';
        line2.color = 'gray';


    }

    if (line1.x1 <= 0) {
        let behave = Math.random() * 100;
        if (behave <= 95) {
            freeSpaceStart = Math.floor(Math.random() * (h / 2));
            if (freeSpaceStart <= 50) freeSpaceStart = 100;

            line1.y1 = 0;
            line1.y2 = freeSpaceStart;
            line2.y1 = freeSpaceStart + spaceAllow;
            line2.y2 = h

            line1.x1 = w + 300;
            line1.x2 = w + 300;
            line2.x1 = w + 300;
            line2.x2 = w + 300;
        } else {
            line1.color = 'red';
            line2.color = 'red';
            line1.speed = -line1.speed
            line2.speed = -line2.speed

        }
        score += 1;
        board.innerText = score;
    }


    ctx.clearRect(0, 0, w, h);
    line2.update();
    line1.update();
    circle.update();
    let yintersect = Boolean((circle.y + circle.radius <= line1.y2 || circle.y + circle.radius >= line2.y1));
    /*
    if ((circle.y + circle.radius) - line2.y1 <= 5 ||(circle.y + circle.radius) - line1.y2 >= 5) {
        if (Math.abs(circle.x + circle.radius + (line1.line_width / 2) - line1.x1) <= 5) {
            lose();
        }
    }
*/

    if (yintersect) {

        if (Math.abs(circle.x - line1.x1) <= circle.radius + (line1.line_width / 2) && line1.speed < 0) lose();
        if (Math.abs(circle.x - line1.x1) <= circle.radius - (line1.line_width / 2) && line1.speed > 0) lose();
    }

    requestAnimationFrame(line_move);


};


requestAnimationFrame(line_move);

document.querySelector('#lose button').onclick = function() {
    let loc = window.location;
    window.location = "";
    window.location = loc;
}