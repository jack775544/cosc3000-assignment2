/**
 * This namespace deals with actions in the scene.
 * If a function does something (eg. move a thing) then it belongs here
 */
var actions = {
    /**
     * Moves an object in a random direction
     * @param object The object to be moved
     */
    randomMove: function (object) {
        var x = Math.random() * 2 - 1;
        var y = Math.random() * 2 - 1;
        var z = Math.random() * 2 - 1;
        if (x > 0 || object.position.x < -100) {
            object.position.x += 1
        } else if (x < 0 || object.position.x > 100) {
            object.position.x -= 1
        }
        if (y > 0 || object.position.y < -100) {
            object.position.y += 1
        } else if (y < 0 || object.position.y > 100) {
            object.position.y -= 1
        }
        if (z > 0 || object.position.z < -400) {
            object.position.z += 1
        } else if (z < 0 || object.position.z > -300) {
            object.position.z -= 1
        }
    },

    /**
     * Moves the camera to the position of the new coords and looks at the earth again
     */
    moveCamera: function(coords) {
        application.camera.position.x = coords.x;
        application.camera.position.y = coords.y;
        application.camera.position.z = coords.z;
        application.camera.lookAt(application.earth.position);

        /*application.light.position.x = application.camera.position.x;
        application.light.position.y = application.camera.position.y;
        application.light.position.z = application.camera.position.z;
        application.light.lookAt(application.earth.position);*/
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
    },
    
    keyDown: function (event) {
        /*switch (event.keyCode) {
            case 40:
            case 83:
                // Down
                console.log('down');
                if (util.cartesianToPolar(application.camera.position).elevation > -1.4) {
                    actions.rotateCameraY(-10 / 360);
                }
                break;
            case 38:
            case 87:
                // Up
                console.log('up');
                if (util.cartesianToPolar(application.camera.position).elevation < 1.4) {
                    actions.rotateCameraY(10 / 360);
                }
                break;
            case 37:
            case 65:
                // Right
                actions.rotateCameraX(10/360);

                break;
            case 39:
            case 68:
                // Left
                actions.rotateCameraX(-10/360);
                break;
            case 81:
                // q - zoom in
                //if (util.cartesianToPolar(application.camera.position).r > 230) {
                    actions.zoomCamera(-10);
                //}
                break;
            case 69:
                // e - zoom out
                if (util.cartesianToPolar(application.camera.position).r < 700) {
                    actions.zoomCamera(10);
                }
                break;
        }*/
    }
};
