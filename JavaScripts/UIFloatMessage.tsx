import * as React from "react";
const { CanvasPanel, Button, TextBlock, Image } = MWUI;

var a1 = 0.2;
var t1 = 300;
var V = 100;
var L = 300;

var t2 = 200;
var t3 = 250;
var a2 = 0.5;
var interval = 100;
var moveTime = 100;
var showingMaxNum = 1;

var messageTimers: number[] = [0, interval, interval * 2];


function clamp01(t: number): number {
    if (t > 1)
        return 1;
    else if (t < 0)
        return 0;
    else
        return t;
}

function Flip(t: number): number {
    return 1 - t;
}

function Square(x: number) {
    return x * x;
}
``
function EaseOut(t: number): number {
    return Flip(Square(Flip(t)));
}

function NumberLerp(start_value: number, end_value: number, t: number): number {
    t = clamp01(t);
    t = EaseOut(t);
    return start_value + (end_value - start_value) * t;
}


var imageProps = {
    ImageSize: new Type.Vector2(600, 80),
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
            Minimum: new Type.Vector2(0.5, 0.5),
            Maximum: new Type.Vector2(0.5, 0.5),
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
            Minimum: new Type.Vector2(0.5, 0.5),
            Maximum: new Type.Vector2(0.5, 0.5),
        }
    }
};

function GetNextMessage(): void {
    Events.DispatchLocal("UIEvents_RemoveMessage", 0);
}


function ChangeTimer(index: number, timer: number): void {
    messageTimers[index] += 3 * interval;
}

var messagePosY: number[] = [-300, -200, -100];

function UpdateMessagePosY(): void {
    var temp = messagePosY.pop();
    messagePosY.splice(0, 0, temp);
}

var tempPosY: number[] = [0, 0, 0];

function SetTempPosY(index: number, value: number): void {
    tempPosY[index] = value;
}

interface toastContainerInterface {
    messageList: string[],
    messageToShow: string[],
    messageToShowInitTimer: number[],
    mainTimer: number,
    messageTimer: number,
}

class ToastContainer extends React.Component<any, toastContainerInterface>
{
    timerID: number;
    constructor(props) {
        super(props);
        this.state =
        {
            messageList: [],
            messageToShow: [],
            messageToShowInitTimer: [],
            mainTimer: 0,
            messageTimer: 0,
        }
    }

    componentDidMount() {
        this.timerID = setInterval
            (
                () => this.tick(),
                0
            );

        Events.AddLocalListener("UIEvents_FloatMessage", (message: string) => {
            this.setState({ messageToShow: this.state.messageList.filter((_, i) => i !== 0) });
            this.setState({ messageList: [...this.state.messageList, message] });
        });

        Events.AddLocalListener("UIEvents_RemoveMessage", () => {
            this.setState({ messageToShow: this.state.messageList.filter((_, i) => i !== 0) });
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState
            ({
                mainTimer: this.state.mainTimer + 1,
                messageTimer: this.state.messageTimer + 1
            });

        if (this.state.messageTimer > interval || this.state.messageToShow.length === 0) {
            //console.log("------------------------**************************0 list length = " + this.state.messageList.length); 

            // 取出 message
            if (this.state.messageList.length > 0 && this.state.messageToShow.length < showingMaxNum) {
                //SetMessageTimer(messageTimer = 0);

                let message = this.state.messageList[0];

                let filteredArray = this.state.messageList.filter((_, i) => i !== 0)

                this.setState
                    ({
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
        return <CanvasPanel>
            <Toast message={this.state.messageToShow[0] ? this.state.messageToShow[0] : ""}
                timer={this.state.messageToShowInitTimer[0] ? this.state.messageToShowInitTimer[0] : 0}
                index={0}
            >
            </Toast>

            {/* <Toast message = {this.state.messageToShow[1]? this.state.messageToShow[1] : ""}
timer = {this.state.messageToShowInitTimer[1]? this.state.messageToShowInitTimer[1] : 0} 
index = {1}
>

</Toast>
<Toast message = {this.state.messageToShow[2]? this.state.messageToShow[2] : ""}
timer = {this.state.messageToShowInitTimer[2]? this.state.messageToShowInitTimer[2] : 0} 
index = {2}
>
</Toast> */}
        </CanvasPanel>
    }

}


interface toastInterface {
    renderOpactity: number,
    y: number,
    timer: number,
    showed: boolean,
}

class Toast extends React.Component<any, toastInterface>
{
    timerID: number;
    constructor(props) {
        super(props);
        this.state =
        {
            renderOpactity: 0,
            y: 0,
            timer: 0,
            showed: false,
        }
    }

    componentDidMount() {

        this.timerID = setInterval
            (
                () => this.tick(),
                0
            );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        if (this.props.timer > 0 && this.props.message !== "") {
            if (this.state.showed !== true) {
                this.setState
                    ({
                        timer: this.props.timer,
                        showed: true
                    });
            }
            else {
                this.setState
                    ({
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

                        this.setState({ showed: false })
                    }

                }
                else if ((currentTimer - messageTimers[this.props.index]) > moveTime &&
                    (currentTimer - messageTimers[this.props.index]) < (moveTime + t2)) {
                    // 悬停
                    if (this.state.y > messagePosY[this.props.index]) {
                        this.setState
                            ({
                                y: this.state.y - 0.5

                            })
                    }
                }
                else if ((currentTimer - messageTimers[this.props.index]) <= moveTime) {
                    // 出现
                    this.setState
                        ({
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
            return <></>
        }
        else {
            return <>
                <Image
                    Slot={backgroundImageSlot}
                    Brush={imageProps}
                    ColorAndOpacity={Type.LinearColor.GRAY}
                    RenderTransform={{ Translation: new Type.Vector2(0, this.state.y) }}
                    RenderOpacity={this.state.renderOpactity}
                >
                </Image>

                <TextBlock
                    Slot={textSlot}
                    Text={this.props.message}
                    RenderTransform={{ Translation: new Type.Vector2(0, this.state.y) }}
                    RenderOpacity={this.state.renderOpactity}
                >
                </TextBlock>
            </>
        }
    }
}

Events.AddUIRenderListener(render => {
    render(<ToastContainer />)
});