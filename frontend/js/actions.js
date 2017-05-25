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
            case 37:
                // Right
                earth.rotateY(Math.PI / (360 + 5));
                console.log("Right");
                break;
            case 38:
                // Down
                earth.rotateX(Math.PI / (360 + 5));
                console.log("Down");
                break;
            case 39:
                // Left
                earth.rotateY(-Math.PI / (360 - 5));
                camera.lookAt(earth.position);
                console.log("Left");
                break;
            case 40:
                // Up
                earth.rotateX(-Math.PI / (360 + 5));
                console.log("Up");
                break;
        }
    }
};
