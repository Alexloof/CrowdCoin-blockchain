import React, { Component } from 'react'
import Campaign from '../ethereum/campaign'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import { Router } from '../routes'

class ContributeForm extends Component {
  state = {
    value: '',
    loading: false,
    errorMessage: ''
  }
  onSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, errorMessage: '' })

    const campaign = Campaign(this.props.address)
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      })

      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (err) {
      this.setState({ errorMessage: err.message.toString().split('\n')[0] })
    }
    this.setState({ loading: false, value: '' })
  }
  render() {
    return (
      <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Amount of Contribute</label>
          <Input
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
            label="ether"
            type="number"
            labelPosition="right"
          />
        </Form.Field>
        {this.state.errorMessage && (
          <Message error header="Ooops!" content={this.state.errorMessage} />
        )}
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    )
  }
}

export default ContributeForm
