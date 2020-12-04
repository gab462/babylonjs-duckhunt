import { Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Vector3 } from "babylonjs";

export class Dog {
	private mesh: Mesh;
	private isActive: boolean = false;
    private position: Vector3 = new Vector3(0,0,1);

	constructor(scene : Scene) {
		this.mesh = MeshBuilder.CreatePlane("dog", {size: 1}, scene);
		this.mesh.material = new StandardMaterial("dogSprite", scene);
        this.mesh.material.backFaceCulling = false;
	}

	public start(ducks: number): void {
        this.isActive = true;
        this.mesh.setEnabled(true);
        (<StandardMaterial>this.mesh.material).diffuseTexture = new Texture(`textures/dog${ducks}.png`, this.mesh.getScene());
        (<StandardMaterial>this.mesh.material).diffuseTexture.hasAlpha = true;
    }

	public animate(): void {
		if(!this.mesh.isEnabled()) { // Also checks if it was disabled externally
			this.isActive = false;
			this.mesh.setEnabled(false);
		}
		else if(this.isActive) {
			// Animate position
		}
	}
}