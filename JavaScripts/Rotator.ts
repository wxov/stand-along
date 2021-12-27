/*
 * @Author: your name
 * @Date: 2021-12-27 10:24:24
 * @LastEditTime: 2021-12-27 10:24:55
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\Rotator.ts
 */
import * as UE from "ue";
import * as puerts from "puerts";

@MWCore.MWClass
class Rotator extends MWCore.MWScript {
    @MWCore.MWProperty()
    RotationSpeed: number = 10;

    protected OnStart(): void {
        this.bUseUpdate = true;
    }

    protected OnUpdate(dt: number): void {
        let rotation = this.gameObject.rotation;
        rotation.z += this.RotationSpeed * dt;
        this.gameObject.rotation = rotation;
    }
}
export default Rotator;