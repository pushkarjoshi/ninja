/* <copyright>
 This file contains proprietary software owned by Motorola Mobility, Inc.<br/>
 No rights, expressed or implied, whatsoever to this software are provided by Motorola Mobility, Inc. hereunder.<br/>
 (c) Copyright 2011 Motorola Mobility, Inc.  All Rights Reserved.
 </copyright> */

var PulseMaterial = require("js/lib/rdge/materials/pulse-material").PulseMaterial;

///////////////////////////////////////////////////////////////////////
// Class GLMaterial
//      RDGE representation of a material.
///////////////////////////////////////////////////////////////////////
var WaterMaterial = function WaterMaterial() {
    ///////////////////////////////////////////////////////////////////////
    // Instance variables
    ///////////////////////////////////////////////////////////////////////
	this._name = "WaterMaterial";
	this._shaderName = "water";

	this._texMap = 'assets/images/rocky-normal.jpg';

	this._time = 0.0;
	this._dTime = 0.01;

    ///////////////////////////////////////////////////////////////////////
    // Properties
    ///////////////////////////////////////////////////////////////////////
	// all defined in parent PulseMaterial.js
	// load the local default value
	this._propValues[ this._propNames[0] ] = this._texMap.slice(0);

    ///////////////////////////////////////////////////////////////////////
    // Methods
    ///////////////////////////////////////////////////////////////////////
	// duplcate method requirde
	this.dup = function( world ) {
		// allocate a new uber material
		var newMat = new WaterMaterial();

		// copy over the current values;
		var propNames = [],  propValues = [],  propTypes = [],  propLabels = [];
		this.getAllProperties( propNames,  propValues,  propTypes,  propLabels);
		var n = propNames.length;
		for (var i=0;  i<n;  i++)
			newMat.setProperty( propNames[i], propValues[i] );

		return newMat;
	};

	this.init = function( world ) {
		// save the world
		if (world)  this.setWorld( world );

		// set up the shader
		this._shader = new jshader();
		this._shader.def = waterMaterialDef;
		this._shader.init();

		// set up the material node
		this._materialNode = createMaterialNode("waterMaterial" + "_" + world.generateUniqueNodeID());
		this._materialNode.setShader(this._shader);

		this._time = 0;
		if (this._shader && this._shader['default']) {
			this._shader['default'].u_time.set( [this._time] );
        }

		// set the shader values in the shader
		this.updateTexture();
		this.setResolution( [world.getViewportWidth(),world.getViewportHeight()] );
		this.update( 0 );
	}
};

///////////////////////////////////////////////////////////////////////////////////////
// RDGE shader
 
// shader spec (can also be loaded from a .JSON file, or constructed at runtime)
var waterMaterialDef =
{'shaders': 
	{
		'defaultVShader':"assets/shaders/Basic.vert.glsl",
		'defaultFShader':"assets/shaders/Water2.frag.glsl"
	},
	'techniques':
	{ 
		'default':
		[
			{
				'vshader' : 'defaultVShader',
				'fshader' : 'defaultFShader',
				// attributes
				'attributes' :
				{
					'vert'  :   { 'type' : 'vec3' },
					'normal' :  { 'type' : 'vec3' },
					'texcoord'  :   { 'type' : 'vec2' }
				},
				// parameters
				'params' : 
				{
					'u_tex0': { 'type' : 'tex2d' },
					'u_time' : { 'type' : 'float' },
					'u_resolution'  :   { 'type' : 'vec2' }
				},

				// render states
				'states' : 
				{
					'depthEnable' : true,
					'offset':[1.0, 0.1]
				}
			}
		]
	}
};

WaterMaterial.prototype = new PulseMaterial();

if (typeof exports === "object") {
    exports.WaterMaterial = WaterMaterial;
}




