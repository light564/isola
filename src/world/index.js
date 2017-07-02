import {
    Group,
    BackSide,
    Color,
    Vector3,
    AmbientLight,
    PointLight,
    DirectionalLight,
    HemisphereLight,
    Mesh,
    ShaderMaterial,
    SphereGeometry
} from 'three';

import loadModel from '../tool/loadModel';
import {scene} from '../game';
import {addGroup} from '../tool/group';

import {skyShader} from './shaders';

let initWorld = function(){
    initLight();
    initSky();
    loadModel('dolphin', '/src/model/dolphin').then(function(object){
        object.position.set(0, 0, 0);
        console.log(object.position);
    });
};

let initLight = function(){

    var ambientLight = new AmbientLight( 0xFFFFFF );
    addGroup('ambientLight', ambientLight);

    var directionalLight1 = new DirectionalLight( 0xFFFFFF );
    var directionalLight2 = new DirectionalLight( 0xFFFFFF );
    var directionalLight3 = new DirectionalLight( 0xFFFFFF );
    directionalLight1.position.set( 0, 0, 1 ).normalize();
    directionalLight2.position.set( 0, 1, 0 ).normalize();
    directionalLight3.position.set( 1, 0, 0 ).normalize();
    addGroup('directionalLight', directionalLight1, directionalLight2, directionalLight3);
};

let initSky = function(){
    let uniforms = {
        topColor:    { value: new Color( 0x40ADCE ) },
        bottomColor: { value: new Color( 0x607CB2 ) },
        offset:      { value: 0 },
        exponent:    { value: 0.6 }
    };

    let skyGeo = new SphereGeometry(200, 32, 15);
    let skyMat = new ShaderMaterial({
        vertexShader: skyShader.vertex,
        fragmentShader: skyShader.fragment,
        uniforms: uniforms,
        side: BackSide
    });

    // scene.fog.color.copy( uniforms.bottomColor.value );

    let sky = new Mesh(skyGeo, skyMat);
    scene.add(sky);
};

export {
    initWorld
};