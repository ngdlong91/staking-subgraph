/* eslint-disable prefer-const */
import {log, BigInt, BigDecimal, Address} from '@graphprotocol/graph-ts'

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export let RARITY_COMMON = BigInt.fromI32(1)
export let RARITY_UNCOMMON = BigInt.fromI32(2)
export let RARITY_RARE = BigInt.fromI32(3)
export let RARITY_MYTHIC = BigInt.fromI32(4)

export let UNCOMMON_TOTAL_STATS = BigInt.fromI32(112)
export let RARE_TOTAL_STATS = BigInt.fromI32(150)
export let MYTHIC_TOTAL_STATS = BigInt.fromI32(187)

export const BURN_ADDRESS = '0x0000000000000000000000000000000000000000'
export const STAKING_ADDRESS = Address.fromString('0x0000000000000000000000000000000000001337')
export const PARAMS_ADDRESS = Address.fromString('0x910cbd665263306807e5ace0351e4358dc6164d8')
export const TREASURY_ADDRESS = Address.fromString('0x008326058f791258342925F0171aE555284e8741')

export const StakingID = 'Staking'
export const StakingStatsID = 'StakingStats'

let IS_BOOTSTRAP = false

export function isInitial(): boolean {
    return IS_BOOTSTRAP
}

export function setInitial(): void {
    IS_BOOTSTRAP = true
}