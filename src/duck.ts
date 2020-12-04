import { Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Vector3 } from "babylonjs";

export class Duck {
	private mesh: Mesh;
	private move: boolean = false;

	constructor(scene: Scene) {
		this.mesh = MeshBuilder.CreatePlane("bg", {size: 10}, scene);

		this.mesh.material = new StandardMaterial("background", scene);
		this.mesh.material.backFaceCulling = false;
		(<StandardMaterial>this.mesh.material).diffuseTexture = new Texture("textures/duck.png", scene);
		(<StandardMaterial>this.mesh.material).diffuseTexture.hasAlpha = true;
	}

	public setMove(move: boolean): void {
		this.move = move;
	}

	public animate(): void {
		// this.mesh.position = s
	}
}
