import { Mesh, ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene, Vector3 } from "babylonjs"

const view : HTMLCanvasElement = document.getElementById("view") as HTMLCanvasElement
const engine : Engine = new Engine(view, true)

const scene : Scene = new Scene(engine)

const camera : ArcRotateCamera = new ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 3.2,
    2,
    Vector3.Zero(),
    scene)

camera.attachControl(view)

const light : HemisphericLight = new HemisphericLight(
    "light",
    new Vector3(0, 1, 0),
    scene)

const mesh : Mesh = MeshBuilder.CreateGround("mesh", {}, scene)

engine.runRenderLoop(() => {
    scene.render();
})
