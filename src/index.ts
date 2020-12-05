import { FreeCamera, Engine, HemisphericLight, Scene, Vector3, ExecuteCodeAction, ActionManager } from "babylonjs";
import { TextBlock, AdvancedDynamicTexture } from "babylonjs-gui";
import { Auxiliar } from "./auxiliar";
import { Background } from "./background";
import { Dog } from "./dog";
import { Duck } from "./duck";

const view = document.getElementById("view") as HTMLCanvasElement;
const engine = new Engine(view, true, { preserveDrawingBuffer: true, stencil: true });
const scene = new Scene(engine);
const light = new HemisphericLight("light", new Vector3(0, 10, 0), scene);
const camera = new FreeCamera("camera", new Vector3(0, 0, 15), scene);
camera.attachControl(view, true);

const bg = new Background("textures/bg.png", scene);
const dog = new Dog(scene);
const duck1 = new Duck(new Vector3(-5, 5, 0), new Vector3(5, -5, 0), scene);
const duck2 = new Duck(new Vector3(-5, 5, 0), new Vector3(5, -5, 0), scene);

var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

var dhTitle = new TextBlock();
dhTitle.text = "Duck Hunt";
dhTitle.color = "white";
dhTitle.fontSize = 30;
dhTitle.topInPixels = -425;
advancedTexture.addControl(dhTitle);

var dhName1 = new TextBlock();
dhName1.text = "Gustavo Araujo Borges - 180995";
dhName1.color = "white";
dhName1.fontSize = 24;
dhName1.topInPixels = 200;
dhName1.leftInPixels = 600;
advancedTexture.addControl(dhName1);

var dhName2 = new TextBlock();
dhName2.text = "Luiz Antonio Buffolo - 180361";
dhName2.color = "white";
dhName2.fontSize = 24;
dhName2.topInPixels = 250;
dhName2.leftInPixels = 585;
advancedTexture.addControl(dhName2);

var dhInstructions = new TextBlock();
dhInstructions.text = "MENU EXPLICATIVO \n\n Acerte os patos com seu mouse \n ou seu cachorro vai rir de você!!";
dhInstructions.color = "white";
dhInstructions.fontSize = 24;
dhInstructions.isVisible = false;
advancedTexture.addControl(dhInstructions);

scene.actionManager = new ActionManager(scene);
scene.actionManager.registerAction(new ExecuteCodeAction(
    ActionManager.OnKeyDownTrigger, (e) => {
        var key = e.sourceEvent.key;

        if (key == "h" || key == "H") {
			dhInstructions.isVisible = !dhInstructions.isVisible;
        }
    }
))

camera.lockedTarget = bg.getMesh();

scene.onPointerDown = (_, pickResult) => {
	if (pickResult.hit) {
		bg.shoot(new Vector3(pickResult.pickedPoint.x, pickResult.pickedPoint.y, 0.1));
		if(pickResult.pickedMesh.name == "duck"){
			pickResult.pickedMesh.setEnabled(false);
			Auxiliar.ducks += 1;
		}
	}
};

engine.runRenderLoop(() => {
	if(Auxiliar.count == 0 && !dog.active){
		duck1.start();
	}
	else if(Auxiliar.count == 1 && duck1.getMesh().isEnabled() == false){
		duck2.start();
	}
	else if(Auxiliar.count == 2 && duck2.getMesh().isEnabled() == false){
		dog.start(Auxiliar.ducks);
	}

	dog.animate();
	duck1.animate();
	duck2.animate();
	bg.animate();
	scene.render();
});

window.addEventListener("resize", () => {
	engine.resize();
})
