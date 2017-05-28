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
        var texture = THREE.ImageUtils.loadTexture('texture/earth.jpg', THREE.SphericalRefractionMapping);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.offset.x = 0.25;
        console.log(texture);
        var material = new THREE.MeshPhongMaterial({
            map: texture
        });
        material.shininess = 0;
        console.log(material);
        application.earth = construct.sphere({radius: 200, material: material});
        //application.earth.position.z = -300;
        scene.add(application.earth);

        // create a point light - this one will follow the camera
        application.light = new THREE.PointLight(0xFFFFFF);
        application.light.intensity = 0.9;
        application.light.position.x = application.camera.position.x;
        application.light.position.y = application.camera.position.y;
        application.light.position.z = application.camera.position.z;

        var lights = [];
        lights.push(new THREE.PointLight(0xFFFFFF));
        lights.push(new THREE.PointLight(0xFFFFFF));
        lights.push(new THREE.PointLight(0xFFFFFF));
        lights.push(new THREE.PointLight(0xFFFFFF));
        lights.push(new THREE.PointLight(0xFFFFFF));
        lights.push(new THREE.PointLight(0xFFFFFF));
        lights[0].position.x = 500;
        lights[1].position.x = -500;
        lights[2].position.z = 500;
        lights[3].position.z = -500;
        lights[4].position.y = 500;
        lights[5].position.y = -500;

        lights.forEach(function(r){r.lookAt(application.earth.position); r.intensity = 0.5; scene.add(r)});
        // add to the scene
        scene.add(application.light);
        application.camera.lookAt(application.earth.position);
        function update() {
            application.renderer.render(scene, application.camera);
            requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        document.addEventListener("keydown", actions.keyDown);
    }
};

$(document).ready(application.main);