'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MWCore = require('MWCore');
var Events = require('Events');
var GamePlay = require('GamePlay');
var MWUI = require('MWUI');
var React = require('react');
var Type = require('Type');
var MWDesignerUI = require('MWDesignerUI');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var MWCore__default = /*#__PURE__*/_interopDefaultLegacy(MWCore);
var Events__default = /*#__PURE__*/_interopDefaultLegacy(Events);
var GamePlay__default = /*#__PURE__*/_interopDefaultLegacy(GamePlay);
var MWUI__default = /*#__PURE__*/_interopDefaultLegacy(MWUI);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var Type__default = /*#__PURE__*/_interopDefaultLegacy(Type);
var MWDesignerUI__default = /*#__PURE__*/_interopDefaultLegacy(MWDesignerUI);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

let ClothTest$2 = class ClothTest extends MWCore__default['default'].MWScript {
    OnLoad() {
        Events__default['default'].AddPlayerJoinedListener((player) => {
            this.RandomChangeCloth(player);
        });
    }
    RandomChangeCloth(player) {
        // let fashionID = this.GetRandomNum(0, 9);
        // player.Character.SetCloth(GamePlay.HumanFashionType.HumanTemp_Body, fashionID);
        // console.log("Character Body changed to " + fashionID);
        // fashionID = this.GetRandomNum(10, 13)
        // player.Character.SetCloth(GamePlay.HumanFashionType.HumanTemp_Face, fashionID);
        // console.log("Character Face changed to " + fashionID);
        // fashionID = this.GetRandomNum(14, 23)
        // player.Character.SetCloth(GamePlay.HumanFashionType.HumanTemp_Hair, fashionID);
        // console.log("Character Hair changed to " + fashionID);
    }
    GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
};
ClothTest$2 = __decorate([
    MWCore__default['default'].MWClass
], ClothTest$2);
var ClothTest$3 = ClothTest$2;

var foreign0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': ClothTest$3
});

// import GamePlayer from "./FSM/GamePlayer";
let ClothTest = class ClothTest extends MWCore__default['default'].MWScript {
    OnLoad() {
        let boxCollider = GamePlay__default['default'].GetBoxTrigger(this.gameObject);
        if (boxCollider) {
            boxCollider.OnEnter.Add(this.onAttachCheckPoint.bind(this));
        }
    }
    onAttachCheckPoint(other) {
        let a = other;
        if (other == a) {
            Events__default['default'].DispatchLocal("GameEvents_CheckPoint", other);
            Events__default['default'].DispatchLocal("GameEvents_OpentNext", other);
            a.ChatMessage = "chengong";
        }
    }
    OnDestroy() {
    }
};
ClothTest = __decorate([
    MWCore__default['default'].MWClass
], ClothTest);
var ClothTest$1 = ClothTest;

var foreign1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': ClothTest$1
});

/*
 * @Author: your name
 * @Date: 2021-12-28 18:36:40
 * @LastEditTime: 2021-12-28 20:16:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\FSM\Interface\EventsName.ts
 */
/**
 * 事件监听的名称
 */
var EventsName;
(function (EventsName) {
    /**
     * 服务器监听客户端
     */
    EventsName["CtoS_StartGame"] = "StartTheGame";
    EventsName["CtoS_ReqUseTrap"] = "ReqUseTrap";
    /**
     * 客户端监听服务端
     */
    EventsName["StoC_NtfGotTrap"] = "NtfGotTrap";
    EventsName["StoC_NtfPlayerInTrap"] = "NtfPlayerInTrap";
    /**
     * 本地监听
     */
    EventsName["toLocal_BTrapT"] = "OnBubbleTrapTriggerIn";
})(EventsName || (EventsName = {}));
var EventsName$1 = EventsName;

var foreign2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get EventsName () { return EventsName; },
    'default': EventsName$1
});

var foreign3 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

/** * 游戏结算状态 */
class CalculateState {
    //是否成功通关游戏
    _mFinishedGame = false;
    //自动跳转等待状态的等待时间
    // private _mAutoGoWaitStateTime: number = 3
    constructor(finishGame) {
        this._mFinishedGame = finishGame;
    }
    //进入状态
    Enter() {
        console.log("---[FSM Log]:: CalculateState Enter.");
        if (this._mFinishedGame) {
            //胜利之后结算逻辑.
            console.log("---[FSM Log]:: victory.");
            return;
        }
        else {
            //失败之后结算逻辑.
            console.log("---[FSM Log]:: defeat.");
        }
        //_mAutoGoWaitStateTime秒之后切换到等待状态.
        // setTimeout(() => {
        //::切换到等待状态.
        // FSMManager.Instance.ChangeState(WaitingState);
        // }, this._mAutoGoWaitStateTime);
    }
    Update() { }
    Exit() {
        console.log("---[FSM Log]:: CalculateState Exit.");
    }
}

var foreign4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CalculateState: CalculateState,
    'default': CalculateState
});

class FSMManager {
    //单例模式.
    static get Instance() {
        if (FSMManager._mInstance == null) {
            FSMManager._mInstance = new FSMManager();
        }
        return FSMManager._mInstance;
    }
    static _mInstance;
    /**
    * 状态轮询
    * @param dt 轮询间隔
    */
    Update(dt) {
        if (this._mCurrentState) {
            this._mCurrentState.Update(dt);
        }
    }
    /**
    * 切换状态.
    * @param c 新的状态
    * @param params 参数
    */
    ChangeState(c, params) {
        //退出当前状态
        if (this._mCurrentState !== null) {
            this._mCurrentState.Exit();
            this._mCurrentState = null;
        }
        let newState = new c(params);
        newState.Enter();
        this._mCurrentState = newState;
    }
    /**
    * 返回当前状态
    */
    get CurrentState() {
        return this._mCurrentState;
    }
    /**
    * 当前状态
    */
    _mCurrentState = null;
}

var foreign5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FSMManager: FSMManager,
    'default': FSMManager
});

class GamingState {
    /**
    * 当前已经运行的游戏时间
    */
    _mCurrentGamingTime = 0;
    /**
    * 本状态最多持续时间
    */
    GamingTime = 10;
    /**
    * 是否已经完成游戏
    */
    _mPlayerFinishGame = false;
    //监听的事件返回值, 用于断开连接.
    _mCheckPointListener;
    /**
    * 进入状态
    */
    Enter() {
        this._mCurrentGamingTime = 0;
        this._mCheckPointListener = Events__default['default'].AddLocalListener("GameEvents_CheckPoint", (player) => {
            this._mPlayerFinishGame = true;
        });
        console.log("---[FSM Log]:: GamingState Enter.");
    }
    /**
    * 状态轮询
    * 等待时间叠加
    */
    Update(dt) {
        this._mCurrentGamingTime += dt;
        if (this._mCurrentGamingTime >= this.GamingTime || this._mPlayerFinishGame) {
            FSMManager.Instance.ChangeState(CalculateState, this._mPlayerFinishGame);
        }
    }
    /**
    * 退出状态
    */
    Exit() {
        this._mCheckPointListener.Disconnect();
        this._mCheckPointListener = null;
        console.log("---[FSM Log]:: GamingState Exit.");
    }
}

var foreign6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GamingState: GamingState,
    'default': GamingState
});

class WaitingState {
    //玩家已经等待的时间
    _mCurrentWaitTime = 0;
    /**
    * 进入状态
    */
    Enter() {
        //进入此状态的时候, 等待时长时间清零.
        this._mCurrentWaitTime = 0;
        console.log("---[FSM Log]:: WaitingState Enter.");
    }
    /**
    * 状态轮询
    * 等待时间叠加
    */
    Update(dt) {
        this._mCurrentWaitTime += dt;
        if (this._mCurrentWaitTime >= 10) {
            // 切换到游戏状态.
            FSMManager.Instance.ChangeState(GamingState);
        }
    }
    /**
    * 退出状态
    */
    Exit() {
        console.log("---[FSM Log]:: WaitingState Exit.");
    }
}

var foreign7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    WaitingState: WaitingState,
    'default': WaitingState
});

/*
 * @Author: your name
 * @Date: 2021-12-28 16:45:18
 * @LastEditTime: 2021-12-28 18:15:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\GameStaus\GameStatus.ts
 */
class GameStatus {
    isStart;
    isEnd;
    static _mInstance;
    static get Instance() {
        if (this._mInstance == null) {
            return this._mInstance = new GameStatus();
        }
        return this._mInstance;
    }
    /**
     * 改变游戏是否为开始状态
     * @param is 是否开始游戏
     */
    ChangeStartState(is) {
        this.isStart = is;
    }
    /**
     * 改变游戏时候为结束状态
     * @param is 游戏是否结束
     */
    ChangeEndState(is) {
        this.isEnd = is;
    }
    get IsEnd() {
        return this.isEnd;
    }
    get IsStart() {
        return this.isStart;
    }
}

var foreign9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GameStatus: GameStatus,
    'default': GameStatus
});

let GameLogic = class GameLogic extends MWCore__default['default'].MWScript {
    PlayerNum = 0;
    ReadyPlayerNum = 0;
    OnPlay() {
        if (this.IsRunningClient()) ;
        else {
            Events__default['default'].AddPlayerJoinedListener(() => { this.PlayerNum += 1; });
            Events__default['default'].AddClientListener(EventsName$1.CtoS_StartGame, () => {
                this.ReadyPlayerNum += 1;
                if (this.PlayerNum == this.ReadyPlayerNum) {
                    GameStatus.Instance.ChangeStartState(true);
                    FSMManager.Instance.ChangeState(WaitingState);
                }
            });
        }
        this.bUseUpdate = true;
    }
    OnUpdate(dt) {
        if (GameStatus.Instance.IsStart) {
            FSMManager.Instance.Update(dt);
        }
    }
};
GameLogic = __decorate([
    MWCore__default['default'].MWClass
], GameLogic);
var GameLogic$1 = GameLogic;

var foreign8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get GameLogic () { return GameLogic; },
    'default': GameLogic$1
});

// import * as React from "react"
// const { CanvasPanel, TextBlock, Image, EditableText, Button } = MWUI
class UIUtils {
    static CreateSlot(left, top, right, bottom, minimum, maximum, alignment, autoSize) {
        return {
            LayoutData: {
                /**
                * (0,0)----------
                * |             |
                * |             |
                * |             |
                * |             |
                * -----------(1,1)
                */
                Offsets: {
                    Left: left,
                    Top: top,
                    Right: right,
                    Bottom: bottom, //height
                },
                Anchors: {
                    Minimum: minimum ? minimum : new Type__default['default'].Vector2(0.5, 0),
                    Maximum: maximum ? maximum : new Type__default['default'].Vector2(0.5, 0),
                },
                //对齐点
                Alignment: alignment ? alignment : new Type__default['default'].Vector2(0.5, 0)
            },
            bAutoSize: (autoSize == null || autoSize == undefined) ? false : autoSize
        };
    }
    static defaultTextColorAndOpacity() {
        return { SpecifiedColor: Type__default['default'].LinearColor.BLACK };
    }
}

var foreign19 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UIUtils: UIUtils,
    'default': UIUtils
});

const { CanvasPanel: CanvasPanel$1, TextBlock: TextBlock$1, Button: Button$1, VirtualJoystickPanel, Image: Image$1 } = MWUI__default['default'];
class GameUI extends React__namespace.Component {
    onClick;
    timerID;
    constructor(props) {
        super(props);
        this.state =
            {
                readyTextVisible: false,
                readyText: 3,
                useButtonVisible: false,
                timer: 0,
                timePassed: 1,
            };
    }
    componentDidMount() {
        Events__default['default'].AddLocalListener("UIEvents_GameUI_Start", () => {
            this.timerID = setInterval(() => this.tick(), 0);
            this.setState({ readyTextVisible: true });
        });
        Events__default['default'].AddLocalListener("UIEvents_GameUI_Btn", (event) => {
            this.onClick = event.callback;
            this.setState({ useButtonVisible: event.show, });
        });
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({ timer: this.state.timer + 1, });
        if (this.state.timer > (1000 * this.state.timePassed)) {
            if (this.state.readyText > 0) {
                this.setState({
                    timePassed: this.state.timePassed + 1,
                    readyText: this.state.readyText - 1,
                });
            }
            else {
                this.setState({
                    readyTextVisible: false,
                });
            }
        }
    }
    render() {
        return React__namespace.createElement(CanvasPanel$1, null,
            React__namespace.createElement(TextBlock$1, { Slot: UIUtils.CreateSlot(30, 100, 100, 100), Text: this.state.readyText === 0 ? "开始！" : this.state.readyText.toString(), Visibility: this.state.readyTextVisible ? MWUI__default['default'].ESlateVisibility.Visible : MWUI__default['default'].ESlateVisibility.Hidden, Font: { Size: 60 } }),
            React__namespace.createElement(Button$1, { Slot: UIUtils.CreateSlot(450, 800, 150, 80), Visibility: this.state.useButtonVisible ? MWUI__default['default'].ESlateVisibility.Visible : MWUI__default['default'].ESlateVisibility.Hidden, OnClicked: () => {
                    if (this.onClick)
                        this.onClick();
                } },
                React__namespace.createElement(TextBlock$1, { Visibility: this.state.useButtonVisible ? MWUI__default['default'].ESlateVisibility.Visible : MWUI__default['default'].ESlateVisibility.Hidden, Text: "\u4F7F\u7528", ColorAndOpacity: UIUtils.defaultTextColorAndOpacity() })));
    }
}
Events__default['default'].AddUIRenderListener(render => {
    render(React__namespace.createElement(GameUI, null));
});

var foreign10 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

let MovementDriver$2 = class MovementDriver extends MWCore__default['default'].MWScript {
    moveFirstDirection = 1;
    moveAxis = "x"; // "x" or "y" or "z"
    moveDistance = 100;
    moveSpeed = 10;
    _moveTimer = 0;
    _moveTime = 0;
    _direction = 0; // 1: min -> max, -1: max -> min
    _max = 0;
    _min = 0;
    _from = 0;
    _to = 0;
    OnLoad() {
    }
    OnPlay() {
        this.bUseUpdate = true;
        let location = this.gameObject.location;
        if (this.moveAxis.match("y")) {
            this._max = location.y + this.moveDistance;
            this._min = location.y - this.moveDistance;
            this._from = location.y;
        }
        else if (this.moveAxis.match("z")) {
            this._max = location.z + this.moveDistance;
            this._min = location.z - this.moveDistance;
            this._from = location.z;
        }
        else {
            this._max = location.x + this.moveDistance;
            this._min = location.x - this.moveDistance;
            this._from = location.x;
        }
        this._direction = this.moveFirstDirection;
        this._to = this._direction > 0 ? this._max : this._min;
        this._moveTime = Math.abs(this._to - this._from) / this.moveSpeed;
    }
    OnUpdate(dt) {
        if (!GamePlay__default['default'].IsServer())
            return;
        if (GameStatus.Instance.IsStart) {
            this.MoveShape(dt);
        }
    }
    /**
     * 移动
     * @param dt
     */
    MoveShape(dt) {
        this._moveTimer += dt;
        while (this._moveTimer >= this._moveTime) {
            this._moveTimer -= this._moveTime;
            this._direction = -this._direction;
            if (this._direction < 0) {
                this._from = this._max;
                this._to = this._min;
            }
            else {
                this._from = this._min;
                this._to = this._max;
            }
        }
        this.ChangePosition();
    }
    /**
     * 改变位置
     */
    ChangePosition() {
        let location = this.gameObject.location;
        if (this.moveAxis.match("y")) {
            location.y = this._lerpFloat(this._from, this._to, this._moveTimer / this._moveTime);
        }
        else if (this.moveAxis.match("z")) {
            location.z = this._lerpFloat(this._from, this._to, this._moveTimer / this._moveTime);
        }
        else {
            location.x = this._lerpFloat(this._from, this._to, this._moveTimer / this._moveTime);
        }
        this.gameObject.location = location;
    }
    /**
     * 计算移动的距离
     * @param from
     * @param to
     * @param ratio
     * @returns
     */
    _lerpFloat(from, to, ratio) {
        return from + (to - from) * ratio;
    }
};
__decorate([
    MWCore__default['default'].MWProperty()
], MovementDriver$2.prototype, "moveFirstDirection", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true })
], MovementDriver$2.prototype, "moveAxis", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true })
], MovementDriver$2.prototype, "moveDistance", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true })
], MovementDriver$2.prototype, "moveSpeed", void 0);
MovementDriver$2 = __decorate([
    MWCore__default['default'].MWClass
], MovementDriver$2);
var MovementDriver$3 = MovementDriver$2;

var foreign11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': MovementDriver$3
});

// import * as EN from "./FSM/Interface/EventsName";
// export namespace EventsName {
//     export const ReqUseTrap = "ReqUseTrap"
//     export const NtfGotTrap = "NtfGotTrap"
//     export const NtfPlayerInTrap = "NtfPlayerInTrap"
// }
let MushroomTrap = class MushroomTrap extends MWCore__default['default'].MWScript {
    id = 0;
    effectTime = 5000;
    listeners = [];
    timerHandler;
    ownerId = 0;
    trigger;
    OnLoad() {
    }
    OnPlay() {
        // this.timerHandler = 
        setTimeout(() => {
            for (const go of this.gameObject.GetChildren()) {
                if (GamePlay__default['default'].IsSphereTrigger(go)) {
                    this.trigger = GamePlay__default['default'].GetSphereTrigger(go);
                    break;
                }
                else if (GamePlay__default['default'].IsBoxTrigger(go)) {
                    this.trigger = GamePlay__default['default'].GetBoxTrigger(go);
                    break;
                }
            }
            if (this.IsRunningClient()) {
                this.listeners.push(Events__default['default'].AddServerListener(EventsName$1.StoC_NtfGotTrap, this.OnNtfGotTrap.bind(this)));
                this.listeners.push(Events__default['default'].AddServerListener(EventsName$1.StoC_NtfPlayerInTrap, this.OnNtfPlayerInTrap.bind(this)));
            }
            else {
                this.listeners.push(Events__default['default'].AddLocalListener(EventsName$1.toLocal_BTrapT, this.OnBubbleTrapTriggerIn.bind(this)));
                this.listeners.push(Events__default['default'].AddClientListener(EventsName$1.CtoS_ReqUseTrap, this.OnReqUseTrap.bind(this)));
            }
            // clearTimeout(this.timerHandler);
            // this.timerHandler = 0;
        }, 3000);
    }
    OnUpdate(dt) {
    }
    OnStop() {
    }
    OnDestroy() {
        for (const linstener of this.listeners) {
            try {
                linstener.Disconnect();
            }
            catch (error) {
                console.log(error);
            }
        }
        this.listeners.length = 0;
    }
    // 使用陷阱
    //#region server-only
    OnReqUseTrap(player, args) {
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
    OnReqPickTrap(player, args) {
        if (!this.ownerId) {
            this.ownerId = player.GetPlayerID();
            Events__default['default'].DispatchToClient(player, EventsName$1.StoC_NtfGotTrap, this.id);
            this.trigger.SetCollisionEnabled(false);
            this.gameObject.Actor.SetActorHiddenInGame(true);
        }
    }
    // 触发陷阱
    OnBubbleTrapTriggerIn(args) {
        console.log("--------------------OnBubbleTrapTriggerIn:" + args.gameObject.GetName());
        let targetPlayer = this.GetCharacterPlayer(args.gameObject);
        if (!this.ownerId) {
            console.error("----------" + targetPlayer);
            if (targetPlayer) {
                this.ownerId = targetPlayer.GetPlayerID();
                Events__default['default'].DispatchToClient(targetPlayer, EventsName$1.StoC_NtfGotTrap, targetPlayer.GetPlayerID());
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
            Events__default['default'].DispatchToAllClient(targetPlayer, EventsName$1.StoC_NtfPlayerInTrap, targetPlayer.GetPlayerID());
        }
    }
    // 获取触发陷阱的玩家
    GetCharacterPlayer(character) {
        let targetPlayer;
        GamePlay__default['default'].PlayerMgr.ForEach((player, playerId) => {
            if (player.Character == character) {
                targetPlayer = player;
                // return player;
            }
        });
        return targetPlayer;
    }
    //#endregion
    // 获得陷阱过后显示按钮
    //#region client-only
    OnNtfGotTrap(...args) {
        Events__default['default'].DispatchLocal("UIEvents_GameUI_Btn", {
            show: true,
            callback: () => {
                console.log("--------------------UI btn call back");
                Events__default['default'].DispatchToServer(EventsName$1.CtoS_ReqUseTrap, null);
                Events__default['default'].DispatchLocal("UIEvents_GameUI_Btn", { show: false, callback: null });
            }
        });
    }
    // 执行陷阱效果
    OnNtfPlayerInTrap(...args) {
        let character = args.length > 1 ? args[0].Character : GamePlay__default['default'].GetCurrentPlayer().Character;
        if (character && this.ownerId != this.GetCharacterPlayer(character).GetPlayerID()) {
            character.SetAnimationStance(GamePlay__default['default'].AnimationStanceType.LayDown);
            character.CanMove = false;
            // this.timerHandler = 
            setTimeout(() => {
                character.SetAnimationStance(GamePlay__default['default'].AnimationStanceType.Empty);
                character.CanMove = true;
                // clearTimeout(this.timerHandler);
                // this.timerHandler = 0;
            }, this.effectTime);
        }
    }
};
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true })
], MushroomTrap.prototype, "id", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true, displayName: "效果持续时间（毫秒）" })
], MushroomTrap.prototype, "effectTime", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true })
], MushroomTrap.prototype, "ownerId", void 0);
MushroomTrap = __decorate([
    MWCore__default['default'].MWClass
], MushroomTrap);
var MushroomTrap$1 = MushroomTrap;

var foreign12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': MushroomTrap$1
});

let MovementDriver = class MovementDriver extends MWCore__default['default'].MWScript {
    moveFirstDirection = 1;
    moveAxis = "z"; // "x" or "y" or "z"
    moveDistance = 400;
    moveSpeed = 10;
    _moveTimer = 0;
    _moveTime = 0;
    _direction = 0; // 1: min -> max, -1: max -> min
    _max = 0;
    _min = 0;
    _from = 0;
    _to = 0;
    //监听的事件返回值, 用于断开连接.
    _mOpentNextListener = null;
    _mPlayerFinishGame = false;
    OnLoad() {
    }
    OnPlay() {
        this.bUseUpdate = true;
        this._mOpentNextListener = Events__default['default'].AddLocalListener("GameEvents_OpentNext", (player) => {
            this._mPlayerFinishGame = true;
        });
        let location = this.gameObject.location;
        this._max = location.z + this.moveDistance;
        // this._min = location.z - this.moveDistance;
        this._from = this._max;
        this._direction = this.moveFirstDirection;
        this._to = location.z;
        this._moveTime = Math.abs(this._to - this._from) / this.moveSpeed;
    }
    OnUpdate(dt) {
        if (!GamePlay__default['default'].IsServer())
            return;
        if (this._mPlayerFinishGame) {
            this._moveTimer += dt;
            while (this._moveTimer >= this._moveTime) {
                this._moveTimer -= this._moveTime;
            }
            if (this._from >= this._to) {
                let location = this.gameObject.location;
                location.z = this._lerpFloat(this._to, this._moveTimer / this._moveTime);
                this.gameObject.location = location;
            }
        }
    }
    _lerpFloat(to, ratio) {
        this._to = to + this.moveSpeed * ratio;
        return this._to;
    }
};
__decorate([
    MWCore__default['default'].MWProperty()
], MovementDriver.prototype, "moveFirstDirection", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true })
], MovementDriver.prototype, "moveAxis", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true })
], MovementDriver.prototype, "moveDistance", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true })
], MovementDriver.prototype, "moveSpeed", void 0);
MovementDriver = __decorate([
    MWCore__default['default'].MWClass
], MovementDriver);
var MovementDriver$1 = MovementDriver;

var foreign13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': MovementDriver$1
});

let ReadytoStart = class ReadytoStart extends MWCore__default['default'].MWScript {
    moveFirstDirection = 1;
    moveAxis = "l"; // "x" or "y" or "z"
    moveDistance = 200;
    moveSpeed = 10;
    timeAfter = 10;
    goTime = 0;
    _moveTimer = 0;
    _moveTime = 0;
    _direction = 0; // 1: min -> max, -1: max -> min
    _from = 0;
    _to = 0;
    _mPlayerFinishGame = false;
    OnLoad() {
    }
    OnPlay() {
        this.bUseUpdate = true;
        let location = this.gameObject.location;
        this._from = this.moveAxis == "l" ? location.y - this.moveDistance : location.y + this.moveDistance;
        this._direction = this.moveFirstDirection;
        this._to = location.y;
        this._moveTime = Math.abs(this._to - this._from) / this.moveSpeed;
    }
    OnUpdate(dt) {
        if (!GamePlay__default['default'].IsServer())
            return;
        if (this.timeAfter <= this.goTime) {
            this._mPlayerFinishGame = true;
        }
        else {
            this.goTime += dt;
        }
        if (this._mPlayerFinishGame && GameStatus.Instance.IsStart) {
            this._moveTimer += dt;
            while (this._moveTimer >= this._moveTime) {
                this._moveTimer -= this._moveTime;
            }
            if (this.moveAxis == "l" ? this._from <= this._to : this._from >= this._to) {
                let location = this.gameObject.location;
                location.y = this._lerpFloat(this._to, this._moveTimer / this._moveTime);
                this.gameObject.location = location;
            }
        }
    }
    _lerpFloat(to, ratio) {
        this._to = this.moveAxis == "l" ? to - this.moveSpeed * ratio : to + this.moveSpeed * ratio;
        return this._to;
    }
};
__decorate([
    MWCore__default['default'].MWProperty()
], ReadytoStart.prototype, "moveFirstDirection", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true })
], ReadytoStart.prototype, "moveAxis", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true })
], ReadytoStart.prototype, "moveDistance", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true })
], ReadytoStart.prototype, "moveSpeed", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ replicated: true })
], ReadytoStart.prototype, "timeAfter", void 0);
ReadytoStart = __decorate([
    MWCore__default['default'].MWClass
], ReadytoStart);
var ReadytoStart$1 = ReadytoStart;

var foreign14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': ReadytoStart$1
});

let Rotator = class Rotator extends MWCore__default['default'].MWScript {
    RotationSpeed = 10;
    OnStart() {
        this.bUseUpdate = true;
    }
    OnUpdate(dt) {
        let rotation = this.gameObject.rotation;
        rotation.z += this.RotationSpeed * dt;
        this.gameObject.rotation = rotation;
    }
};
__decorate([
    MWCore__default['default'].MWProperty()
], Rotator.prototype, "RotationSpeed", void 0);
Rotator = __decorate([
    MWCore__default['default'].MWClass
], Rotator);
var Rotator$1 = Rotator;

var foreign15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Rotator$1
});

// import * as EN from "./FSM/Interface/EventsName"
let UIDefault = class UIDefault extends MWDesignerUI__default['default'].MWUIBehaviour {
    UIShowName;
    rootCanvas;
    constructor(o) {
        super(o);
        this.UIShowName = '';
    }
    /**
    * Called once only at game time on non-template instances.
    * childs slot will not be ready for use WARNING:do not find child
    * all children may not be generate
    */
    OnInitialized() {
        console.log("OnInitialized ");
    }
    /**
     * Called by both the game and the editor.  Allows users to run initial setup for their widgets to better preview
     * the setup in the designer and since generally that same setup code is required at runtime, it's called there
     * as well.
     *
     * **WARNING**
     * This is intended purely for cosmetic updates using locally owned data, you can not safely access any game related
     * state, if you call something that doesn't expect to be run at editor time, you may crash the editor.
     *
     * In the event you save the asset with blueprint code that causes a crash on evaluation.  You can turn off
     * PreConstruct evaluation in the Widget Designer settings in the Editor Preferences.
     */
    PreConstruct() {
        console.log("PreConstruct ");
    }
    /**
      * Called after the underlying slate widget is constructed.  Depending on how the slate object is used
      * this event may be called multiple times due to adding and removing from the hierarchy.
      * If you need a true called-once-when-created event, use OnInitialized.
      */
    Construct() {
        console.log("Construct ");
        this.InitEvents();
    }
    /**
     * Called when a widget is no longer referenced causing the slate resource to destroyed.  Just like
     * Construct this event can be called multiple times.
     */
    Destruct() {
        console.log("Destruct ");
    }
    /**
     * Called when object is destroyed
     */
    OnDestroy() {
        console.log("OnDestroy ");
    }
    /**
     * Ticks this widget.  Override in derived classes, but always call the parent implementation.
     *
     * @param  MyGeometry The space allotted for this widget
     * @param  InDeltaTime  Real time passed since last tick
     * if has this function c++ can be called this
     */
    // Tick(MyGeometry : UE.Geometry, InDeltaTime : number){
    // }
    InitEvents() {
        let base = MWDesignerUI__default['default'].MWUIUserWidget.Get(this.UIObject);
        this.rootCanvas = MWDesignerUI__default['default'].MWUICanvas.Get(base.FindChildByPath("RootCanvas"));
        let startGame = MWDesignerUI__default['default'].MWUIButton.Get(base.FindChildByPath("RootCanvas/Start_Game"));
        let outGame = MWDesignerUI__default['default'].MWUIButton.Get(base.FindChildByPath("RootCanvas/Exit_Game"));
        startGame.OnClicked().Add(() => { this.SwitchUIPrefab('Start_Game'); });
        outGame.OnClicked().Add(() => { this.SwitchUIPrefab('Exit_Game'); });
    }
    SwitchUIPrefab(UIPrefabName) {
        switch (UIPrefabName) {
            case "Start_Game":
                console.log("Start the game");
                this.rootCanvas.SetVisibility(MWDesignerUI__default['default'].ESlateVisibility.Hidden);
                Events__default['default'].DispatchToServer(EventsName$1.CtoS_StartGame, null);
                break;
            case "Exit_Game":
                console.log("Exit the Game");
                break;
        }
    }
};
UIDefault = __decorate([
    MWDesignerUI__default['default'].MWUIMono
], UIDefault);
var UIDefault$1 = UIDefault;

var foreign16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': UIDefault$1
});

// import EN from "./FSM/Interface/EventsName"
let TriggerEventDispatcher = class TriggerEventDispatcher extends MWCore__default['default'].MWScript {
    TriggerName = "";
    FillterCharacter = false;
    trigger;
    OnPlay() {
        if (GamePlay__default['default'].IsSphereTrigger(this.gameObject)) {
            this.trigger = GamePlay__default['default'].GetSphereTrigger(this.gameObject);
        }
        else if (GamePlay__default['default'].IsBoxTrigger(this.gameObject)) {
            this.trigger = GamePlay__default['default'].GetBoxTrigger(this.gameObject);
        }
        else {
            console.error("=======>TriggerEventDispatcher's parent must be a trigger!!!");
        }
        this.trigger.OnEnter.Add(this.OnTriggerIn.bind(this));
        this.trigger.OnLeave.Add(this.OnTriggerOut.bind(this));
    }
    OnTriggerIn(go) {
        if (this.FillterCharacter && !GamePlay__default['default'].IsCharacter(go)) {
            return;
        }
        Events__default['default'].DispatchLocal(EventsName$1.toLocal_BTrapT, { gameObject: go, trigger: this.trigger });
    }
    OnTriggerOut(go) {
        if (this.FillterCharacter && !GamePlay__default['default'].IsCharacter(go)) {
            return;
        }
        Events__default['default'].DispatchLocal(this.TriggerName + "Out", { gameObject: go, trigger: this.trigger });
    }
    OnStop() {
        this.trigger.OnEnter.Remove(this.OnTriggerIn);
        this.trigger.OnLeave.Remove(this.OnTriggerOut);
    }
    OnDestroy() {
    }
};
__decorate([
    MWCore__default['default'].MWProperty({ displayName: "TriggerName", tooltip: "会分别派发{$TriggerName}In和{$TriggerName}Out事件" })
], TriggerEventDispatcher.prototype, "TriggerName", void 0);
__decorate([
    MWCore__default['default'].MWProperty({ displayName: "只响应Character" })
], TriggerEventDispatcher.prototype, "FillterCharacter", void 0);
TriggerEventDispatcher = __decorate([
    MWCore__default['default'].MWClass
], TriggerEventDispatcher);
var TriggerEventDispatcher$1 = TriggerEventDispatcher;

var foreign17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': TriggerEventDispatcher$1
});

const { CanvasPanel, Button, TextBlock, Image } = MWUI__default['default'];
var a1 = 0.2;
var t1 = 300;
var t2 = 200;
var t3 = 250;
var a2 = 0.5;
var interval = 100;
var moveTime = 100;
var showingMaxNum = 1;
var messageTimers = [0, interval, interval * 2];
function clamp01(t) {
    if (t > 1)
        return 1;
    else if (t < 0)
        return 0;
    else
        return t;
}
function Flip(t) {
    return 1 - t;
}
function Square(x) {
    return x * x;
}
function EaseOut(t) {
    return Flip(Square(Flip(t)));
}
function NumberLerp(start_value, end_value, t) {
    t = clamp01(t);
    t = EaseOut(t);
    return start_value + (end_value - start_value) * t;
}
var imageProps = {
    ImageSize: new Type__default['default'].Vector2(600, 80),
};
var backgroundImageSlot = {
    LayoutData: {
        Offsets: {
            Left: -400,
            Right: 800,
            Top: -30,
            Bottom: 60
        },
        Anchors: {
            Minimum: new Type__default['default'].Vector2(0.5, 0.5),
            Maximum: new Type__default['default'].Vector2(0.5, 0.5),
        }
    }
};
var textSlot = {
    LayoutData: {
        Offsets: {
            Left: -100,
            Right: 800,
            Top: -20,
            Bottom: 0
        },
        Anchors: {
            Minimum: new Type__default['default'].Vector2(0.5, 0.5),
            Maximum: new Type__default['default'].Vector2(0.5, 0.5),
        }
    }
};
function GetNextMessage() {
    Events__default['default'].DispatchLocal("UIEvents_RemoveMessage", 0);
}
var messagePosY = [-300, -200, -100];
var tempPosY = [0, 0, 0];
function SetTempPosY(index, value) {
    tempPosY[index] = value;
}
class ToastContainer extends React__namespace.Component {
    timerID;
    constructor(props) {
        super(props);
        this.state =
            {
                messageList: [],
                messageToShow: [],
                messageToShowInitTimer: [],
                mainTimer: 0,
                messageTimer: 0,
            };
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 0);
        Events__default['default'].AddLocalListener("UIEvents_FloatMessage", (message) => {
            this.setState({ messageToShow: this.state.messageList.filter((_, i) => i !== 0) });
            this.setState({ messageList: [...this.state.messageList, message] });
        });
        Events__default['default'].AddLocalListener("UIEvents_RemoveMessage", () => {
            this.setState({ messageToShow: this.state.messageList.filter((_, i) => i !== 0) });
        });
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            mainTimer: this.state.mainTimer + 1,
            messageTimer: this.state.messageTimer + 1
        });
        if (this.state.messageTimer > interval || this.state.messageToShow.length === 0) {
            //console.log("------------------------**************************0 list length = " + this.state.messageList.length); 
            // 取出 message
            if (this.state.messageList.length > 0 && this.state.messageToShow.length < showingMaxNum) {
                //SetMessageTimer(messageTimer = 0);
                let message = this.state.messageList[0];
                let filteredArray = this.state.messageList.filter((_, i) => i !== 0);
                this.setState({
                    messageTimer: 0,
                    messageList: filteredArray,
                    messageToShow: [...this.state.messageToShow, message],
                    messageToShowInitTimer: [...this.state.messageToShowInitTimer, this.state.mainTimer]
                });
                //console.log("------------------------**************************3 " + this.state.mainTimer.toString());
            }
        }
    }
    render() {
        return React__namespace.createElement(CanvasPanel, null,
            React__namespace.createElement(Toast, { message: this.state.messageToShow[0] ? this.state.messageToShow[0] : "", timer: this.state.messageToShowInitTimer[0] ? this.state.messageToShowInitTimer[0] : 0, index: 0 }));
    }
}
class Toast extends React__namespace.Component {
    timerID;
    constructor(props) {
        super(props);
        this.state =
            {
                renderOpactity: 0,
                y: 0,
                timer: 0,
                showed: false,
            };
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 0);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        if (this.props.timer > 0 && this.props.message !== "") {
            if (this.state.showed !== true) {
                this.setState({
                    timer: this.props.timer,
                    showed: true
                });
            }
            else {
                this.setState({
                    timer: this.state.timer + 1
                });
                let currentTimer = this.state.timer - this.props.timer;
                if ((currentTimer - messageTimers[this.props.index]) > (moveTime + t2)) {
                    // 隐藏 
                    this.setState({ renderOpactity: NumberLerp(a2, 0.0, (currentTimer - messageTimers[this.props.index] - moveTime - t2) / t3) });
                    if (this.state.renderOpactity < 0.01) {
                        GetNextMessage();
                        //ChangeTimer(this.props.index, currentTimer);
                        //UpdateMessagePosY();
                        this.setState({ showed: false });
                    }
                }
                else if ((currentTimer - messageTimers[this.props.index]) > moveTime &&
                    (currentTimer - messageTimers[this.props.index]) < (moveTime + t2)) {
                    // 悬停
                    if (this.state.y > messagePosY[this.props.index]) {
                        this.setState({
                            y: this.state.y - 0.5
                        });
                    }
                }
                else if ((currentTimer - messageTimers[this.props.index]) <= moveTime) {
                    // 出现
                    this.setState({
                        y: NumberLerp(0, messagePosY[this.props.index], (currentTimer - messageTimers[this.props.index]) / moveTime),
                        renderOpactity: NumberLerp(a1, 1.0, (currentTimer - messageTimers[this.props.index]) / t1)
                    });
                    SetTempPosY(this.props.index, this.state.y);
                }
            }
        }
    }
    render() {
        if (this.props.message == "") {
            return React__namespace.createElement(React__namespace.Fragment, null);
        }
        else {
            return React__namespace.createElement(React__namespace.Fragment, null,
                React__namespace.createElement(Image, { Slot: backgroundImageSlot, Brush: imageProps, ColorAndOpacity: Type__default['default'].LinearColor.GRAY, RenderTransform: { Translation: new Type__default['default'].Vector2(0, this.state.y) }, RenderOpacity: this.state.renderOpactity }),
                React__namespace.createElement(TextBlock, { Slot: textSlot, Text: this.props.message, RenderTransform: { Translation: new Type__default['default'].Vector2(0, this.state.y) }, RenderOpacity: this.state.renderOpactity }));
        }
    }
}
Events__default['default'].AddUIRenderListener(render => {
    render(React__namespace.createElement(ToastContainer, null));
});

var foreign18 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

const MWModuleMap = {
    'JavaScripts/ChangeClothes': foreign0,
    'JavaScripts/CheckPoint': foreign1,
    'JavaScripts/FSM/Interface/EventsName': foreign2,
    'JavaScripts/FSM/Interface/IFSMState': foreign3,
    'JavaScripts/FSM/States/CalculateState': foreign4,
    'JavaScripts/FSM/States/FSMManager': foreign5,
    'JavaScripts/FSM/States/GamingState': foreign6,
    'JavaScripts/FSM/States/WaitingState': foreign7,
    'JavaScripts/GameLogic': foreign8,
    'JavaScripts/GameStatus/GameStatus': foreign9,
    'JavaScripts/GameUI': foreign10,
    'JavaScripts/MovementDriver': foreign11,
    'JavaScripts/MushroomTrap': foreign12,
    'JavaScripts/OpentNext': foreign13,
    'JavaScripts/ReadytoStart': foreign14,
    'JavaScripts/Rotator': foreign15,
    'JavaScripts/StartUI': foreign16,
    'JavaScripts/TriggerEventD': foreign17,
    'JavaScripts/UIFloatMessage': foreign18,
    'JavaScripts/UIUtils': foreign19,
};

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=game.js.map
