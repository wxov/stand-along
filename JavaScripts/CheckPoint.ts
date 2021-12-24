/*
 * @Author: your name
 * @Date: 2021-12-24 15:04:29
 * @LastEditTime: 2021-12-24 15:26:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\CheckPoint.ts
 */
import * as UE from "ue";
import * as puerts from "puerts";
// import GamePlayer from "./FSM/GamePlayer";

@MWCore.MWClass
class ClothTest extends MWCore.MWScript {
	OnLoad(): void {
		let boxCollider = GamePlay.GetBoxTrigger(this.gameObject)
		if (boxCollider) {
			boxCollider.OnEnter.Add(this.onAttachCheckPoint.bind(this))
		}
	}

	private onAttachCheckPoint(other: MWCore.GameObject) {
		let a = other as GamePlay.Character;
		if (other == a) {
			Events.DispatchLocal("GameEvents_CheckPoint", other)
			a.ChatMessage = "chengong";
		}
	}

	OnDestroy() {

	}

}

export default ClothTest;