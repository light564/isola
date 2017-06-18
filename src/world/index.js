import {
    AmbientLight    
} from 'three';

import loadModel from '../tool/loadModel';
import {scene} from '../game';

let initWorld = function(){
    loadModel('island1_base', '/src/model/island1').then(function(object){
        console.log(object.position);
    });

    var light = new AmbientLight( 0xFFFFFF ); // soft white light
    scene.add( light );
};

export {
    initWorld
};