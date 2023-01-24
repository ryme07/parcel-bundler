import * as THREE from "three";

export default function createScene() {

  const COLOR = 0xffffff;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLOR);

  return scene;
}
