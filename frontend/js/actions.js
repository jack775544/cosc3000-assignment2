/**
 * This namespace deals with actions in the scene.
 * If a function does something (eg. move a thing) then it belongs here
 */
var actions = {
    /**
     * Moves the camera to the position of the new coords and looks at the earth again
     */
    moveCamera: function(coords) {
        application.camera.position.x = coords.x;
        application.camera.position.y = coords.y;
        application.camera.position.z = coords.z;
        application.camera.lookAt(application.earth.position);
    },

    moveLight: function(angle){
        var coords = util.cartesianToPolar(application.light.position);
        coords.polar += angle;
        var newCoords = util.polarToCartesian(coords);
        application.light.position.y = newCoords.y;
        application.light.position.x = newCoords.x;
        application.light.position.z = newCoords.z;
    },

    rotateCameraX: function(angle){
        var coords = util.cartesianToPolar(application.camera.position);
        coords.polar += angle;
        var newCoords = util.polarToCartesian(coords);
        actions.moveCamera(newCoords);
    },

    rotateCameraY: function(angle){
        var coords = util.cartesianToPolar(application.camera.position);
        coords.elevation += angle;
        var newCoords = util.polarToCartesian(coords);
        actions.moveCamera(newCoords);
    },

    zoomCamera: function(distance){
        var coords = util.cartesianToPolar(application.camera.position);
        coords.r += distance;
        var newCoords = util.polarToCartesian(coords);
        actions.moveCamera(newCoords);
    }
};
