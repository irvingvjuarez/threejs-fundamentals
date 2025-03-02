import * as THREE from 'three';
import { ASPECT, FAR_NUMBER, FIELD_OF_VIEW, NEAR_NUMBER } from '../globals/constants';

export const camera = new THREE.PerspectiveCamera(
    FIELD_OF_VIEW,
    ASPECT, 
    NEAR_NUMBER,
    FAR_NUMBER
);