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
export enum EventsName {

    /**
     * 服务器监听客户端
     */
    CtoS_StartGame = "StartTheGame",
    CtoS_ReqUseTrap = "ReqUseTrap",
    /**
     * 客户端监听服务端
     */
    StoC_NtfGotTrap = "NtfGotTrap",
    StoC_NtfPlayerInTrap = "NtfPlayerInTrap",
    /**
     * 本地监听
     */
    toLocal_BTrapT = "OnBubbleTrapTriggerIn",
}
export default EventsName