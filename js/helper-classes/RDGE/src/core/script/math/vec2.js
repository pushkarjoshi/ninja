/* <copyright>
This file contains proprietary software owned by Motorola Mobility, Inc.<br/>
No rights, expressed or implied, whatsoever to this software are provided by Motorola Mobility, Inc. hereunder.<br/>
(c) Copyright 2011 Motorola Mobility, Inc.  All Rights Reserved.
</copyright> */


/**
* RDGE.vec2 = {}
* This library contains functions for operating on 2D vectors. 
* A 2D vector can be any array containing at least 2 numeric components.  
* All of the following are valid methods for declaring a RDGE.vec2:
*		var a = [0, 1];
*		var b = RDGE.vec2.zero();
*		var c = RDGE.vec2.up();
*/
var RDGE = RDGE || {};
RDGE.vec2 = {};

/**
* RDGE.vec2.string
*/
RDGE.vec2.string = function (v) {
    return "{ " + v[0] + ", " + v[1] + " }";
};

/**
* RDGE.vec2.verify
* This function is provided for debugging purposes only. It is not recommended 
* to be used in performance critical areas of the code.
*/
RDGE.vec2.verify = function (v) {
    if (v == undefined || v.length == undefined || v.length < 2) {
        return false;
    }

    if (typeof (v[0]) != "number" || typeof (v[1]) != "number") {
        return false;
    }

    return true;
};

/**
* RDGE.vec2.copy
*/
RDGE.vec2.copy = function (v) {
    if (v.length == undefined) {
        return [v, v];
    }

    return [v[0], v[1]];
};

/**
* RDGE.vec2.inplace_copy
*/
RDGE.vec2.inplace_copy = function (dst, src) {
    dst[0] = src[0];
    dst[1] = src[1];
};

/**
* RDGE.vec2.zero
*/
RDGE.vec2.zero = function () {
    return [0.0, 0.0];
};

/**
* RDGE.vec2.up
*/
RDGE.vec2.up = function () {
    return [0.0, 1.0];
};

/**
* RDGE.vec2.right
*/
RDGE.vec2.right = function () {
    return [1.0, 0.0];
};

/**
* RDGE.vec2.add
*/
RDGE.vec2.add = function (a, b) {
    return [a[0] + b[0], a[1] + b[1]];
};
/**
* RDGE.vec2.sub
*/
RDGE.vec2.sub = function (a, b) {
    return [a[0] - b[0], a[1] - b[1]];
};

/**
* RDGE.vec2.mul
*/
RDGE.vec2.mul = function (a, b) {
    return [a[0] * b[0], a[1] * b[1]];
};

/**
* RDGE.vec2.addMul
*/
RDGE.vec2.addMul = function (a, b, s) {
    if (s.length != undefined && s.length >= 2) {
        return [a[0] + b[0] * s[0], a[1] + b[1] * s[1]];
    } else {
        return [a[0] + b[0] * s, a[1] + b[1] * s];
    }
};

/**
* RDGE.vec2.scale
*/
RDGE.vec2.scale = function (v, s) {
    if (s.length != undefined && s.length >= 2) {
        return [v[0] * s[0], v[1] * s[1]];
    } else {
        return [v[0] * s, v[1] * s];
    }
};

/**
* RDGE.vec2.negate
*/
RDGE.vec2.negate = function (v) {
    return [-v[0], -v[1]];
};

/**
* RDGE.vec2.normalize
*/
RDGE.vec2.normalize = function (v) {
    var l = Math.sqrt(v[0] * v[0], v[1] * v[1]);
    if (Math.abs(1.0 - l) > 0.0001) {
        var ool = 1.0 / l;
        return [v[0] * ool, v[1] * ool];
    }
    return v;
};

/**
* RDGE.vec2.dot
*/
RDGE.vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
* RDGE.vec2.perp
*/
RDGE.vec2.perp = function (a) {
    return [a[1], -a[0]];
};

/**
* RDGE.vec2.lengthSq
*/
RDGE.vec2.lengthSq = function (v) {
    return v[0] * v[0] + v[1] * v[1];
};

/**
* RDGE.vec2.length
*/
RDGE.vec2.length = function (v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
};

/**
* RDGE.vec2.min
*/
RDGE.vec2.min = function (a, b) {
    return [Math.min(a[0], b[0]), Math.min(a[1], b[1])];
};

/**
* RDGE.vec2.max
*/
RDGE.vec2.max = function (a, b) {
    return [Math.max(a[0], b[0]), Math.max(a[1], b[1])];
};

/**
* RDGE.vec2.clamp
*/
RDGE.vec2.clamp = function (v, vmin, vmax) {
    return RDGE.vec2.min(vmax, RDGE.vec2.max(v, vmin));
};