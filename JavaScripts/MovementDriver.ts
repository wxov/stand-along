/*
 * @Author: your name
 * @Date: 2021-12-24 16:08:29
 * @LastEditTime: 2021-12-24 16:09:08
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\MovementDriver.ts
 */
import * as UE from "ue";
import * as puerts from "puerts";

@MWCore.MWClass
class MovementDriver extends MWCore.MWScript {
    @MWCore.MWProperty()
    moveFirstDirection: number = 1;

    @MWCore.MWProperty({ replicated: true })
    moveAxis: string = "x"; // "x" or "y" or "z"

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

    OnLoad(): void {
    }

    OnPlay(): void {
        this.bUseUpdate = true;

        let location = this.gameObject.location;
        if (this.moveAxis.match("y")) {
            this._max = location.y + this.moveDistance;
            this._min = location.y - this.moveDistance;
            this._from = location.y;
        }
        else if (this.moveAxis.match("z")) {
            this._max = location.z + this.moveDistance;
            this._min = location.z - this.moveDistance;
            this._from = location.z;
        }
        else {
            this._max = location.x + this.moveDistance;
            this._min = location.x - this.moveDistance;
            this._from = location.x;
        }

        this._direction = this.moveFirstDirection;
        this._to = this._direction > 0 ? this._max : this._min;
        this._moveTime = Math.abs(this._to - this._from) / this.moveSpeed;
    }

    OnUpdate(dt: number) {
        if (!GamePlay.IsServer()) return;

        this._moveTimer += dt;
        while (this._moveTimer >= this._moveTime) {
            this._moveTimer -= this._moveTime;
            this._direction = -this._direction;
            if (this._direction < 0) {
                this._from = this._max;
                this._to = this._min;
            }
            else {
                this._from = this._min;
                this._to = this._max;
            }
        }

        let location = this.gameObject.location;
        if (this.moveAxis.match("y")) {
            location.y = this._lerpFloat(this._from, this._to, this._moveTimer / this._moveTime);
        }
        else if (this.moveAxis.match("z")) {
            location.z = this._lerpFloat(this._from, this._to, this._moveTimer / this._moveTime);
        }
        else {
            location.x = this._lerpFloat(this._from, this._to, this._moveTimer / this._moveTime);
        }

        this.gameObject.location = location;
    }

    private _lerpFloat(from: number, to: number, ratio: number): number {
        return from + (to - from) * ratio;
    }
}

export default MovementDriver;