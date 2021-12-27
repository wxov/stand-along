import * as React from "react"
import UIUtils from "./UIUtils"
const { CanvasPanel, TextBlock, Button, VirtualJoystickPanel, Image } = MWUI

interface IGameUIInterface {
    readyTextVisible: boolean,
    readyText: number,
    useButtonVisible: boolean,
    timer: number,
    timePassed: number,
}

class GameUI extends React.Component<any, IGameUIInterface>{

    onClick: () => {}
    timerID: number;
    constructor(props) {
        super(props);
        this.state =
        {
            readyTextVisible: false,
            readyText: 3,
            useButtonVisible: false,
            timer: 0,
            timePassed: 1,
        }
    }

    componentDidMount() {
        Events.AddLocalListener("UIEvents_GameUI_Start", () => {
            this.timerID = setInterval(() => this.tick(), 0);
            this.setState({ readyTextVisible: true })
        });

        Events.AddLocalListener("UIEvents_GameUI_Btn", (event: { show: boolean, callback: () => {} }) => {
            this.onClick = event.callback;
            this.setState({ useButtonVisible: event.show, })
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
                })
            }
            else {
                this.setState({
                    readyTextVisible: false,
                })
            }
        }
    }

    render() {
        return <CanvasPanel>
            <TextBlock
                Slot={UIUtils.CreateSlot(30, 100, 100, 100)}
                Text={this.state.readyText === 0 ? "开始！" : this.state.readyText.toString()}
                Visibility={this.state.readyTextVisible ? MWUI.ESlateVisibility.Visible : MWUI.ESlateVisibility.Hidden}
                Font={{ Size: 60 }}
            >
            </TextBlock>

            <Button
                Slot={UIUtils.CreateSlot(450, 800, 150, 80)}
                Visibility={this.state.useButtonVisible ? MWUI.ESlateVisibility.Visible : MWUI.ESlateVisibility.Hidden}
                OnClicked={() => {
                if (this.onClick)
                    this.onClick();
                }}
            >

            <TextBlock
                Visibility={this.state.useButtonVisible ? MWUI.ESlateVisibility.Visible : MWUI.ESlateVisibility.Hidden}
                Text="使用"
                ColorAndOpacity={UIUtils.defaultTextColorAndOpacity()}
            >
            </TextBlock>

            </Button>
            </CanvasPanel>
    }

}

Events.AddUIRenderListener(render => {
    render(<GameUI />)
})