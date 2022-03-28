import {
    CreatedValidator as CreatedValidatorEvent
} from "../generated/staking/staking";

import {StakingID} from "./helper";
import {getStakingStats, init} from "./core";
import {Validator} from "../generated/schema";
import {Validator as ValidatorTemplate} from "../generated/templates"

export function handleCreateValidator(event: CreatedValidatorEvent): void {
    init()
    let validator = new Validator(event.params._valAddr.toString())
    validator.name = event.params._name.toString()
    validator.save()
    ValidatorTemplate.create(event.params._valAddr)
}