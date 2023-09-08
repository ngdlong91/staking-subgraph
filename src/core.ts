import {Address, BigInt, ethereum, log} from "@graphprotocol/graph-ts";
import {
    staking as StakingSMC
} from "../generated/staking/staking";
import {
    validator as ValidatorSMC
} from "../generated/templates/validator/validator";

import {isInitial, setInitial, STAKING_ADDRESS, StakingID, StakingStatsID, ZERO_BI} from "./helper";
import {Staking, StakingStats, Validator} from "../generated/schema";
import {validator as ValidatorTemplate} from "../generated/templates";

export function init():void {
    let stakingStats = StakingStats.load(StakingStatsID)
    if (!stakingStats) {
        log.debug("load staking boot info", [])
        stakingStats = new StakingStats(StakingStatsID)
        stakingStats.totalProposer = ZERO_BI
        stakingStats.totalValidator = ZERO_BI
        stakingStats.save()
        loadStakingBootInfo()
    }
}

function loadStakingBootInfo(): void {
    let stakingSMC = StakingSMC.bind(STAKING_ADDRESS)
    let getAllValidatorResult = stakingSMC.try_getAllValidator()
    if (getAllValidatorResult.reverted) {
        // Not sure here
        log.error("getAllValidator reverted", [])
        return
    }

    let currentValidators = getAllValidatorResult.value
    let validatorLength = currentValidators.length
    for (let i=0; i < validatorLength; i++) {
        // Get validator info
        let validatorSMCAddress = currentValidators[i]
        let validatorOwner = stakingSMC.ownerOf(validatorSMCAddress)
        loadBootValidator(validatorSMCAddress, validatorOwner)
    }
}

function loadBootValidator(validatorSMCAddress: Address, validatorOwner: Address):void {
    let validatorSMC = ValidatorSMC.bind(validatorSMCAddress)
    let validator = Validator.load(validatorOwner.toHexString())
    if (!validator) {
        validator = new Validator(validatorOwner.toHexString())
        ValidatorTemplate.create(validatorSMCAddress)
    }


    let inforValidatorResult = validatorSMC.try_inforValidator()
    if (!inforValidatorResult.reverted) {
        let result = inforValidatorResult.value
        validator.name = result.value0.toString() // []byte > Name
        validator.signer = result.value1.toHexString()
        validator.accumulatedCommission = result.value5
        validator.updateTime = result.value7
        let status = BigInt.fromI32(result.value9)
        validator.status = status
    }

    validator = updateValidatorCommission(validator)
    validator.save()
}

export function updateValidatorCommission(validator: Validator): Validator {
    let validatorSMC = ValidatorSMC.bind(Address.fromString(validator.id))
    let commissionResult = validatorSMC.try_commission()
    if (commissionResult.reverted) {
        log.error("commission reverted", [])
    }
    let commission = commissionResult.value
    validator.maxRate = commission.value0
    validator.maxChangeRate = commission.value1
    validator.rate = commission.value2

    return validator
}

export function getStakingStats(): StakingStats {
    let stakingStats = StakingStats.load(StakingStatsID)
    if (!stakingStats) {
        loadStakingBootInfo()
        stakingStats = new StakingStats(StakingStatsID)
    }

    return stakingStats
}