/*
 * @Author: your name
 * @Date: 2021-12-24 15:04:08
 * @LastEditTime: 2021-12-27 10:32:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\FSM\States\CalculateState.ts
 */
import IFSMState from "../Interface/IFSMState";
import FSMManager from "./FSMManager";
import WaitingState from "./WaitingState";


/** * 游戏结算状态 */
export class CalculateState implements IFSMState {
	//是否成功通关游戏
	private _mFinishedGame: boolean = false
	//自动跳转等待状态的等待时间
	private _mAutoGoWaitStateTime: number = 3
	constructor(finishGame: boolean) {
		this._mFinishedGame = finishGame;
	}
	//进入状态
	Enter(): void {
		console.log("---[FSM Log]:: CalculateState Enter.");
		if (this._mFinishedGame) {
			//胜利之后结算逻辑.
			console.log("---[FSM Log]:: victory.");
			return;
		} else {
			//失败之后结算逻辑.
			console.log("---[FSM Log]:: defeat.");
		}

		//_mAutoGoWaitStateTime秒之后切换到等待状态.
		setTimeout(() => {
			//TODO::切换到等待状态.
			FSMManager.Instance.ChangeState(WaitingState);
		}, this._mAutoGoWaitStateTime);
	}

	Update(): void { }

	Exit(): void {
		console.log("---[FSM Log]:: CalculateState Exit.")
	}
}
export default CalculateState