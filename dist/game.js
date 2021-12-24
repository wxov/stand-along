'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MWCore = require('MWCore');
var Events = require('Events');
var GamePlay = require('GamePlay');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var MWCore__default = /*#__PURE__*/_interopDefaultLegacy(MWCore);
var Events__default = /*#__PURE__*/_interopDefaultLegacy(Events);
var GamePlay__default = /*#__PURE__*/_interopDefaultLegacy(GamePlay);

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

var foreign2 = /*#__PURE__*/Object.freeze({
    __proto__: null
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
        if (this._mCurrentState) {
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

var foreign4 = /*#__PURE__*/Object.freeze({
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
        this._mCheckPointListener = Events__default['default'].AddLocalListener("GameEvents_CheckPoint", (player) => { this._mPlayerFinishGame = true; });
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

var foreign5 = /*#__PURE__*/Object.freeze({
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
            //TODO:: 切换到游戏状态.
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

var foreign6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    WaitingState: WaitingState,
    'default': WaitingState
});

/** * 游戏结算状态 */
class CalculateState {
    //是否成功通关游戏
    _mFinishedGame = false;
    //自动跳转等待状态的等待时间
    _mAutoGoWaitStateTime = 3;
    constructor(finishGame) {
        this._mFinishedGame = finishGame;
    }
    //进入状态
    Enter() {
        console.log("---[FSM Log]:: CalculateState Enter.");
        if (this._mFinishedGame) {
            //胜利之后结算逻辑.
            console.log("---[FSM Log]:: 胜利.");
        }
        else {
            //失败之后结算逻辑.
            console.log("---[FSM Log]:: 失败.");
        }
        //_mAutoGoWaitStateTime秒之后切换到等待状态.
        setTimeout(() => {
            //TODO::切换到等待状态.
            FSMManager.Instance.ChangeState(WaitingState);
        }, this._mAutoGoWaitStateTime);
    }
    Update() { }
    Exit() {
        console.log("---[FSM Log]:: CalculateState Exit.");
    }
}

var foreign3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CalculateState: CalculateState,
    'default': CalculateState
});

let GameLogic = class GameLogic extends MWCore__default['default'].MWScript {
    OnPlay() {
        FSMManager.Instance.ChangeState(WaitingState);
        this.bUseUpdate = true;
    }
    OnUpdate(dt) {
        FSMManager.Instance.Update(dt);
    }
};
GameLogic = __decorate([
    MWCore__default['default'].MWClass
], GameLogic);
var GameLogic$1 = GameLogic;

var foreign7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get GameLogic () { return GameLogic; },
    'default': GameLogic$1
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

var foreign8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': MovementDriver$3
});

let MovementDriver = class MovementDriver extends MWCore__default['default'].MWScript {
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
        // this._moveTimer += dt;
        // while (this._moveTimer >= this._moveTime) {
        //     this._moveTimer -= this._moveTime;
        //     this._direction = -this._direction;
        //     if (this._direction < 0) {
        //         this._from = this._max;
        //         this._to = this._min;
        //     }
        //     else {
        //         this._from = this._min;
        //         this._to = this._max;
        //     }
        // }
        // let location = this.gameObject.location;
        // if (this.moveAxis.match("y")) {
        //     location.y = this._lerpFloat(this._from, this._to, this._moveTimer / this._moveTime);
        // }
        // else if (this.moveAxis.match("z")) {
        //     location.z = this._lerpFloat(this._from, this._to, this._moveTimer / this._moveTime);
        // }
        // else {
        //     location.x = this._lerpFloat(this._from, this._to, this._moveTimer / this._moveTime);
        // }
        // this.gameObject.location = location;
    }
    _lerpFloat(from, to, ratio) {
        return from + (to - from) * ratio;
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

var foreign9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': MovementDriver$1
});

let Prick = class Prick extends MWCore__default['default'].MWScript {
    _trigger = null;
    OnLoad() { }
    OnPlay() {
        this._trigger = GamePlay__default['default'].GetBoxTrigger(this);
        this._trigger.OnEnter.Add(this.OnTriggerIn.bind(this));
        this._trigger.OnLeave.Add(this.OnTriggerOut.bind(this));
    }
    OnUpdate(dt) {
    }
    OnTriggerIn(hitGameObject) {
        if (!GamePlay__default['default'].IsCharacter(hitGameObject)) {
            return;
        }
        let character = hitGameObject;
        console.log("Prick.OnTriggerIn: ", character.GetName());
        character.ChatMessage = "疼 疼 疼";
    }
    OnTriggerOut(hitGameObject) {
        if (!GamePlay__default['default'].IsCharacter(hitGameObject)) {
            return;
        }
        let character = hitGameObject;
        console.log("Prick.OnTriggerOut: ", character.GetName());
        character.ChatMessage = "不疼 不疼 不疼 ";
    }
};
Prick = __decorate([
    MWCore__default['default'].MWClass
], Prick);
var Prick$1 = Prick;

var foreign10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Prick$1
});

const MWModuleMap = {
    'JavaScripts/ChangeClothes': foreign0,
    'JavaScripts/CheckPoint': foreign1,
    'JavaScripts/FSM/Interface/IFSMState': foreign2,
    'JavaScripts/FSM/States/CalculateState': foreign3,
    'JavaScripts/FSM/States/FSMManager': foreign4,
    'JavaScripts/FSM/States/GamingState': foreign5,
    'JavaScripts/FSM/States/WaitingState': foreign6,
    'JavaScripts/GameLogic': foreign7,
    'JavaScripts/MovementDriver': foreign8,
    'JavaScripts/PlayerStart': foreign9,
    'JavaScripts/Prick': foreign10,
};

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=game.js.map
