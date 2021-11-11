const scene = new THREE.Scene();

var fac = new factory(0, 0, 5, 1000);
//factory arguments (position_X, position_Y, position_Y, Length)

initialize();
animate();

//Declare or Initialize variables here..
var point, initAngle, dictionary, itterate, intel;

//Code your logic here..
function initialize() {

    //----------------

    //Starting from the Origin
    point = new THREE.Vector2(0, 0);

    //Direction should be Upwards
    initAngle = 90;

    //Defining My Dictionary
    dictionary = {
        'A': 'F-(-F-F++F)',
        'B': 'F+(FF-)'
    };
    itterate = 2

    //Creating Object of Navigate Class (Which Implements Turtle In It)
    //Constructor (startingPoint, startingDirection, distanceJumps, angleJumps)
    intel = new Navigate(point, initAngle, 2.5, 22.5);

    //DrawPath wil accept pathString and return Array of arrays of vertices...
    //First we are calculating all the points and treating all lines sepatately...
    //No back tracking required...
    var lines = intel.drawPath("FF-(-F+F+F)+(+F-F-F)");
    var geometry,
        material = new THREE.LineBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < lines.length; i++) {
        geometry = new THREE.BufferGeometry().setFromPoints(lines[i]);
        var line = new THREE.Line(geometry, material);
        scene.add(line);
        console.log(line);
    }

    //First time you have to paas your dictionary...
    //After that just call through the object...
    scene.add(intel.mapPath(dictionary, "BBBAB", itterate));


}

function animate() {
    requestAnimationFrame(animate);
    fac.renderScene();
}