/*
 * @Author: your name
 * @Date: 2021-12-24 16:21:46
 * @LastEditTime: 2021-12-24 16:53:48
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
    private location = this.gameObject.location;

    OnLoad(): void {
        this._x = this.location.x;
        this._y = this.location.y;
        this._z = this.location.z;
    }

    OnPlay(): void {
        this.bUseUpdate = true;
        this._x = this.location.x;
        this._y = this.location.y;
        this._z = this.location.z;
    }

    OnUpdate(dt: number) {
        if (!GamePlay.IsServer()) return;
        this.location.x = this._x;
        this.location.y = this._y;
        this.location.z = this._z;
    }

    private _lerpFloat(from: number, to: number, ratio: number): number {
        return from + (to - from) * ratio;
    }
}

export default MovementDriver;