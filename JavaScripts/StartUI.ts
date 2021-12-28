/*
 * @Author: your name
 * @Date: 2021-12-27 19:32:57
 * @LastEditTime: 2021-12-28 20:16:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\StartUI.ts
 */

import * as UE from "ue";
import * as puerts from "puerts";
import EventsName from "./FSM/Interface/EventsName";
// import * as EN from "./FSM/Interface/EventsName"

@MWDesignerUI.MWUIMono
export default class UIDefault extends MWDesignerUI.MWUIBehaviour {


    UIShowName: string;
    rootCanvas: MWDesignerUI.MWUICanvas;
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
        console.log("OnInitialized ")
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
        console.log("PreConstruct ")
    }

    /**
      * Called after the underlying slate widget is constructed.  Depending on how the slate object is used
      * this event may be called multiple times due to adding and removing from the hierarchy.
      * If you need a true called-once-when-created event, use OnInitialized.
      */
    Construct() {
        console.log("Construct ")

        this.InitEvents()
    }

    /**
     * Called when a widget is no longer referenced causing the slate resource to destroyed.  Just like
     * Construct this event can be called multiple times.
     */
    Destruct() {
        console.log("Destruct ")
    }

    /**
     * Called when object is destroyed
     */
    OnDestroy() {
        console.log("OnDestroy ")
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
        let base = MWDesignerUI.MWUIUserWidget.Get(this.UIObject)

        this.rootCanvas = MWDesignerUI.MWUICanvas.Get(base.FindChildByPath("RootCanvas"))
        let startGame = MWDesignerUI.MWUIButton.Get(base.FindChildByPath("RootCanvas/Start_Game"))
        let outGame = MWDesignerUI.MWUIButton.Get(base.FindChildByPath("RootCanvas/Exit_Game"))
        let self = this
        startGame.OnClicked().Add(()=>{this.SwitchUIPrefab('Start_Game')})
        outGame.OnClicked().Add(()=>{this.SwitchUIPrefab('Exit_Game')})
    }

    SwitchUIPrefab(UIPrefabName: string) {
        switch (UIPrefabName) {
            case "Start_Game":
                console.log("Start the game")
                this.rootCanvas.SetVisibility(MWDesignerUI.ESlateVisibility.Hidden)
                Events.DispatchToServer(EventsName.CtoS_StartGame,null)
                break;
            case "Exit_Game":
                console.log("Exit the Game")
                break;
            default:
                break;
        }
    }


}