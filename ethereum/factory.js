import web3 from './web3'
import CampaignFactory from './build/CampaignFactory'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x493fFF81Ce596afA7C99CB63bdd31c227E9d1F64'
)

export default instance
