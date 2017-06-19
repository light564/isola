import Stats from 'stats.js';
import {
    PerspectiveCamera,
    WebGLRenderer,
    Scene,
    Vector3,
    Fog,
    FogExp2
} from 'three';

import {initWorld} from './world';
import OrbitControls from './controls/orbitControls';

let stats;
let renderer;
let camera;
let scene;

let initStats = function(){
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
};

let initCanvas = function(){
    renderer = new WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    // 设置背景色
    renderer.setClearColor(0xFFFFFF, 1);
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
    render();
};

export {
    scene,
    camera,
    initGame
};