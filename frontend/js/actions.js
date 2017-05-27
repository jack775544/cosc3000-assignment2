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

    rotateCameraX: function(angle){
        var coords = util.cartesianToPolar(application.camera.position);
        coords.polar += angle;
        var newCoords = util.polarToCartesian(coords);
        application.camera.position.x = newCoords.x;
        application.camera.position.y = newCoords.y;
        application.camera.position.z = newCoords.z;
        application.camera.lookAt(application.earth.position);

        application.light.position.x = application.camera.position.x;
        application.light.position.y = application.camera.position.y;
        application.light.position.z = application.camera.position.z;
        application.light.lookAt(application.earth.position);
    },

    rotateCameraY: function(angle){
        var coords = util.cartesianToPolar(application.camera.position);
        coords.elavation += angle;
        var newCoords = util.polarToCartesian(coords);
        application.camera.position.x = newCoords.x;
        application.camera.position.y = newCoords.y;
        application.camera.position.z = newCoords.z;
        application.camera.lookAt(application.earth.position);

        application.light.position.x = application.camera.position.x;
        application.light.position.y = application.camera.position.y;
        application.light.position.z = application.camera.position.z;
        application.light.lookAt(application.earth.position);
    },

    zoomCamera: function(distance){
        var coords = util.cartesianToPolar(application.camera.position);
        coords.r += distance;
        var newCoords = util.polarToCartesian(coords);
        application.camera.position.x = newCoords.x;
        application.camera.position.y = newCoords.y;
        application.camera.position.z = newCoords.z;
        application.camera.lookAt(application.earth.position);

        application.light.position.x = application.camera.position.x;
        application.light.position.y = application.camera.position.y;
        application.light.position.z = application.camera.position.z;
        application.light.lookAt(application.earth.position);
    },
    
    keyDown: function (event) {
        switch (event.keyCode) {
            case 40:
            case 83:
                // Up
                actions.rotateCameraY(10/360);
                break;
            case 38:
            case 87:
                // Down
                actions.rotateCameraY(-10/360);
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
                // q
                action.zoomCamera(-10);
                break;
            case 69:
                // e
                action.zoomCamera(10);
                break;
            case 82:
                // r
                /*if (application.earth.position.z < -300) {
                    application.earth.position.z += 5;
                }*/
                break;
            case 84:
                // t
                /*if (application.earth.position.z > -550) {
                    application.earth.position.z += -5;
                }*/
                break;
        }
    }
};
