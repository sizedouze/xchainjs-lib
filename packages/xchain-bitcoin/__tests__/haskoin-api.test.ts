import mockHaskoinApi from '../__mocks__/haskoin'
import * as haskoin from '../src/haskoin-api'

// Mock address has to match with mock file in `__mocks__/response/balances/haskoin-{address}.json
const MOCK_ADDRESS = 'bc1address'
const MOCK_URL = 'https://api.haskoin.com/haskoin-store/btc'

describe('Haskoin API Test', () => {
  beforeEach(() => {
    mockHaskoinApi.init()
  })
  afterEach(() => {
    mockHaskoinApi.restore()
  })

  describe('getBalance', () => {
    it('confirmed + unconfirmed', async () => {
      const balance = await haskoin.getBalance({ address: MOCK_ADDRESS, haskoinUrl: MOCK_URL, confirmedOnly: false })
      expect(balance.amount().toString()).toEqual('3300000')
    })
    it('confirmed only', async () => {
      const balance = await haskoin.getBalance({ address: MOCK_ADDRESS, haskoinUrl: MOCK_URL, confirmedOnly: true })
      expect(balance.amount().toString()).toEqual('1100000')
    })
  })

  describe('broadcastTx', () => {
    it('returns txHash', async () => {
      const txHash = await haskoin.broadcastTx({
        txHex: '0xdead',
        haskoinUrl: MOCK_URL,
      })
      expect(txHash).toEqual('mock-txid')
    })
  })
})
