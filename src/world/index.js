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
    var ambientLight = new AmbientLight( 0xCCCCCC );
    scene.add( ambientLight );

    var directionalLight1 = new DirectionalLight( 0xCCCCCC );
    var directionalLight2 = new DirectionalLight( 0xCCCCCC );
    var directionalLight3 = new DirectionalLight( 0xCCCCCC );
    directionalLight1.position.set( 0, 0, 1 ).normalize();
    directionalLight2.position.set( 0, 1, 0 ).normalize();
    directionalLight3.position.set( 1, 0, 0 ).normalize();
    scene.add( directionalLight1 );
    scene.add( directionalLight2 );
    scene.add( directionalLight3 );

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