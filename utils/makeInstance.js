import * as THREE from 'three';
import { gui } from './gui';

export function makeInstance({
    geometry = new THREE.BoxGeometry(1, 1, 1),
    color = 0x00ff00,
    x = 0,
    segments = true,
    instanceName = 'Box',
    handlerChange,
}) {
    const material = new THREE.MeshPhongMaterial({ color });
    const instance = new THREE.Mesh(geometry, material);

    if (segments) {
        const geometryEdges = new THREE.EdgesGeometry(geometry, 360);
        const materialEdges = new THREE.LineBasicMaterial({ color: 'black' });
        const lineSegments = new THREE.LineSegments(geometryEdges, materialEdges);
        instance.add(lineSegments);
    }

    instance.position.x = x;

    const folder = gui.addFolder(`${instanceName}`);
    folder.add(instance.scale, 'x', .1, 1.5)
        .name('scale x')
        .onChange(handlerChange)
    
    folder.open();

    return instance;
}