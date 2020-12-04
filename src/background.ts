import { Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Vector3 } from "babylonjs";

export class Background {
	private mesh: Mesh;
	private shotMark: Mesh;
	private shotFrameNumber: number = 0;
	private shotFrames: number = 5;

	constructor(texture : string, scene : Scene) {
		this.mesh = MeshBuilder.CreatePlane("bg", {size: 10}, scene);

		this.mesh.material = new StandardMaterial("background", scene);
		this.mesh.material.backFaceCulling = false;
		(<StandardMaterial>this.mesh.material).diffuseTexture = new Texture(texture, scene);
		(<StandardMaterial>this.mesh.material).diffuseTexture.hasAlpha = true;
		(<StandardMaterial>this.mesh.material).disableLighting = false;

		this.shotMark = MeshBuilder.CreatePlane("shot", {size: 0.5}, scene);
		this.shotMark.setEnabled(false);
	}

	public getMesh(): Mesh {
		return this.mesh;
	}

	public shoot(position: Vector3): void {
		this.shotFrameNumber = this.shotFrames;
		this.shotMark.setEnabled(true);
		this.shotMark.position = position;
		this.shotMark.rotation.y =  Math.PI;
		(<StandardMaterial>this.mesh.material).disableLighting = true;
	}

	public animate(): void {
		if (this.shotFrameNumber > 0) {
			this.shotFrameNumber--;
		}
		else {
			this.shotMark.setEnabled(false);
			(<StandardMaterial>this.mesh.material).disableLighting = false;
		}
	}
}
