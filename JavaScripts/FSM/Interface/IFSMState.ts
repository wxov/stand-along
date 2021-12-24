export interface IFSMState {
	/**
	* 进入状态
	*/
	Enter(): void;

	/**
	* 状态轮询
	* @param dt 轮询间隔时间
	*/
	Update(dt: number): void;

	/**
	* 退出状态
	*/
	Exit(): void;
}

export default IFSMState