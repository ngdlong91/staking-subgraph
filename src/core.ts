import {Address, BigInt, ethereum, log} from "@graphprotocol/graph-ts";
import {
    Staking as StakingSMC
} from "../generated/Staking/Staking";
import {
    Validator as ValidatorSMC
} from "../generated/templates/Validator/Validator";

import {IS_BOOTSTRAP, STAKING_ADDRESS, StakingID, StakingStatsID} from "./helper";
import {StakingStats, Validator} from "../generated/schema";

export function init():void {
    if (!IS_BOOTSTRAP) {
        loadStakingBootInfo()
    }
}

function loadStakingBootInfo(): void {
    let stakingSMC = StakingSMC.bind(STAKING_ADDRESS)
    let getAllValidatorResult = stakingSMC.try_getAllValidator()
    if (getAllValidatorResult.reverted) {
        // Not sure here
        log.error("getAllValidator reverted", [])
    }

    let currentValidators = getAllValidatorResult.value
    let validatorLength = currentValidators.length
    for (let i=0; i < validatorLength; i++) {
        // Get validator info
        let validatorSMCAddress = currentValidators[i]
        updateValidator(validatorSMCAddress)

    }
}

export function updateValidator(validatorSMCAddress: Address): void {
    let validator = Validator.load(validatorSMCAddress.toString())
    if (!validator) {
        validator = new Validator(validatorSMCAddress.toString())
    }

    let validatorSMC = ValidatorSMC.bind(validatorSMCAddress)
    let inforValidatorResult = validatorSMC.try_inforValidator()
    if (inforValidatorResult.reverted) {
        log.error("inforValidator reverted", [])
    }

    let result = inforValidatorResult.value
    validator.name = result.value0.toString() // []byte > Name
    validator.signer = result.value1.toString()
    validator.tokens = result.value2
    validator.jailed = result.value3
    validator.delegationShares = result.value4
    validator.accumulatedCommission = result.value5
    validator.ubdEntryCount = result.value6
    validator.updateTime = result.value7
    validator.minSelfDelegation = result.value8
    let status = BigInt.fromI32(result.value9)
    validator.status = status
    validator.unbondingTime = result.value10
    validator.unbondingHeight = result.value11

    let commissionResult = validatorSMC.try_commission()
    if (commissionResult.reverted) {
        log.error("commission reverted", [])
    }

}

export function getStakingStats(): StakingStats {
    let stakingStats = StakingStats.load(StakingStatsID)
    if (!stakingStats) {
        loadStakingBootInfo()
        stakingStats = new StakingStats(StakingStatsID)
    }

    return stakingStats
}