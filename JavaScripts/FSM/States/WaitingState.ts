import IFSMState from "../Interface/IFSMState";
import FSMManager from "./FSMManager";
import GamingState from "./GamingState";

export class WaitingState implements IFSMState {
	//玩家已经等待的时间
	private _mCurrentWaitTime: number = 0;
	/**
	* 进入状态
	*/
	Enter(): void {
		//进入此状态的时候, 等待时长时间清零.
		this._mCurrentWaitTime = 0;
		console.log("---[FSM Log]:: WaitingState Enter.")
	}

	/**
	* 状态轮询
	* 等待时间叠加
	*/
	Update(dt: number): void {
		this._mCurrentWaitTime += dt;
		if (this._mCurrentWaitTime >= 10) {
			//TODO:: 切换到游戏状态.
			FSMManager.Instance.ChangeState(GamingState)
		}
	}
	/**
	* 退出状态
	*/
	Exit(): void {
		console.log("---[FSM Log]:: WaitingState Exit.")
	}

}

export default WaitingState