import animate from "./js/animate";
import createLight from "./js/createLight";
import createRenderer from "./js/createRenderer";
import createCamera from "./js/createCamera";
import createCube from "./js/createCube";
import createScene from "./js/createScene";
import "./styles/main.scss";
import * as THREE from "three";


const renderer = createRenderer();
const scene = createScene();
const camera = createCamera();

const cubes = {
  pink: createCube({ color: 0xff00ce, positionX: -1, positionY: -1, positionZ: 2 }),
  purple: createCube({ color: 0x9300fb, positionX: 1, positionY: -1 }),
  blue: createCube({ color: 0x0065d9, positionX: 1, positionY: 1, positionZ: -2 }),
  cyan: createCube({ color: 0x00d7d0, positionX: -1, positionY: 1 }),
};

const light = createLight();

for (const cube of Object.values(cubes)) {
  scene.add(cube);
}

scene.add(light);


// ADD CUBE IN THE SCENE
const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});

const cube = new THREE.Mesh(geometry, material);

const distance = 5;






animate(() => {
  // updateCube();
  // updateControl();

  renderer.render(scene, camera);
});

// RESIZE SCENE
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});
