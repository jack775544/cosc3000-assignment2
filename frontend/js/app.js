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
    // The light of the sun
    light: null,
    // Also have an earth object. This will be the centre of the scene
    earth: null,
    // The skybox mesh
    skybox: null,
    // An array of all cloud meshes
    clouds: [],
    // The controls object
    controls: null,

    main: function () {
        var keyboard = new THREEx.KeyboardState();

        // Set the scene size.
        var dimensions = document.body.getBoundingClientRect();
        const WIDTH = dimensions.width;
        const HEIGHT = dimensions.height;

        // Set some camera attributes.
        const VIEW_ANGLE = 45;
        const ASPECT = WIDTH / HEIGHT;
        const NEAR = 0.1;
        const FAR = 1000000;

        const container = document.getElementById('container');

        application.renderer = new THREE.WebGLRenderer();
        application.camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );
        console.log(application.camera);
        application.camera.position.z = 700;
        const scene = new THREE.Scene();

        scene.add(application.camera);
        application.renderer.setSize(WIDTH, HEIGHT);
        container.appendChild(application.renderer.domElement);

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
        scene.add(application.earth);

        var cloudMaterials = ['cloud1', 'cloud2', 'cloud3', 'cloud4', 'cloud5'].map(function(r){
            return new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('texture/clouds/' + r + '.png'),
                transparent: true
            });
        });

        for (var i = 0; i<5; i++) {
            const cloudMesh = construct.sphere({radius: 210 + 5*i, material: cloudMaterials[i % cloudMaterials.length]});
            application.clouds.push({mesh: cloudMesh, x: (util.getRandomInt(1,10) / 1000) - 0.005, y: (util.getRandomInt(1,10) / 1000) - 0.005});
        }
        application.clouds.forEach(function(r){scene.add(r.mesh);});

        // create a point light - this one will be the sun
        application.light = new THREE.PointLight(0xFFFFFF);
        application.light.intensity = 0.9;
        application.light.position.x = application.camera.position.x;
        application.light.position.y = application.camera.position.y - 40;
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

        application.skybox = construct.skybox();

        scene.add(application.skybox);

        application.controls = new THREE.OrbitControls(application.camera, application.renderer.domElement);
        application.controls.maxDistance = 700;
        application.controls.minDistance = 230;
        lights.forEach(function(r){r.lookAt(application.earth.position); r.intensity = 0.5; scene.add(r)});
        // add to the scene
        scene.add(application.light);
        application.camera.lookAt(application.earth.position);
        function update() {
            requestAnimationFrame(update);
            application.renderer.render(scene, application.camera);
            if (keyboard.pressed('q')) {
                // Zoom in
                if (util.cartesianToPolar(application.camera.position).r > 230) {
                    actions.zoomCamera(-10);
                }
            }
            if (keyboard.pressed('e')) {
                // Zoom Out
                if (util.cartesianToPolar(application.camera.position).r < 700) {
                    actions.zoomCamera(10);
                }
            }
            if (keyboard.pressed('w')) {
                if (util.cartesianToPolar(application.camera.position).elevation < 1.4) {
                    actions.rotateCameraY(10 / 360);
                }
            }
            if (keyboard.pressed('d')) {
                actions.rotateCameraX(-10 / 360);
            }
            if (keyboard.pressed('s')) {
                if (util.cartesianToPolar(application.camera.position).elevation > -1.4) {
                    actions.rotateCameraY(-10 / 360);
                }
            }
            if (keyboard.pressed('a')) {
                actions.rotateCameraX(10 / 360);
            }
            application.controls.update();
            application.earth.rotateY(1/360);
            application.skybox.lookAt(application.light.position);
            application.clouds.forEach(function(r){
                r.mesh.rotateY(r.y);
                r.mesh.rotateX(r.x);
            });
        }

        requestAnimationFrame(update);
    }
};

$(document).ready(application.main);
