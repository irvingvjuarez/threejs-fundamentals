import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { renderer } from './renderer';
import { makeInstance } from './makeInstance';
import { render, requestRenderIfNotRequested } from './render';
import { camera } from './camera';
import { scene } from './scene';

export function setup() {
    // Creating a scene
    document.body.appendChild(renderer.domElement);
    let renderRequested = false;
    
    // Adding cubes to the scene
    const defaultConfig = {
        handlerChange: () => requestRenderIfNotRequested(renderRequested)
    }
    const greenCube = makeInstance({ 
        ...defaultConfig,
        instanceName: 'Green Cube', 
        color: 0x44aa88, 
        x: 0
    });
    const whiteCube = makeInstance({
        ...defaultConfig,
        instanceName: 'White Cube',
        color: 0x8844aa,
        x: 3
    });
    const blackCube = makeInstance({
        ...defaultConfig,
        instanceName: 'Black Cube',
        color: 0xaa8844,
        x: -3
    })

    const cubes = [greenCube, whiteCube, blackCube];
    cubes.forEach(cube => scene.add(cube));

    // Camera setup
    camera.position.set(0,0,15);
    camera.lookAt(0,0,0);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0,0,0);
    controls.update();
    controls.enableDamping = true;

    // Adding a light
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
    
    // Rendering the whole scene
    render(renderRequested);

    // Event listeners - Rendering on demand
    controls.addEventListener('change', () => requestRenderIfNotRequested(renderRequested));
    window.addEventListener('resize', () => requestRenderIfNotRequested(renderRequested));
}
