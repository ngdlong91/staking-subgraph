import {
    Delegate as DelegateEvent,
    Undelegate as UndelegateEvent,
    // Withdraw as WithdrawEvent,
    WithdrawRewards as WithdrawRewardsEvent
} from "../generated/templates/Validator/Validator";
import {init} from "./core";
import {log} from "@graphprotocol/graph-ts";



export function handleDelegate(event: DelegateEvent): void {
    init()
    log.info("Start handleDelegate", [])
}

export function handleUndelegate(event: UndelegateEvent): void {
    init()
    log.info("Start handleUndelegate", [])
}

export function handleWithdrawRewards(event: WithdrawRewardsEvent): void {
    init()
    log.info("Start handleWithdrawRewards", [])
}