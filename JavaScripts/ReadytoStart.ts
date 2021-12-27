/*
 * @Author: your name
 * @Date: 2021-12-27 11:01:41
 * @LastEditTime: 2021-12-27 16:47:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\ReadytoStart.ts
 */
import * as UE from "ue";
import * as puerts from "puerts";

@MWCore.MWClass
class ReadytoStart extends MWCore.MWScript {
    @MWCore.MWProperty()
    moveFirstDirection: number = 1;

    @MWCore.MWProperty({ replicated: true })
    moveAxis: string = "l"; // "x" or "y" or "z"

    @MWCore.MWProperty({ replicated: true })
    moveDistance: number = 200;

    @MWCore.MWProperty({ replicated: true })
    moveSpeed: number = 10;

    @MWCore.MWProperty({ replicated: true })
    timeAfter: number = 10;
    private goTime: number = 0;
    private _moveTimer: number = 0;
    private _moveTime: number = 0;
    private _direction: number = 0; // 1: min -> max, -1: max -> min


    private _from: number = 0;
    private _to: number = 0;

    private _mPlayerFinishGame: boolean = false;


    OnLoad(): void {
    }

    OnPlay(): void {
        this.bUseUpdate = true;
        let location = this.gameObject.location;
        this._from = this.moveAxis == "l" ? location.y - this.moveDistance : location.y + this.moveDistance;
        this._direction = this.moveFirstDirection;
        this._to = location.y;
        this._moveTime = Math.abs(this._to - this._from) / this.moveSpeed;
    }

    OnUpdate(dt: number) {
        if (!GamePlay.IsServer()) return;
        if (this.timeAfter <= this.goTime) {
            this._mPlayerFinishGame = true;
        } else {
            this.goTime += dt;
        }
        if (this._mPlayerFinishGame) {
            this._moveTimer += dt;
            while (this._moveTimer >= this._moveTime) {
                this._moveTimer -= this._moveTime;
            }
            if (this.moveAxis == "l" ? this._from <= this._to : this._from >= this._to) {
                let location = this.gameObject.location;
                location.y = this._lerpFloat(this._to, this._moveTimer / this._moveTime);
                this.gameObject.location = location;
            }
        }

    }

    private _lerpFloat(to: number, ratio: number): number {
        this._to = this.moveAxis == "l" ? to - this.moveSpeed * ratio : to + this.moveSpeed * ratio;
        return this._to;
    }
}
export default ReadytoStart;