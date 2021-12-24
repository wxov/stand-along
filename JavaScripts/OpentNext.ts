/*
 * @Author: your name
 * @Date: 2021-12-24 20:00:07
 * @LastEditTime: 2021-12-24 20:40:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\OpentNext.ts
 */
import * as UE from "ue";
import * as puerts from "puerts";

@MWCore.MWClass
class MovementDriver extends MWCore.MWScript {
    @MWCore.MWProperty()
    moveFirstDirection: number = 1;

    @MWCore.MWProperty({ replicated: true })
    moveAxis: string = "z"; // "x" or "y" or "z"

    @MWCore.MWProperty({ replicated: true })
    moveDistance: number = 100;

    @MWCore.MWProperty({ replicated: true })
    moveSpeed: number = 10;

    private _moveTimer: number = 0;
    private _moveTime: number = 0;
    private _direction: number = 0; // 1: min -> max, -1: max -> min

    private _max: number = 0;
    private _min: number = 0;

    private _from: number = 0;
    private _to: number = 0;

    //监听的事件返回值, 用于断开连接.
    private _mCheckPointListener: Events.EventListener
    private _mPlayerFinishGame: boolean;

    OnLoad(): void {
    }

    OnPlay(): void {
        this.bUseUpdate = true;

        let location = this.gameObject.location;
        this._max = location.z + this.moveDistance;
        // this._min = location.z - this.moveDistance;
        this._from = this._max;
        this._direction = this.moveFirstDirection;
        this._to = location.z;
        this._moveTime = Math.abs(this._to - this._from) / this.moveSpeed;
    }

    OnUpdate(dt: number) {
        if (!GamePlay.IsServer()) return;
        this._mCheckPointListener = Events.AddLocalListener("GameEvents_OpentNext",
            (player: MWCore.GameObject) => {
                this._mPlayerFinishGame = true;
            });
        if (this._mPlayerFinishGame) {
            this._moveTimer += dt;
            while (this._moveTimer >= this._moveTime) {
                this._moveTimer -= this._moveTime;
            }
            if (this._from >= this._to) {
                let location = this.gameObject.location;
                location.z = this._lerpFloat(this._to, this._moveTimer / this._moveTime);
                this.gameObject.location = location;
            }
        }

    }

    private _lerpFloat(to: number, ratio: number): number {
        this._to = to + this.moveSpeed * ratio;
        return this._to;
    }
}

export default MovementDriver;