import { Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Vector3 } from "babylonjs";

export class Duck {
	private mesh: Mesh;
	private isActive: boolean = false;
	private startPoint: Vector3;
	private upperLeft: Vector3;
	private bottomRight: Vector3;

	constructor(texture : string, scene : Scene) {
		this.mesh = MeshBuilder.CreatePlane("duck", {size: 1}, scene);

		this.mesh.material = new StandardMaterial("duckSprite", scene);
		this.mesh.material.backFaceCulling = false;
		(<StandardMaterial>this.mesh.material).diffuseTexture = new Texture(texture, scene);
		(<StandardMaterial>this.mesh.material).diffuseTexture.hasAlpha = true;
	}

	private isInBounds(): boolean {
		if(this.mesh.position.x > this.upperLeft.x && this.mesh.position.x < this.bottomRight.x) {
			if(this.mesh.position.y < this.upperLeft.y && this.mesh.position.y > this.bottomRight.y) {
				return true;
			}
		}
		return false;
	}

	public start(): void {
		this.isActive = true;
		this.mesh.position = this.startPoint;
		this.mesh.setEnabled(true);
	}

	public animate(): void {
		if(!this.isInBounds() || !this.mesh.isEnabled()) { // Also checks if it was disabled externally
			this.isActive = false;
			this.mesh.setEnabled(false);
		}
		else if(this.isActive) {
			// Animate position
		}
	}
}
