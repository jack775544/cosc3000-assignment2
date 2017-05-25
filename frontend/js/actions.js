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
    
    keyDown: function (event) {
        switch (event.keyCode) {
            case 40:
            case 83:
                // Up
                earth.rotateX(-Math.PI / (360 + 5));
                break;
            case 38:
            case 87:
                // Down
                earth.rotateX(Math.PI / (360 + 5));
                break;
            case 37:
            case 65:
                // Right
                // And code for the switch here
                earth.rotateY(Math.PI / (360 + 5));
                break;
            case 39:
            case 68:
                // Left
                earth.rotateY(-Math.PI / (360 + 5));
                camera.lookAt(earth.position);
                break;
            case 81:
                // q
                earth.rotateZ(Math.PI / (360 + 5));
                break;
            case 69:
                // e
                earth.rotateZ(-Math.PI / (360 + 5));
                break;
            case 82:
                // r
                if (earth.position.z < -300) {
                    earth.position.z += 5;
                }
                break;
            case 84:
                // t
                if (earth.position.z > -550) {
                    earth.position.z += -5;
                }
                break;
        }
    }
};
