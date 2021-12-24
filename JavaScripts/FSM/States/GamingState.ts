import IFSMState from "../Interface/IFSMState";
import CalculateState from "./CalculateState";
import FSMManager from "./FSMManager";

export class GamingState implements IFSMState {
	/**
	* 当前已经运行的游戏时间
	*/
	private _mCurrentGamingTime: number = 0;

	/**
	* 本状态最多持续时间
	*/
	private GamingTime: number = 10;

	/**
	* 是否已经完成游戏
	*/
	private _mPlayerFinishGame: boolean = false;

	//监听的事件返回值, 用于断开连接.
	private _mCheckPointListener: Events.EventListener

	/**
	* 进入状态
	*/
	Enter(): void {
		this._mCurrentGamingTime = 0
		this._mCheckPointListener = Events.AddLocalListener("GameEvents_CheckPoint", (player: MWCore.GameObject) => { this._mPlayerFinishGame = true; });
		console.log("---[FSM Log]:: GamingState Enter.")

	}

	/**
	* 状态轮询
	* 等待时间叠加
	*/
	Update(dt: number): void {
		this._mCurrentGamingTime += dt;
		if (this._mCurrentGamingTime >= this.GamingTime || this._mPlayerFinishGame) {
			FSMManager.Instance.ChangeState(CalculateState, this._mPlayerFinishGame);
		}
	}
	/**
	* 退出状态
	*/
	Exit(): void {
		this._mCheckPointListener.Disconnect();
		this._mCheckPointListener = null;
		console.log("---[FSM Log]:: GamingState Exit.")
	}

}

export default GamingState