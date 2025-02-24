import * as THREE from 'three';
import { ASPECT, FAR_NUMBER, FIELD_OF_VIEW, NEAR_NUMBER } from '../globals/constants';
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
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    
    scene.add(cube);
    camera.position.set(0,0,100);
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
    
    // Rendering the whole scene
    animate(renderer, () => {
        renderer.render(scene, camera);
        
        // Rotating the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Trying to rotate the line
        line.rotation.y += 0.01;
    });
}
