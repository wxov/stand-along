/*
 * @Author: your name
 * @Date: 2021-12-28 16:45:18
 * @LastEditTime: 2021-12-28 18:15:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JavaScripts\GameStaus\GameStatus.ts
 */
export class GameStatus {
    private isStart: boolean
    private isEnd: boolean
    private static _mInstance: GameStatus
    public static get Instance(): GameStatus {
        if (this._mInstance == null) {
            return this._mInstance = new GameStatus()
        }
        return this._mInstance
    }
    /**
     * 改变游戏是否为开始状态
     * @param is 是否开始游戏
     */
    ChangeStartState(is: boolean): void {
        this.isStart = is;
    }
    /**
     * 改变游戏时候为结束状态
     * @param is 游戏是否结束
     */
    ChangeEndState(is: boolean): void {
        this.isEnd = is;
    }


    public get IsEnd(): boolean {
        return this.isEnd
    }
    public get IsStart(): boolean {
        return this.isStart
    }

}
export default GameStatus