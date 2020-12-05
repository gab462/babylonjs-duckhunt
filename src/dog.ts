import { Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Vector3 } from "babylonjs";
import { Auxiliar } from "./auxiliar";

export class Dog {
	private mesh: Mesh;
	private isActive: boolean = false;
	private isUp: boolean;	

	constructor(scene : Scene) {
		this.mesh = MeshBuilder.CreatePlane("dog", {size: 1}, scene);
		this.mesh.material = new StandardMaterial("dogSprite", scene);
		this.mesh.material.backFaceCulling = false;
		this.mesh.position.z = -1;
		this.mesh.position.y = -3;
	}

	public get active() : boolean {
		return this.isActive;
	}

	public start(ducks: number): void {
		this.isActive = true;
		this.isUp = true;
        //this.mesh.setEnabled(true);
        (<StandardMaterial>this.mesh.material).diffuseTexture = new Texture(`textures/dog${ducks}.png`, this.mesh.getScene());
		(<StandardMaterial>this.mesh.material).diffuseTexture.hasAlpha = true;
		Auxiliar.ducks = 0;
		Auxiliar.count = 0;
    }

	public animate(): void {
		if(this.isActive) { // Also checks if it was disabled externally
			if(this.isUp){
				this.mesh.position.z += 0.1;
			}
			else{
				this.mesh.position.z -= 0.1;
			}
		}

		if(this.mesh.position.z > 4.5){
			this.isUp = false;
		}
		if(this.mesh.position.z < -1) {
			this.isActive = false;
		}
	}
}