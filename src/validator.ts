import {
    Delegate as DelegateEvent,
    Undelegate as UndelegateEvent,
    // Withdraw as WithdrawEvent,
    WithdrawRewards as WithdrawRewardsEvent
} from "../generated/templates/Validator/Validator";
import {init} from "./core";
import {log} from "@graphprotocol/graph-ts";
import {DelegateRecord, Delegator, UndelegateRecord, Validator} from "../generated/schema";

export function handleDelegate(event: DelegateEvent): void {
    log.info("Start handleDelegate", [])
    init()
    //todo: Update staking stats

    let delegator = Delegator.load(event.params._delAddr.toHexString())
    if (!delegator) {
        delegator = new Delegator(event.params._delAddr.toHexString())
    }


    let validator = Validator.load(event.address.toHexString())
    if (!validator) {
        log.warning("validator {} entity not exist when address {} try to delegate", [
            event.address.toString(), event.params._delAddr.toHexString()]
        )
    }


    // Push new validator into delegator's validator list

    // // Create new delegate record
    // let record = new DelegateRecord(event.transaction.hash.toString())
    // record.save()
    // let delegatorRecords = delegator.delegateRecords ? delegator.delegateRecords:null
    // delegatorRecords.push(event.transaction.hash.toString())
    // delegator.delegateRecords = delegatorRecords

    delegator.save()



}

export function handleUndelegate(event: UndelegateEvent): void {
    init()
    log.info("Start handleUndelegate", [])
    //todo: Update staking stats

    let delegator = Delegator.load(event.params._delAddr.toHexString())
    if (!delegator) {
        delegator = new Delegator(event.params._delAddr.toHexString())
    }

    let validator = Validator.load(event.address.toHexString())
    if (!validator) {
        log.warning("validator {} entity not exist when address {} try to delegate", [
            event.address.toString(), event.params._delAddr.toHexString()]
        )
    }
    //todo: Update validator info

    //todo: consider behavior when user undelegated all his stake
    // maybe remove when delegator withdraw ?
    //
    // // Create new delegate record
    // let record = new UndelegateRecord(event.transaction.hash.toString())
    // record.save()
    // let records = delegator.undelegateRecords
    // records.push(event.transaction.hash.toString())
    // delegator.undelegateRecords = records

    delegator.save()
}

//
// export function handleWithdrawRewards(event: WithdrawRewardsEvent): void {
//     init()
//     log.info("Start handleWithdrawRewards", [])
//     //todo: Update staking stats
//
//     let delegator = Delegator.load(event.params._delAddr.toString())
//     if (!delegator) {
//         delegator = new Delegator(event.params._delAddr.toString())
//     }
//
//
//     let validator = Validator.load(event.address.toString())
//     if (!validator) {
//         log.warning("validator {} entity not exist when address {} try to delegate", [
//             event.address.toString(), event.params._delAddr.toString()]
//         )
//     }
//
//
//     // Push new validator into delegator's validator list
//
//     // Create new delegate record
//     let record = new DelegateRecord(event.transaction.hash.toString())
//     record.save()
//     let delegatorRecords = delegator.delegateRecords
//     delegatorRecords.push(record.id)
//     delegator.delegateRecords = delegatorRecords
//
//     delegator.save()
// }