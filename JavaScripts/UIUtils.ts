// import * as React from "react"
// const { CanvasPanel, TextBlock, Image, EditableText, Button } = MWUI


export class UIUtils {
    public static CreateSlot(left: number, top: number, right: number, bottom: number, minimum?: Type.Vector2, maximum?: Type.Vector2, alignment?: Type.Vector2, autoSize?: boolean) {
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
                    Left: left, //x
                    Top: top, //y
                    Right: right, //width
                    Bottom: bottom, //height
                },
                Anchors: { //锚点
                    Minimum: minimum ? minimum : new Type.Vector2(0.5, 0),
                    Maximum: maximum ? maximum : new Type.Vector2(0.5, 0),
                },
                //对齐点
                Alignment: alignment ? alignment : new Type.Vector2(0.5, 0)
            },
            bAutoSize: (autoSize == null || autoSize == undefined) ? false : autoSize
        }
    }

    public static defaultTextColorAndOpacity() {
        return { SpecifiedColor: Type.LinearColor.BLACK }
    }
}

export default UIUtils