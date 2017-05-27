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
    }
};