import Stats from 'stats.js';
import {GUI} from 'dat.gui';
import {
    PerspectiveCamera,
    WebGLRenderer,
    Scene,
    Vector3,
    Fog,
    FogExp2,
    Mesh
} from 'three';

import {initWorld} from './world';
import OrbitControls from './controls/orbitControls';

import {
    getGroup,
    removeGroup,
    addGroupInScene,
    removeGroupInScene
} from './tool/group';

import {
    setModelMaterials
} from './tool/tool';

let stats;
let renderer;
let camera;
let scene;

let initStats = function(){
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
};

let initDebugBoard = function(){
    let materialsInfo = {
        'Material.022': {
            'name': 'Material.022',
            'ns': '30',
            'ka': [
                0.64,
                0.64,
                0.64
            ],
            'kd': [
                0.115303,
                0.365129,
                0.446672
            ],
            'ks': [
                0.05,
                0.05,
                0.05
            ],
            'ke': '1.000000 1.000000 1.000000',
            'ni': '1.000000',
            'd': '1.000000'
        }
    };

    let renderModel = function(name, value){
        name = name.toLowerCase();
        if(name === 'ns'){
            materialsInfo['Material.022'].ns = value.toString();
        }
        else if(name === 'ni'){
            materialsInfo['Material.022'].ni = value.toString();
        }
        else if(name === 'd'){
            materialsInfo['Material.022'].d = value.toString();
        }
        else if(name === 'kax'){
            materialsInfo['Material.022'].ka[0] = value;
        }
        else if(name === 'kay'){
            materialsInfo['Material.022'].ka[1] = value;
        }
        else if(name === 'kaz'){
            materialsInfo['Material.022'].ka[2] = value;
        }
        else if(name === 'kdx'){
            materialsInfo['Material.022'].kd[0] = value;
        }
        else if(name === 'kdy'){
            materialsInfo['Material.022'].kd[1] = value;
        }
        else if(name === 'kdz'){
            materialsInfo['Material.022'].kd[2] = value;
        }
        else if(name === 'ksx'){
            materialsInfo['Material.022'].ks[0] = value;
        }
        else if(name === 'ksy'){
            materialsInfo['Material.022'].ks[1] = value;
        }
        else if(name === 'ksz'){
            materialsInfo['Material.022'].ks[2] = value;
        }
        else if(name === 'kex'){
            let ke = materialsInfo['Material.022'].ke.split(' ');
            ke[0] = value;
            materialsInfo['Material.022'].ke = ke.join(' ');
        }
        else if(name === 'key'){
            let ke = materialsInfo['Material.022'].ke.split(' ');
            ke[1] = value;
            materialsInfo['Material.022'].ke = ke.join(' ');
        }
        else if(name === 'kez'){
            let ke = materialsInfo['Material.022'].ke.split(' ');
            ke[2] = value;
            materialsInfo['Material.022'].ke = ke.join(' ');
        }

        console.log(materialsInfo);

        setModelMaterials('dolphin', materialsInfo);
    };

    let setting = {
        ambientLight: true,
        directionalLight: true,
        Kax: 0.64,
        Kay: 0.64,
        Kaz: 0.64,
        Kdx: 0.115303,
        Kdy: 0.365129,
        Kdz: 0.446672,
        Ksx: 0.05,
        Ksy: 0.05,
        Ksz: 0.05,
        Kex: 1.0,
        Key: 1.0,
        Kez: 1.0,
        d: 1.0,
        Ni: 1.0,
        Ns: 30
    };
    let menuDiv = document.querySelector('#dat');
    let gui = new GUI({
        autoPlace: false,
        width: 320
    });

    menuDiv.appendChild(gui.domElement);

    menuDiv.addEventListener( 'mousedown', function(e){
        e.stopPropagation();
        e.preventDefault();
        return false;
    }, false );
    menuDiv.addEventListener( 'mousemove', function(e){
        return false;
    }, false );
    menuDiv.addEventListener( 'mouseup', function(e){
        return false;
    }, false );

    let lightOptions = gui.addFolder('光照');
    lightOptions.add(setting, 'ambientLight').name('环境光').onChange((v) => {
        return v ? addGroupInScene('ambientLight') : removeGroupInScene('ambientLight');
    });
    lightOptions.add(setting, 'directionalLight').name('平行光').onChange((v) => {
        return v ? addGroupInScene('directionalLight') : removeGroupInScene('directionalLight');
    });
    lightOptions.open();
    let materialOptions = gui.addFolder('材质');
    materialOptions.add(setting, 'd', 0.0, 1.0, 0.1).name('d(溶解度)').onChange(renderModel.bind(window, 'd'));
    materialOptions.add(setting, 'Ni', 0.0, 1.0, 0.04).name('Ni(折射率)').onChange(renderModel.bind(window, 'ni'));
    materialOptions.add(setting, 'Ns', 0, 300, 1).name('Ns(反射高光度)').onChange(renderModel.bind(window, 'ns'));
    let kaOptions = materialOptions.addFolder('Ka(环境光属性)');
    let kdOptions = materialOptions.addFolder('Kd(漫反射属性)');
    let ksOptions = materialOptions.addFolder('Ks(镜面反射系数)');
    let keOptions = materialOptions.addFolder('Ke(材质放射颜色)');
    kaOptions.add(setting, 'Kax', 0.0, 1.0, 0.01).name('X').onChange(renderModel.bind(window, 'kax'));
    kaOptions.add(setting, 'Kay', 0.0, 1.0, 0.01).name('Y').onChange(renderModel.bind(window, 'kay'));
    kaOptions.add(setting, 'Kaz', 0.0, 1.0, 0.01).name('Z').onChange(renderModel.bind(window, 'kaz'));
    kdOptions.add(setting, 'Kdx', 0.0, 1.0, 0.01).name('X').onChange(renderModel.bind(window, 'kdx'));
    kdOptions.add(setting, 'Kdy', 0.0, 1.0, 0.01).name('Y').onChange(renderModel.bind(window, 'kdy'));
    kdOptions.add(setting, 'Kdz', 0.0, 1.0, 0.01).name('Z').onChange(renderModel.bind(window, 'kdz'));
    ksOptions.add(setting, 'Ksx', 0.0, 1.0, 0.01).name('X').onChange(renderModel.bind(window, 'ksx'));
    ksOptions.add(setting, 'Ksy', 0.0, 1.0, 0.01).name('Y').onChange(renderModel.bind(window, 'ksy'));
    ksOptions.add(setting, 'Ksz', 0.0, 1.0, 0.01).name('Z').onChange(renderModel.bind(window, 'ksz'));
    keOptions.add(setting, 'Kex', 0.0, 1.0, 0.01).name('X').onChange(renderModel.bind(window, 'kex'));
    keOptions.add(setting, 'Key', 0.0, 1.0, 0.01).name('Y').onChange(renderModel.bind(window, 'key'));
    keOptions.add(setting, 'Kez', 0.0, 1.0, 0.01).name('Z').onChange(renderModel.bind(window, 'kez'));
    materialOptions.open();
};

let initCanvas = function(){
    renderer = new WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    // 设置背景色
    // renderer.setClearColor(0xFFFFFF, 1);
    document.body.appendChild( renderer.domElement );
};

let initCamera = function(){
    camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 0, 50);
    camera.lookAt(new Vector3(0, 0, 0));
};

let initScene = function(){
    scene = new Scene();
    // 雾？
    // scene.fog = new FogExp2( 0xFFFFFF, 0.01 );
    // scene.fog.color.setHSL( 0.6, 0, 1 );
};

let initControl = function(){
    let orb = new OrbitControls( camera, render.domElement );
};

let render = function(){
    stats.begin();
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    stats.end();
};

let initGame = function(){
    initStats();
    initCanvas();
    initCamera();
    initScene();
    initWorld();
    initControl();
    initDebugBoard(); 
    render();
};

export {
    scene,
    camera,
    initGame
};