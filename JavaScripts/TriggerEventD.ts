/*
 * @Author: your name
 * @Date: 2021-12-27 14:20:17
 * @LastEditTime: 2021-12-28 20:16:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\TriggerEventD.ts
 */
import * as UE from "ue";
import * as puerts from "puerts";
import EventsName from "./FSM/Interface/EventsName";
// import EN from "./FSM/Interface/EventsName"
@MWCore.MWClass
class TriggerEventDispatcher extends MWCore.MWScript {

    @MWCore.MWProperty({ displayName: "TriggerName", tooltip: "会分别派发{$TriggerName}In和{$TriggerName}Out事件" })
    TriggerName: string = "";

    @MWCore.MWProperty({ displayName: "只响应Character" })
    FillterCharacter: boolean = false;

    trigger: GamePlay.BoxTrigger | GamePlay.SphereTrigger;

    OnPlay(): void {
        if (GamePlay.IsSphereTrigger(this.gameObject)) {
            this.trigger = GamePlay.GetSphereTrigger(this.gameObject);
        }
        else if (GamePlay.IsBoxTrigger(this.gameObject)) {
            this.trigger = GamePlay.GetBoxTrigger(this.gameObject);
        }
        else {
            console.error("=======>TriggerEventDispatcher's parent must be a trigger!!!");
        }
        this.trigger.OnEnter.Add(this.OnTriggerIn.bind(this));
        this.trigger.OnLeave.Add(this.OnTriggerOut.bind(this));
    }

    OnTriggerIn(go: MWCore.GameObject): void {
        if (this.FillterCharacter && !GamePlay.IsCharacter(go)) {
            return;
        }
        Events.DispatchLocal(EventsName.toLocal_BTrapT, { gameObject: go, trigger: this.trigger });
    }

    OnTriggerOut(go: MWCore.GameObject): void {
        if (this.FillterCharacter && !GamePlay.IsCharacter(go)) {
            return;
        }
        Events.DispatchLocal(this.TriggerName + "Out", { gameObject: go, trigger: this.trigger });
    }

    OnStop(): void {
        this.trigger.OnEnter.Remove(this.OnTriggerIn);
        this.trigger.OnLeave.Remove(this.OnTriggerOut);
    }

    OnDestroy(): void {
    }

}

export default TriggerEventDispatcher;