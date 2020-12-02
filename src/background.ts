import { Mesh, MeshBuilder, Scene, StandardMaterial, Texture } from "babylonjs";

export class Background {
	mesh: Mesh;

	constructor(texture : string, scene : Scene) {
		this.mesh = MeshBuilder.CreatePlane("bg", {size: 10}, scene);
		this.mesh.material = new StandardMaterial("background", scene);
		this.mesh.material.backFaceCulling = false;
		(<StandardMaterial>this.mesh.material).diffuseTexture = new Texture(texture, scene);
		(<StandardMaterial>this.mesh.material).diffuseTexture.hasAlpha = true;
		(<StandardMaterial>this.mesh.material).disableLighting = false;
	}
}
