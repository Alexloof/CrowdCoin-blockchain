import React, { Component } from 'react'
import web3 from '../ethereum/web3'
import { Table, Button } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign'

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    })
  }

  onFinalize = async () => {
    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    })
  }

  render() {
    const { Row, Cell } = Table
    const {
      id,
      request: { description, value, recipient, approvalCount, complete },
      approversCount
    } = this.props
    const readyToFinalize = approvalCount > approversCount / 2

    return (
      <Row disabled={complete} positive={readyToFinalize && !complete}>
        <Cell>{id}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>
          {approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {!complete && (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {!complete && (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    )
  }
}

export default RequestRow
