/**
 * Application namespace.
 * The main function and any application state are saved here.
 */
var application = {
    // We only ever have one renderer and camera, so leave them as global singletons
    renderer: null,
    camera: null,
    // Store an array of all meshes we have made as well
    objects: [],
    light: null,
    // Also have an earth object. This will be the centre of the scene
    earth: null,

    main: function () {
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

        application.renderer = new THREE.WebGLRenderer();
        application.camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );
        console.log(application.camera);
        application.camera.position.z = 300;
        const scene = new THREE.Scene();

        scene.add(application.camera);
        application.renderer.setSize(WIDTH, HEIGHT);
        container.appendChild(application.renderer.domElement);

        // ------------------------------------------------------
        var material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('texture/earth.jpg', THREE.SphericalRefractionMapping)
        });
        application.earth = construct.sphere({radius: 200, material: material});
        //application.earth.position.z = -300;
        scene.add(application.earth);

        // create a point light
        application.light = new THREE.PointLight(0xFFFFFF);

        // set its position
        application.light.position.x = application.camera.position.x;
        application.light.position.y = application.camera.position.y;
        application.light.position.z = application.camera.position.z;

        // add to the scene
        scene.add(application.light);

        application.camera.lookAt(application.earth.position);
        function update() {
            // Draw!
            // randomMove(sphere);
            application.renderer.render(scene, application.camera);

            // Schedule the next frame.
            requestAnimationFrame(update);
        }

        // Schedule the first frame.
        requestAnimationFrame(update);
        // earth.rotateY((Math.PI) /(360) + 90);
        // earth.rotateY((Math.PI) /(360) + 5);
        document.addEventListener("keydown", actions.keyDown);
    }
};

$(document).ready(application.main);