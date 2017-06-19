import {
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

import {skyShader} from './shaders';

let initWorld = function(){
    initLight();
    initSky();
    loadModel('island1_base', '/src/model/island1').then(function(object){
        object.position.set(0, 0, 0);
        console.log(object.position);
    });
};

let initLight = function(){
    var ambientLight = new AmbientLight( 0xFFFFFF );
    scene.add( ambientLight );

    // var pointLight = new PointLight( 0xFFFFFF, 1, 100 );
    // pointLight.position.set( 0, 0, 0 );
    // scene.add( pointLight );

    // var directionalLight = new DirectionalLight( 0xFFFFFF, 0.5 );
    // directionalLight.position.set(1, 1, 0);
    // scene.add( directionalLight );

    // let hemiLight = new HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    // hemiLight.color.setHSL( 0.6, 1, 0.6 );
    // hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    // hemiLight.position.set( 0, 500, 0 );
    // scene.add( hemiLight );
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