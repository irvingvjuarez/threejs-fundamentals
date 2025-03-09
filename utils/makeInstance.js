import * as THREE from 'three';
import { gui } from '../controllers/gui';

export function makeInstance({
    geometry = new THREE.BoxGeometry(8, 8, 8),
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

    folder.add(instance.position, 'x', -10, 10)
        .name('position x')
        .onChange(handlerChange)

    folder.open();

    return {instance, guiFolder: folder};
}