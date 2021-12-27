/*
 * @Author: your name
 * @Date: 2021-12-24 16:12:54
 * @LastEditTime: 2021-12-27 16:26:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\Prick.ts
 */
import * as UE from "ue";
import * as puerts from "puerts";

export namespace EventsName {
    export const ReqUseTrap = "ReqUseTrap"
    export const NtfGotTrap = "NtfGotTrap"
    export const NtfPlayerInTrap = "NtfPlayerInTrap"
}

@MWCore.MWClass
class MushroomTrap extends MWCore.MWScript {

    @MWCore.MWProperty({ replicated: true })
    id: number = 0;

    @MWCore.MWProperty({ replicated: true, displayName:"效果持续时间（毫秒）" })
    effectTime: number = 5000;

    listeners: Events.EventListener[] = [];

    timerHandler: number;

    @MWCore.MWProperty({ replicated: true })
    ownerId: number;

    trigger: GamePlay.BoxTrigger | GamePlay.SphereTrigger;

    OnLoad(): void {
    }

    OnPlay(): void {
        this.timerHandler = setTimeout(() => {
            for (const go of this.gameObject.GetChildren()) {
                if (GamePlay.IsSphereTrigger(go)) {
                    this.trigger = GamePlay.GetSphereTrigger(go);
                    break;
                } else if (GamePlay.IsBoxTrigger(go)) {
                    this.trigger = GamePlay.GetBoxTrigger(go);
                    break;
                }
            }
            if (this.IsRunningClient()) {
                this.listeners.push(Events.AddServerListener(EventsName.NtfGotTrap, this.OnNtfGotTrap.bind(this)));
                this.listeners.push(Events.AddServerListener(EventsName.NtfPlayerInTrap, this.OnNtfPlayerInTrap.bind(this)));
            }
            else {
                this.listeners.push(Events.AddLocalListener("BubbleTrapTriggerIn", this.OnBubbleTrapTriggerIn.bind(this)));
                this.listeners.push(Events.AddClientListener(EventsName.ReqUseTrap, this.OnReqUseTrap.bind(this)));
            }
            clearTimeout(this.timerHandler);
            this.timerHandler = 0;
        }, 3000);
    }

    OnUpdate(dt: number): void {
    }

    OnStop(): void {
    }

    OnDestroy(): void {
        for (const linstener of this.listeners) {
            try {
                linstener.Disconnect();
            } catch (error) {
                console.log(error);
            }
        }
        this.listeners.length = 0;
    }

    // 使用陷阱
    //#region server-only
    OnReqUseTrap(player: GamePlay.Player, args: any): void {
        if (player.GetPlayerID() == this.ownerId) {
            let location = player.Character.location;
            location.z -= 50;
            location.x -= 50;
            this.gameObject.location = location;
            // this.gameObject.SetVisibility(Type.PropertyStatus.On);
            this.trigger.SetCollisionEnabled(true);
            this.gameObject.Actor.SetActorHiddenInGame(false);
        }
    }

    OnReqPickTrap(player: GamePlay.Player, args: any): void {
        if (!this.ownerId) {
            this.ownerId = player.GetPlayerID();
            Events.DispatchToClient(player, EventsName.NtfGotTrap, this.id);
            this.trigger.SetCollisionEnabled(false);
            this.gameObject.Actor.SetActorHiddenInGame(true);
        }
    }

    // 触发陷阱
    OnBubbleTrapTriggerIn(args: { gameObject: GamePlay.Character, trigger: GamePlay.BoxTrigger | GamePlay.SphereTrigger }): void {
        console.log("--------------------OnBubbleTrapTriggerIn:" + args.gameObject.GetName());
        let targetPlayer = this.GetCharacterPlayer(args.gameObject);
        if (!this.ownerId) {
            console.error("----------" + targetPlayer);
            if (targetPlayer) {
                this.ownerId = targetPlayer.GetPlayerID();
                Events.DispatchToClient(targetPlayer, EventsName.NtfGotTrap, targetPlayer.GetPlayerID());
                args.trigger.SetCollisionEnabled(false);
                this.gameObject.Actor.SetActorHiddenInGame(true);
            }
        }
        else {
            if (this.ownerId == targetPlayer.GetPlayerID()) {
                return;
            }
            args.trigger.SetCollisionEnabled(false);
            this.gameObject.Actor.SetActorHiddenInGame(true);
            Events.DispatchToAllClient(targetPlayer, EventsName.NtfPlayerInTrap, targetPlayer.GetPlayerID());
        }
    }

    // 获取触发
    GetCharacterPlayer(character: GamePlay.Character): GamePlay.Player {
        let targetPlayer: GamePlay.Player;
        GamePlay.PlayerMgr.ForEach((player, playerId) => {
            if (player.Character == character) {
                targetPlayer = player;
            }
        });
        return targetPlayer;
    }
    //#endregion

    // 获得陷阱过后显示按钮
    //#region client-only
    OnNtfGotTrap(...args): void {
        Events.DispatchLocal("UIEvents_GameUI_Btn", {
            show: true,
            callback: () => {
                console.log("--------------------UI btn call back");
                Events.DispatchToServer(EventsName.ReqUseTrap, null);
                Events.DispatchLocal("UIEvents_GameUI_Btn", { show: false, callback: null });
            }
        });
    }

    // 执行陷阱效果
    OnNtfPlayerInTrap(...args): void {
        let character = args.length > 1 ? (args[0] as GamePlay.Player).Character : GamePlay.GetCurrentPlayer().Character;
        if (character) {
            character.SetAnimationStance(GamePlay.AnimationStanceType.LayDown);
            character.CanMove = false;
            this.timerHandler = setTimeout(() => {
                character.SetAnimationStance(GamePlay.AnimationStanceType.Empty);
                character.CanMove = true;
                clearTimeout(this.timerHandler);
                this.timerHandler = 0;
            }, this.effectTime);
        }
    }
    //#endregion
}

export default MushroomTrap;