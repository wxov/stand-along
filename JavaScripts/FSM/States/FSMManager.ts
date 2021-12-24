/*
 * @Author: your name
 * @Date: 2021-12-24 15:04:08
 * @LastEditTime: 2021-12-24 18:52:15
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\FSM\States\FSMManager.ts
 */
import IFSMState from "../Interface/IFSMState";

export class FSMManager {

	//单例模式.
	public static get Instance(): FSMManager {
		if (FSMManager._mInstance == null) {
			FSMManager._mInstance = new FSMManager()
		}
		return FSMManager._mInstance;
	}
	private static _mInstance: FSMManager

	/**
	* 状态轮询
	* @param dt 轮询间隔
	*/
	public Update(dt: number) {
		if (this._mCurrentState) {
			this._mCurrentState.Update(dt);
		}
	}

	/**
	* 切换状态.
	* @param c 新的状态
	* @param params 参数
	*/
	public ChangeState(c: { new(arg: any): IFSMState }, params?: any): void {
		//退出当前状态
		if (this._mCurrentState!==null) {
			this._mCurrentState.Exit()
			this._mCurrentState = null
		}

		let newState = new c(params)
		newState.Enter()
		this._mCurrentState = newState
	}

	/**
	* 返回当前状态
	*/
	public get CurrentState(): IFSMState {
		return this._mCurrentState
	}

	/**
	* 当前状态
	*/
	private _mCurrentState: IFSMState = null;
}

export default FSMManager