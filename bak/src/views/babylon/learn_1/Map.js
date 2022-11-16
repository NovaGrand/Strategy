import { Scene, Engine } from 'babylonjs'
export default class Map {
    constructor(canvas) {
        this.engine = new Engine(this.canvas, true)
        this.scene = this.CreateScene()

        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }
    CreateScene(){
        return new Scene(this.engine)
    }
}