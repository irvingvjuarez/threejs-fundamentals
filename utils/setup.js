import * as THREE from 'three';
import { ASPECT, FAR_NUMBER, FIELD_OF_VIEW, NEAR_NUMBER } from '../globals/constants';
import { createCube } from './createCube';
import { animate } from './render';

export function setup() {
    // Creating a scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        FIELD_OF_VIEW,
        ASPECT, 
        NEAR_NUMBER,
        FAR_NUMBER
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Adding a cube to the scene
    const greenCube = createCube({});
    
    scene.add(greenCube);
    camera.position.set(0,0,35);
    camera.lookAt(0,0,0)

    // Adding a line to the scene
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const linePoints = [
        new THREE.Vector3(-10, 10, 0),
        new THREE.Vector3(0, 10, 0),
        new THREE.Vector3(10, 10, 0),
    ];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    const line = new THREE.Line(lineGeometry, lineMaterial);

    scene.add(line);

    // Adding a light
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
    
    // Rendering the whole scene
    animate(renderer, () => {
        renderer.render(scene, camera);
        
        // Rotating the cube
        greenCube.rotation.x += 0.01;
        greenCube.rotation.y += 0.01;

        // Trying to rotate the line
        line.rotation.y += 0.01;
    });
}
