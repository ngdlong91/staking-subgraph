import {
    CreatedValidator as CreatedValidatorEvent
} from "../generated/staking/staking";

import {StakingID} from "./helper";
import {getStakingStats, init, updateValidator} from "./core";
import {Validator} from "../generated/schema";
import {Validator as ValidatorTemplate} from "../generated/templates"

export function handleCreateValidator(event: CreatedValidatorEvent): void {
    init()

    // todo: update staking stats

    ValidatorTemplate.create(event.params._valAddr)
    updateValidator(event.params._valAddr)
}