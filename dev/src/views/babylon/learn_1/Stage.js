import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder } from 'babylonjs'

export default class Stage {
    constructor(canvas) {
        this.engine = new Engine(canvas, true)
        this.scene = this.CreateScene()

        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }
    CreateScene(){
        const sce = new Scene(this.engine)
        const cam = new FreeCamera("cam_1",new Vector3(0,1,0), sce)
        cam.attachControl()
        const lgt = new HemisphericLight( "heimiLight",new Vector3(0,2,0), sce)
        lgt.intensity = 0.5
        const ground = MeshBuilder.CreateGround("ground",{ width:20, height:20 }, sce)
        const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, sce)
        ball.position = new Vector3(0,1,6)
        return sce
    }
}