import {
    Group
} from 'three';

import {scene} from '../game';

let groupMap = {};

let addGroup = function(name, ...args){
    if(!groupMap.hasOwnProperty(name)){
        groupMap[name] = new Group();
        scene.add(groupMap[name]);
    }

    args.forEach((item) => {
        groupMap[name].add(item);
    });
};

let removeGroup = function(name){
    if(groupMap.hasOwnProperty(name)){
        removeGroupInScene(name);
        delete groupMap[name];
    }
};

let getGroup = function(name){
    if(groupMap.hasOwnProperty(name)){
        return groupMap[name];    
    }
    
    console.error('get error group: ', name);
};

let addGroupInScene = function(name){
    if(groupMap.hasOwnProperty(name)){
        scene.add(groupMap[name]);
    }
};

let removeGroupInScene = function(name){
    if(groupMap.hasOwnProperty(name)){
        scene.remove(groupMap[name]);
    }
};

export {
    addGroup,
    getGroup,
    removeGroup,
    addGroupInScene,
    removeGroupInScene
};