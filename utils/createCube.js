import * as THREE from 'three';

export function createCube({x = 1, y = 1, z = 1, color = 0x00ff00, ...props}) {
    const {
        geometry = new THREE.BoxGeometry(x, y, z),
        material = new THREE.MeshPhongMaterial({ color })
    } = props

    const cube = new THREE.Mesh(geometry, material);
    return cube;
}