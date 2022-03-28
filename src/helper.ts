/* eslint-disable prefer-const */
import {log, BigInt, BigDecimal, Address} from '@graphprotocol/graph-ts'

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)
export let AUCTION_ITEM_STATUS_NONE = 0
export let AUCTION_ITEM_STATUS_ON_SALE = 1
export let AUCTION_ITEM_STATUS_CANCEL = 2
export let AUCTION_ITEM_STATUS_SUCCESS = 3

export let RARITY_COMMON = BigInt.fromI32(1)
export let RARITY_UNCOMMON = BigInt.fromI32(2)
export let RARITY_RARE = BigInt.fromI32(3)
export let RARITY_MYTHIC = BigInt.fromI32(4)

export let UNCOMMON_TOTAL_STATS = BigInt.fromI32(112)
export let RARE_TOTAL_STATS = BigInt.fromI32(150)
export let MYTHIC_TOTAL_STATS = BigInt.fromI32(187)

export const BURN_ADDRESS = '0x0000000000000000000000000000000000000000'
export const STAKING_ADDRESS = Address.fromString('0x0000000000000000000000000000000000001337')

export const StakingID = 'Staking'
export const StakingStatsID = 'StakingStats'