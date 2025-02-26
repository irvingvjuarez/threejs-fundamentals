import * as THREE from 'three';

export function createCube({x = 0, y = 0, z = 0, color = 0x00ff00, ...props}) {
    const {
        geometry = new THREE.BoxGeometry(1, 1, 1),
        material = new THREE.MeshPhongMaterial({ color })
    } = props

    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    return cube;
}