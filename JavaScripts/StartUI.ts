
import * as UE from "ue";
import * as puerts from "puerts";

@MWDesignerUI.MWUIMono
export default class UIDefault extends MWDesignerUI.MWUIBehaviour {
    

    constructor(o){
        super(o)
    }


     /** 
	 * Called once only at game time on non-template instances.
     * childs slot will not be ready for use WARNING:do not find child 
     * all children may not be generate
	 */
    OnInitialized(){
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
    PreConstruct(){
        console.log("PreConstruct ")
    }

   /**
	 * Called after the underlying slate widget is constructed.  Depending on how the slate object is used
	 * this event may be called multiple times due to adding and removing from the hierarchy.
	 * If you need a true called-once-when-created event, use OnInitialized.
	 */
    Construct(){
        console.log("Construct ")
      
        this.InitEvents()
    }

    /**
	 * Called when a widget is no longer referenced causing the slate resource to destroyed.  Just like
	 * Construct this event can be called multiple times.
	 */
    Destruct(){
        console.log("Destruct ")
    }

    /**
     * Called when object is destroyed
     */
    OnDestroy(){
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

    InitEvents(){
        let base = this.UIObject as unknown as UE.MWUIWidgetBase
        
        let getcvs = function(index :number) :UE.MWCanvas{
            return base.FindChildByPath("RootCanvas/Item" + index) as UE.MWCanvas
        }
        let getimg = function(index :number) :UE.MWImage{
            let c = base.FindChildByPath("RootCanvas/Item" + index) as UE.MWCanvas
            return c.GetChildAt(0) as UE.MWImage
        }
        let getbtn = function(index :number) :UE.MWButton{
            let c = base.FindChildByPath("RootCanvas/Item" + index) as UE.MWCanvas
            return c.GetChildAt(1) as UE.MWButton
        }

        getbtn(0).OnClicked.Add(()=>{
            getcvs(0).SetMWClip(!getcvs(0).GetMWClip())
        })

        getbtn(1).OnClicked.Add(()=>{
            getimg(1).SetRenderTransformAngle(UE.KismetMathLibrary.RandomInteger(360))
        })

        getbtn(2).OnClicked.Add(()=>{
            let cvs = getcvs(2)
            let slotIndex_1 = (cvs.GetChildAt(0).Slot as UE.MWCanvasSlot).GetZOrder();
            let slotIndex_2 = (cvs.GetChildAt(2).Slot as UE.MWCanvasSlot).GetZOrder();

            (cvs.GetChildAt(0).Slot as UE.MWCanvasSlot).SetZOrder(slotIndex_2);
            (cvs.GetChildAt(2).Slot as UE.MWCanvasSlot).SetZOrder(slotIndex_1);
        })

        getbtn(3).OnClicked.Add(()=>{
            (getimg(3).Slot as UE.MWCanvasSlot).SetAutoSize(!(getimg(3).Slot as UE.MWCanvasSlot).GetAutoSize());
        })
        
        getbtn(4).OnClicked.Add(()=>{
            let cvs = getcvs(4)
            cvs.GetChildAt(0).SetIsEnabled(!cvs.GetChildAt(0).GetIsEnabled())
        })

        getbtn(5).OnClicked.Add(()=>{
           getimg(5).SetVisibility(getimg(5).GetVisibility() == UE.ESlateVisibility.SelfHitTestInvisible ? UE.ESlateVisibility.Collapsed : UE.ESlateVisibility.SelfHitTestInvisible)
        })

        let Txt = base.FindChildByPath("MWCanvas_2147481337/Item6/MWTextBlock_2147481612") as UE.MWTextBlock
        Txt.SetTextByString("节点有: "+(base.FindChildByPath("Item6") as UE.MWPanelWidget).GetChildrenCount() +" 个")
    }


}