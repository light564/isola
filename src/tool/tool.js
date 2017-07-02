import {MaterialCreator} from '../lib/loaders/MTLLoader';

import {
    addGroup,
    removeGroup,
    getGroup
} from './group';

import {
    Mesh,
    DefaultLoadingManager
} from 'three';

function setModelMaterials(modelName, materialInfo){
    let model = getGroup(`obj-${modelName}`);
    while(model.type === 'Group'){
        model = model.children[0];
    }
    let materialCreator = new MaterialCreator();
    materialCreator.setCrossOrigin();
    materialCreator.setManager(DefaultLoadingManager);
    materialCreator.setMaterials(materialInfo);
    materialCreator.preload();

    let material = materialCreator.create('Material.022');

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