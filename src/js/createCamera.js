import * as THREE from "three";

export default function createCamera() {

  const FOV = 75;
  const NEAR = 0.1;
  const FAR = 1000
  const CAMERA_POSITION_Z = 5;

  const camera = new THREE.PerspectiveCamera(
    FOV,
    window.innerWidth / window.innerHeight,
    NEAR,
    FAR
  );
  camera.position.z = CAMERA_POSITION_Z;

  return camera;
}
