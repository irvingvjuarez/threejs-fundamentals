import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { renderer } from '../utils/renderer';
import { render, requestRenderIfNotRequested } from '../utils/render';
import { camera } from '../utils/camera';
import { scene } from '../utils/scene';
import { gui } from '../utils/gui';

export function setup() {
    // Creating a scene
    document.body.appendChild(renderer.domElement);
    let renderRequested = false;

    // Camera setup
    camera.position.set(0,0,35);
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

    // Adding list of figures in gui
    gui.add({geometries: 'Cube'}, 'geometries', {
        cube: 'Cube',
        circle: 'Circle'
    })

    // Returning flag
    return renderRequested;
}
