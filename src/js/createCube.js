import * as THREE from "three";

export default function createCube({ color, positionX, positionY, positionZ }) {

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshLambertMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(positionX, positionY, positionZ, 0);

  return cube;
}
