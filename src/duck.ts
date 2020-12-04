import { Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Vector3 } from "babylonjs";

export class Duck {
	private mesh: Mesh;
	private isActive: boolean = false;
	private startPoint: Vector3;
	private upperLeft: Vector3;
	private bottomRight: Vector3;
	private randomX: number;

	constructor(upperLeft: Vector3, bottomRight: Vector3, scene: Scene) {
		this.mesh = MeshBuilder.CreatePlane("duck", { size: 1 }, scene);

		this.mesh.material = new StandardMaterial("duckSprite", scene);
		this.mesh.material.backFaceCulling = false;
		(<StandardMaterial>this.mesh.material).diffuseTexture = new Texture("textures/duck.png", scene);
		(<StandardMaterial>this.mesh.material).diffuseTexture.hasAlpha = true;
		this.startPoint = new Vector3(0, -3, 0.1);
		this.mesh.setEnabled(false);
		this.upperLeft = upperLeft;
		this.bottomRight = bottomRight;
	}

	private isInBounds(): boolean {
		if (this.mesh.position.x > this.upperLeft.x && this.mesh.position.x < this.bottomRight.x) {
			if (this.mesh.position.y < this.upperLeft.y && this.mesh.position.y > this.bottomRight.y) {
				return true;
			}
		}
		return false;
	}

	public start(): void {
		this.isActive = true;
		this.mesh.position.x = this.startPoint.x;
		this.mesh.position.y = this.startPoint.y;
		this.mesh.setEnabled(true);
		this.randomX = (Math.random() * 0.2) - 0.1;
		if(this.randomX < 0){
			this.mesh.rotation.y = Math.PI;
		}
		else{
			this.mesh.rotation.y = 0;
		}
	}

	public animate(): void {
		if (!this.isInBounds() || !this.mesh.isEnabled()) { // Also checks if it was disabled externally
			this.isActive = false;
			this.mesh.setEnabled(false);
		}
		else if (this.isActive) {
			this.mesh.position.y += 0.1;
			this.mesh.position.x += this.randomX;
		}
	}
}
