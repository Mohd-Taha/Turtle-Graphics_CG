class Navigate {
    constructor(staringPoint, direction, dist, theta) {
        this.turtle = new Turtle(staringPoint, direction);
        this.lines = []
        this.stack = [];
        this.dictionary = {};
        this.distance = dist;
        this.angle = theta;
    }

    drawPath(pathString) {
        let i = 0;
        while (i < pathString.length) {
            let char = pathString[i];
            switch (char) {
                case 'F':
                    this.turtle.forward(this.distance, true);
                    break;
                case '+':
                    this.turtle.turn(-this.angle);
                    break;
                case '-':
                    this.turtle.turn(this.angle);
                    break;
                case '(':
                    this.stack.push(this.turtle.CP);
                    // console.log("Pushed In", this.turtle.CP);
                    break;
                case ')':
                    this.turtle.CP = this.stack.pop();
                    // console.log("Popped Out", this.turtle.CP);
                    this.lines.push(this.turtle.drawTurtle());
                    this.turtle.path = new THREE.Path();
                    this.turtle.forwardMove(this.turtle.CP.x, this.turtle.CP.y, false);
                    break;
                default:
                    break;
            }
            i++;
        }
        return this.lines;
    }

    mapPath(dictionary, atom, itterate) {
        this.dictionary = dictionary;
        let pathString = atom;
        for (let j = 0; j < itterate; j++) {
            let i = 0;
            while (i < pathString.length) {
                let char = pathString[i];
                if (char === 'F' || char === '+' || char === '-') {} else {
                    if (dictionary[char] !== undefined) {
                        pathString += dictionary[char];
                    }
                }
                i++;
            }
        }
        return this.drawPath(pathString);
    }
}