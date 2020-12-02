import { FreeCamera, Engine, HemisphericLight, Scene, Vector3 } from "babylonjs";
import { Background } from "./background";

const view = document.getElementById("view") as HTMLCanvasElement;
const engine = new Engine(view, true, { preserveDrawingBuffer: true, stencil: true });
const scene = new Scene(engine);
const light = new HemisphericLight("light", new Vector3(0, 10, 0), scene);
const camera = new FreeCamera("camera", new Vector3(0, 0, 15), scene);
camera.attachControl(view, true);

const bg = new Background("textures/bg.png", scene);
camera.lockedTarget = bg.getMesh();

scene.onPointerDown = (_, pickResult) => {
	if (pickResult.hit) {
		bg.shoot(new Vector3 ( pickResult.pickedPoint.x, pickResult.pickedPoint.y, 1 ) );
	}
};

engine.runRenderLoop(() => {
	bg.animate();
	scene.render();
});

window.addEventListener("resize", () => {
	engine.resize();
})
