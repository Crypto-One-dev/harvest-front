import BigNumber from 'bignumber.js'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import { faInfoCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fromWei } from '../../services/web3'
import { Monospace } from '../GlobalStyle'
import {
  UniV3VaultContainer,
  SelectedVault,
  SelectedVaultLabel,
  SelectedVaultNumber,
  RangeGroup,
  VaultRangeContainer,
  VaultRange,
} from './style'

const UniV3ManagedVaultActions = token => {
  const depositLimit = new BigNumber(token.capLimit)
  const currentCap = new BigNumber(token.currentCap)
  let maxAmount = 0,
    lockedDate = new Date(parseInt(token.withdrawalTimestamp, 10) * 1000)
  maxAmount = depositLimit.minus(currentCap)
  lockedDate = `${lockedDate.getUTCFullYear()}-${`0${lockedDate.getUTCMonth()}`.slice(
    -2,
  )}-${`0${lockedDate.getUTCDate()}`.slice(-2)} ${`0${lockedDate.getUTCHours()}`.slice(
    -2,
  )}:${`0${lockedDate.getUTCMinutes()}`.slice(-2)}:${`0${lockedDate.getUTCSeconds()}`.slice(-2)}.${(
    lockedDate.getUTCMilliseconds() / 1000
  )
    .toFixed(3)
    .slice(2, 5)}`

  return (
    <UniV3VaultContainer>
      <ReactTooltip
        id="univ3-vault-available"
        backgroundColor="#fffce6"
        borderColor="black"
        border
        textColor="black"
        getContent={() => (
          <>
            This value shows the {token.capTokenSymbol} token limit you can deposit in the Uniswap
            v3 pool.
          </>
        )}
      />
      <SelectedVault>
        <SelectedVaultLabel fontSize="14px">
          Deposit Cap {` `}{' '}
          <FontAwesomeIcon
            icon={faInfoCircle}
            color="green"
            data-tip=""
            data-for="univ3-vault-available"
          />
        </SelectedVaultLabel>
        <SelectedVaultNumber>
          <Monospace>
            {token.capLimit && token.capLimit !== null ? (
              fromWei(maxAmount, token.capTokenDecimal)
            ) : (
              <b>Unlimited</b>
            )}
          </Monospace>
        </SelectedVaultNumber>
      </SelectedVault>
      <ReactTooltip
        id="univ3-locked-time"
        backgroundColor="#fffce6"
        borderColor="black"
        border
        textColor="black"
        getContent={() => <>You can&apos;t withdraw before the withdrawal time.</>}
      />
      <SelectedVault>
        <SelectedVaultLabel fontSize="14px">
          Withdrawals allowed after: {` `}{' '}
          <FontAwesomeIcon
            icon={faInfoCircle}
            color="green"
            data-tip=""
            data-for="univ3-locked-time"
          />
        </SelectedVaultLabel>
        <SelectedVaultNumber>
          {token.withdrawalTimestamp &&
          token.withdrawalTimestamp !== null &&
          token.withdrawalTimestamp !== '0'
            ? lockedDate
            : '1970-01-01 00:00:00.000'}
        </SelectedVaultNumber>
      </SelectedVault>
      <ReactTooltip
        id="univ3-vault-ranges"
        backgroundColor="#fffce6"
        borderColor="black"
        border
        textColor="black"
        getContent={() => (
          <>
            It shows the ranges of <b>{token.ranges[0].token1Symbol}</b> in this vault.
          </>
        )}
      />
      <RangeGroup>
        <SelectedVaultLabel fontSize="14px">
          Ranges: {` `}{' '}
          <FontAwesomeIcon
            icon={faInfoCircle}
            color="green"
            data-tip=""
            data-for="univ3-vault-ranges"
          />
        </SelectedVaultLabel>
        <VaultRangeContainer>
          {token.ranges.map(range => {
            if (range.posId === token.currentRange.posId) {
              return (
                <>
                  <ReactTooltip
                    id="univ3-vault-currentRange"
                    backgroundColor="#fffce6"
                    borderColor="black"
                    border
                    textColor="black"
                    getContent={() => (
                      <>
                        It shows current <b>{token.ranges[0].token1Symbol}</b> range in this vault.
                      </>
                    )}
                  />
                  <VaultRange color="red" data-tip="" data-for="univ3-vault-currentRange">
                    <b>{range.token1Symbol}</b> : {range.lowerBound} ~ {range.upperBound}{' '}
                    <b>{range.token0Symbol}</b>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      color="red"
                    />
                  </VaultRange>
                </>
              )
            }
            return (
              <VaultRange key="normal-range">
                <b>{range.token1Symbol}</b> : {range.lowerBound} ~ {range.upperBound}{' '}
                <b>{range.token0Symbol}</b>
              </VaultRange>
            )
          })}
        </VaultRangeContainer>
      </RangeGroup>
    </UniV3VaultContainer>
  )
}

export default UniV3ManagedVaultActions
