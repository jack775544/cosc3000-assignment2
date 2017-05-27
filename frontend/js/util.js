var util = {
    /**
     * Converts a position object of the form {x, y, z} to a polar object
     * of form {r, theta, phi}
     * @param position A position object in the form {x, y, z}
     * @return Object A position object in the form {r, theta, phi}
     */
    cartesianToPolar: function (position) {
        var x = position.x;
        var y = position.y;
        var z = position.z;
        /*var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
        var theta = Math.acos(z / r);
        var phi = Math.atan2(y, x);
         return {r: r, theta: theta, phi: phi}
         */
        if (x === 0) {
            x = Number.EPSILON;
        }
        var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
        var polar = Math.atan2(z, x);
        if (x < 0) {
            polar += Math.PI;
        }
        var elevation = Math.asin(y / r);
        return {r: r, polar: polar, elevation: elevation}
    },

    /**
     * Converts a position of the form {r, theta, phi} to the form {x, y, z}
     * @param position A position object in the form {t, theta, phi}
     * @return Object A position object in the form {x, y, z}
     */
    polarToCartesian: function(position) {
        /*var r = position.r;
        var theta = position.theta;
        var phi = position.phi;
        var x = r * Math.sin(phi) * Math.cos(theta);
        var y = r * Math.sin(phi) * Math.sin(theta);
        var z = r * Math.cos(phi);
        return {x: x , y: y, z: z}*/
        var polar = position.polar;
        var r = position.r;
        var elevation = position.elevation;
        var a = r * Math.cos(elevation);
        var x = a * Math.cos(polar);
        var y = r * Math.sin(elevation);
        var z = a * Math.sin(polar);
        return {x: x , y: y, z: z}
    }
};
