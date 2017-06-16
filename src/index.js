import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    Vector3,
    LineBasicMaterial,
    Geometry,
    Line
} from 'three';

import Stats from 'stats.js';


let stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

let renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 100);
camera.lookAt(new Vector3(0, 0, 0));

let scene = new Scene();

let material = new LineBasicMaterial({ color: 0x0000ff });
let geometry = new Geometry();
geometry.vertices.push(new Vector3(-10, 0, 0));
geometry.vertices.push(new Vector3(0, 10, 0));
geometry.vertices.push(new Vector3(10, 0, 0));

let line = new Line(geometry, material);
scene.add(line);

function render() {
    stats.begin();
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    stats.end();
}
render();