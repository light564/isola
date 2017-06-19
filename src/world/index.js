import {
    Vector3,
    AmbientLight,
    PointLight,
    DirectionalLight,
    HemisphereLight
} from 'three';

import loadModel from '../tool/loadModel';
import {scene} from '../game';

let initWorld = function(){
    initLight();

    loadModel('island1_base', '/src/model/island1').then(function(object){
        object.position.set(0, 0, 0);
        console.log(object.position);
    });
};

let initLight = function(){
    // var ambientLight = new AmbientLight( 0xFFFFFF );
    // scene.add( ambientLight );

    // var pointLight = new PointLight( 0xFFFFFF, 1, 100 );
    // pointLight.position.set( 0, 0, 0 );
    // scene.add( pointLight );

    var directionalLight = new DirectionalLight( 0xFFFFFF, 0.5 );
    directionalLight.position.set(1, 1, 0);
    scene.add( directionalLight );

    // var hemisphereLight = new HemisphereLight( 0x40ADCE, 0x607CB2, 1 );
    // scene.add( hemisphereLight );
};

export {
    initWorld
};