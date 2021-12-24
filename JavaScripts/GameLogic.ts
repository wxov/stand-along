/*
 * @Author: your name
 * @Date: 2021-12-24 15:04:29
 * @LastEditTime: 2021-12-24 15:07:13
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\GameLogic.ts
 */
import FSMManager from "./FSM/States/FSMManager"
import WaitingState from "./FSM/States/WaitingState"

@MWCore.MWClass
export class GameLogic extends MWCore.MWScript {

    OnPlay() {
        FSMManager.Instance.ChangeState(WaitingState);
        this.bUseUpdate = true;
    }

    OnUpdate(dt: number): void {
        FSMManager.Instance.Update(dt);
    }
}

export default GameLogic