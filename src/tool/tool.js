import {MaterialCreator} from '../lib/loaders/MTLLoader';

import {
    addGroup,
    removeGroup,
    getGroup
} from './group';

import {
    Color,
    Mesh,
    DefaultLoadingManager,

    MeshBasicMaterial,
    MeshPhongMaterial,
    MeshLambertMaterial
} from 'three';

function setModelMaterials(modelName, materialInfo){
    let model = getGroup(`obj-${modelName}`);
    while(model.type === 'Group'){
        model = model.children[0];
    }

    let info = materialInfo[Object.keys(materialInfo)[0]];
    let type = info.material;
    let params = {};
    let material;

    Object.keys(info).forEach((k) => {
        let value = info[k];

        if(value === ''){
            return;
        }

        switch (k.toLowerCase()){
            case 'kd':
                // Diffuse color (color under white light) using RGB values
                params.color = new Color().fromArray( value );
                break;
            case 'ks':
                // Specular color (color when light is reflected from shiny surface) using RGB values
                params.specular = new Color().fromArray( value );
                break;
            case 'ns':
                // The specular exponent (defines the focus of the specular highlight)
                // A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.
                params.shininess = parseFloat( value );
                break;
            case 'd':
                if ( value < 1 ) {
                    params.opacity = value;
                    params.transparent = true;
                }
                break;
            case 'Tr':
                if ( value > 0 ) {
                    params.opacity = 1 - value;
                    params.transparent = true;
                }
                break;
            default:
                break;
        }
    });

    if(type === 'MeshPhongMaterial'){
        material = new MeshPhongMaterial(params);
    }
    else if(type === 'MeshBasicMaterial'){
        material = new MeshBasicMaterial(params);
    }
    else if(type === 'MeshLambertMaterial'){
        material = new MeshLambertMaterial(params);
    }

    let geometry = model.geometry.clone();
    // let material = model.material.clone();
    model = new Mesh(geometry, material);
    // model = new Mesh(geometry, material);

    removeGroup(`obj-${modelName}`);
    addGroup(`obj-${modelName}`, model);

    return model;
};

export {
    setModelMaterials
}