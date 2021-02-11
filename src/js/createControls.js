import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import createCamera from "./createCamera";
import createRenderer from "./createRenderer";
import * as THREE from "three";

export default function createControls(camera, canvasRender) {
  const controls = new OrbitControls(camera, canvasRender);
  return controls;
}
