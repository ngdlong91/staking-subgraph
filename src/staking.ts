import {
    CreatedValidator as CreatedValidatorEvent
} from "../generated/staking/staking";

import {StakingID} from "./helper";
import {getStakingStats} from "./core";



export function handleCreateValidator(event: CreatedValidatorEvent): void {
    let stakingStats = getStakingStats()

}