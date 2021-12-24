/*
 * @Author: your name
 * @Date: 2021-12-24 16:12:54
 * @LastEditTime: 2021-12-24 16:13:16
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\Prick.ts
 */
import * as UE from "ue";
import * as puerts from "puerts";
 
@MWCore.MWClass
class Prick extends MWCore.MWScript
{
    private _trigger: GamePlay.BoxTrigger = null;
 
    OnLoad(): void {}
 
    OnPlay(): void {
        this._trigger = GamePlay.GetBoxTrigger(this);
        this._trigger.OnEnter.Add(this.OnTriggerIn.bind(this));
        this._trigger.OnLeave.Add(this.OnTriggerOut.bind(this));
    }
 
    OnUpdate(dt: number) {
    }
 
    protected OnTriggerIn(hitGameObject: MWCore.GameObject): void {
        if (!GamePlay.IsCharacter(hitGameObject))
        {
            return;
        }
        let character = hitGameObject as GamePlay.Character;
        console.log("Prick.OnTriggerIn: ", character.GetName());
        character.ChatMessage = "疼 疼 疼";
    }
 
    protected OnTriggerOut(hitGameObject: MWCore.GameObject): void {
        if (!GamePlay.IsCharacter(hitGameObject))
        {
            return;
        }
        let character = hitGameObject as GamePlay.Character;
        console.log("Prick.OnTriggerOut: ", character.GetName());
        character.ChatMessage = "不疼 不疼 不疼 ";
    }
}
 
export default Prick;