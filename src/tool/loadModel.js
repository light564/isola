import OBJLoader from '../lib/loaders/OBJLoader';
import MTLLoader from '../lib/loaders/MTLLoader';
import {scene} from '../game';

export default function loadModel(modelName, modelPath){
    let obj = `${modelName}.obj`;
    let mtl = `${modelName}.mtl`;

    let mtlLoader = new MTLLoader();

    let onProgress = function(){};

    return new Promise(function(resolve, reject){
        mtlLoader.load(`${modelPath}/${mtl}`, function(materials){
            materials.preload();

            let objLoader = new OBJLoader();
            objLoader.setMaterials( materials );

            objLoader.load(`${modelPath}/${obj}`,
                function ( object ) {
                    scene.add( object );
                    resolve(object);
                },
                onProgress,
                function(){
                    console.log(`loader ${obj} error`);
                }
            );
        }, 
        onProgress,
        function(){
            console.log(`loader ${mtl} error`);
        });
    });
};