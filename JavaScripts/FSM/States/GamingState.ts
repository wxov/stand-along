/*
 * @Author: your name
 * @Date: 2021-12-24 15:04:08
 * @LastEditTime: 2021-12-24 18:54:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\FSM\States\GamingState.ts
 */
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
		this._mCheckPointListener = Events.AddLocalListener("GameEvents_CheckPoint",
			(player: MWCore.GameObject) => {
				this._mPlayerFinishGame = true;
			});
		console.log("---[FSM Log]:: GamingState Enter.");
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
		console.log("---[FSM Log]:: GamingState Exit.");
	}

}

export default GamingState