import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { ASPECT, FAR_NUMBER, FIELD_OF_VIEW, NEAR_NUMBER } from '../globals/constants';
import { createCube } from './createCube';
import { makeInstance } from './makeInstance';
import { animate } from './render';
import { resizeRenderer } from './resizeRenderer';

export function setup(canvasComponent) {
    // Creating a scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        FIELD_OF_VIEW,
        ASPECT, 
        NEAR_NUMBER,
        FAR_NUMBER
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasComponent });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // GUI
    const gui = new GUI();
    
    // Adding cubes to the scene
    const defaultConfig = {
        gui,
        handlerChange: requestRenderIfNotRequested
    }
    // const greenCube = createCube({ color: 0x44aa88 });
    const greenCube = makeInstance({ 
        ...defaultConfig,
        instanceName: 'Green Cube', 
        color: 0x44aa88, 
        x: 0
    });
    // const whiteCube = createCube({ x: 3, color: 0x8844aa });
    const whiteCube = makeInstance({
        ...defaultConfig,
        instanceName: 'White Cube',
        color: 0x8844aa,
        x: 3
    });
    // const blackCube = createCube({ x: -3, color: 0xaa8844 });
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
    let renderRequested = false;

    function render() {
        renderRequested = false;

        if (resizeRenderer(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
    }
    render();

    function requestRenderIfNotRequested() {
        if (renderRequested === false) {
            renderRequested = true;
            requestAnimationFrame(render);
        }
    }

    // Event listeners - Rendering on demand
    controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener('resize', requestRenderIfNotRequested);

    // animate(renderer, () => {
    //     renderer.render(scene, camera);

    //     if (resizeRenderer(renderer)) {
    //         const canvas = renderer.domElement;
    //         camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //         camera.updateProjectionMatrix();
    //     }
        
    //     // Rotating the cubes
    //     cubes.forEach((cube, index) => {
    //         cube.rotation.x += (0.01 + (index / 100));
    //         cube.rotation.y += (0.01 + (index / 100));
    //     });
    // });
}
