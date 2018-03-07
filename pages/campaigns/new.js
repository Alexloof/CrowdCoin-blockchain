import React, { Component } from 'react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import Layout from '../../components/Layout'
import { Router } from '../../routes'
import { Form, Button, Input, Message } from 'semantic-ui-react'

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  }
  onSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, errorMessage: '' })
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        })

      Router.pushRoute('/')
    } catch (err) {
      this.setState({ errorMessage: err.message.toString().split('\n')[0] })
    }
    this.setState({ loading: false })
  }
  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              onChange={e =>
                this.setState({ minimumContribution: e.target.value })
              }
              value={this.state.minimumContribution}
              label="wei"
              type="number"
              labelPosition="right"
            />
          </Form.Field>
          {this.state.errorMessage && (
            <Message error header="Ooops!" content={this.state.errorMessage} />
          )}
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew
