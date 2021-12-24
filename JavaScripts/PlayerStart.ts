/*
 * @Author: your name
 * @Date: 2021-12-24 16:21:46
 * @LastEditTime: 2021-12-24 19:45:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\PlayerStart.ts
 */
/*
 * @Author: your name
 * @Date: 2021-12-24 16:21:46
 * @LastEditTime: 2021-12-24 18:26:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\PlayerStart.ts
 */
import * as UE from "ue";
import * as puerts from "puerts";

@MWCore.MWClass
class MovementDriver extends MWCore.MWScript {
    private _x: number = 0;
    private _y: number = 0;
    private _z: number = 0;
    // private location = this.gameObject.location;
    private _mPlayerStartListener: Events.EventListener;
    private _mPlayerFinishGame: boolean = false;

    OnLoad(): void {
        // this._x = this.location.x;
        // this._y = this.location.y;
        // this._z = this.location.z;
    }

    OnPlay(): void {
        this.bUseUpdate = true;
        // let location = this.gameObject.location;
        // this._x = location.x;
        // this._y = location.y;
        // this._z = location.z;
        this._mPlayerStartListener = Events.AddLocalListener("GameEvents_PlayerStart", (player: MWCore.GameObject) => { this._mPlayerFinishGame = true; });
        console.log("---[FSM Log]:: GamingState Enter."+this._x + "," + this._y + "," + this._z);
    }

    OnUpdate(dt: number) {
        // console.log("---[FSM Log]:: "+this._x + "," + this._y + "," + this._z);
        if (!GamePlay.IsServer()) return;
        if (this._mPlayerFinishGame) {
            // location.y = this._y;
            // location.z = this._z;
            // location.x = this._x;
            let location = new Type.Vector(this._x,this._y,this._z);
            this.gameObject.location = location;
        }
    }
    OnDestroy(): void {
    }
}

export default MovementDriver;