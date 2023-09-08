import {
    CreatedValidator as CreatedValidatorEvent
} from "../generated/staking/staking";

import {init, updateValidatorCommission,} from "./core";
import {BigInt, log} from "@graphprotocol/graph-ts";
import {Validator} from "../generated/schema";
import {validator as ValidatorTemplate} from "../generated/templates";

export function handleCreateValidator(event: CreatedValidatorEvent): void {
    // log.info("handleCreateValidator", [])
    // init()
    //
    //
    // log.debug("try update new validator info {}", [event.params._valAddr.toHexString()])
    //
    // ValidatorTemplate.create(event.params._valAddr)
    //
    // let newValidator = new Validator(event.params._valAddr.toHexString())
    // newValidator.name = event.params._name.toString()
    // newValidator.signer = event.transaction.from.toHexString()
    // newValidator.status = BigInt.fromI64(1)
    // newValidator.maxRate = event.params._commissionMaxRate
    // newValidator.maxChangeRate = event.params._commissionMaxChangeRate
    // newValidator.rate = event.params._commissionRate
    // newValidator.accumulatedCommission = BigInt.fromI64(0)
    // newValidator.updateTime = event.block.timestamp
    // newValidator.save()
}