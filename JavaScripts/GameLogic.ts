/*
 * @Author: your name
 * @Date: 2021-12-24 15:04:29
 * @LastEditTime: 2021-12-28 20:16:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\GameLogic.ts
 */
// import * as EN from "./FSM/Interface/EventsName"
import EventsName from "./FSM/Interface/EventsName";
import FSMManager from "./FSM/States/FSMManager"
import WaitingState from "./FSM/States/WaitingState"
import GameStatus from "./GameStatus/GameStatus"

@MWCore.MWClass
export class GameLogic extends MWCore.MWScript {
    private PlayerNum: number = 0
    private ReadyPlayerNum: number = 0;
    OnPlay() {
        if (this.IsRunningClient()) {

        } else {
            Events.AddPlayerJoinedListener(() => { this.PlayerNum += 1 })
            Events.AddClientListener(EventsName.CtoS_StartGame, () => {
                this.ReadyPlayerNum += 1
                if (this.PlayerNum == this.ReadyPlayerNum) {
                    GameStatus.Instance.ChangeStartState(true)
                    FSMManager.Instance.ChangeState(WaitingState);
                }

            })
        }
        this.bUseUpdate = true;
    }

    OnUpdate(dt: number): void {
        if (GameStatus.Instance.IsStart) {
            FSMManager.Instance.Update(dt);
        }
    }
}

export default GameLogic