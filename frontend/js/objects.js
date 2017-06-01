/**
 * Methods dealing with constructing meshes
 * If something needs to be made in a general way, this is the spot
 */
var construct = {

    /**
     * Create a sphere
     */
    sphere: function (args) {
        var default_args = {
            radius: 50,
            segments: 16,
            rings: 16,
            material: new THREE.MeshLambertMaterial({
                color: 0xCC0000
            })
        };
        var sphere_args = $.extend(default_args, args);
        var mesh = new THREE.Mesh(
            new THREE.SphereGeometry(
                sphere_args.radius,
                sphere_args.segments,
                sphere_args.rings
            ),
            sphere_args.material
        );
        application.objects.push(mesh);
        return mesh;
    },

    skybox: function(){
        var urls = [
            'texture/skybox/x+.jpg',
            'texture/skybox/x-.jpg',
            'texture/skybox/y+.jpg',
            'texture/skybox/y-.jpg',
            'texture/skybox/z-.jpg',
            'texture/skybox/z+.jpg'
        ];
        var texture_cube = THREE.ImageUtils.loadTextureCube(urls);
        texture_cube.format = THREE.RGBFormat;

        var shader = THREE.ShaderLib['cube'];
        shader.uniforms['tCube'].value = texture_cube; // Assign textures.

        var sky_material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        });

        var skybox_dimensions = 3e4;
        return new THREE.Mesh(
            new THREE.BoxGeometry(skybox_dimensions, skybox_dimensions, skybox_dimensions),
            sky_material
        );
    }
};