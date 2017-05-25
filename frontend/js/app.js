// We only ever have one renderer and camera, so leave them as global singletons
var renderer;
var camera;

// Store an array of all meshes we have made as well
var objects = [];

// Also have an earth object. This will be the centre of the scene
var earth;

$("document").ready(main);

function main() {
    // Set the scene size.
    var dimensions = document.body.getBoundingClientRect();
    const WIDTH = dimensions.width;
    const HEIGHT = dimensions.height;

    // Set some camera attributes.
    const VIEW_ANGLE = 45;
    const ASPECT = WIDTH / HEIGHT;
    const NEAR = 0.1;
    const FAR = 10000;

    const container = document.querySelector('#container');

    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );
    console.log(camera);

    const scene = new THREE.Scene();

    scene.add(camera);
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);

    // ------------------------------------------------------
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('texture/earth.jpg', THREE.SphericalRefractionMapping)
    });
    const sphere = construct.sphere({radius: 200, material: material});
    earth = sphere;
    earth.position.z = -300;
    scene.add(earth);

    // create a point light
    const pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // add to the scene
    scene.add(pointLight);

    camera.lookAt(earth.position);
    function update() {
        // Draw!
        // randomMove(sphere);
        renderer.render(scene, camera);

        // Schedule the next frame.
        requestAnimationFrame(update);
    }

    // Schedule the first frame.
    requestAnimationFrame(update);
    earth.rotateY((Math.PI) /(360) + 90);
    earth.rotateY((Math.PI) /(360) + 5);
    document.addEventListener("keydown", actions.keyDown);
}