import * as THREE from "three";

export default function createLight() {

  const COLOR = 0xffffff;
  const INTENSITY = 1;
  const DISTANCE = 1000

  const light = new THREE.PointLight(COLOR, INTENSITY, DISTANCE);
  light.position.set(0, 0, 10);

  return light;
}
