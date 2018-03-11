import web3 from './web3'
import CampaignFactory from './build/CampaignFactory'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xbB56B2cA74c8F78562219516f3222B769Ee5540F'
)

export default instance
