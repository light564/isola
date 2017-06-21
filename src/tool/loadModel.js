import OBJLoader from '../lib/loaders/OBJLoader';
import MTLLoader from '../lib/loaders/MTLLoader';
import DDSLoader from '../lib/loaders/DDSLoader';
import {scene} from '../game';
import {
    JSONLoader,
    MeshFaceMaterial,
    Mesh
} from 'three';

// console.log(DDSLoader);

export default function loadModel(modelName, modelPath){
    let obj = `${modelName}.obj`;
    let mtl = `${modelName}.mtl`;

    let mtlLoader = new MTLLoader();

    let onProgress = function(){};

    // Loader.Handlers.add( /\.dds$/i, new DDSLoader() );

    return new Promise(function(resolve, reject){
        mtlLoader.load(`${modelPath}/${mtl}`, function(materials){
            materials.preload();

            let objLoader = new OBJLoader();
            objLoader.setMaterials( materials );

            objLoader.load(`${modelPath}/${obj}`,
                function ( object ) {
                    // let material = new MeshFaceMaterial(materials);
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

// export default function loadModel(modelName, modelPath){
//     let dataSource = `${modelName}.json`;

//     let jsonLoader = new JSONLoader();

//     let onProgress = function(){};

//     // Loader.Handlers.add( /\.dds$/i, new DDSLoader() );

//     return new Promise(function(resolve, reject){
//         jsonLoader.load(`${modelPath}/${dataSource}`, function(geometry, materials){
//             let material = new MeshFaceMaterial(materials);
//             let model = new Mesh( geometry, material );
//             scene.add( model );

//             resolve(model);
//         });
//     });
// };