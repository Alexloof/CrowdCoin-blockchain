import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import { Button, Form, Message, Input } from 'semantic-ui-react'
import web3 from '../../../ethereum/web3'
import Campaign from '../../../ethereum/campaign'
import { Link, Router } from '../../../routes'

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    loading: false,
    errorMessage: ''
  }
  static async getInitialProps(props) {
    const { address } = props.query

    return { address }
  }
  onSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, errorMessage: '' })

    const campaign = Campaign(this.props.address)
    const { description, value, recipient } = this.state
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({
          from: accounts[0]
        })
      Router.pushRoute(`/campaigns/${this.props.address}/requests`)
    } catch (err) {
      this.setState({ errorMessage: err.message.toString().split('\n')[0] })
    }
    this.setState({ loading: false, value: '', description: '', recipient: '' })
  }
  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>
        <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={e => this.setState({ recipient: e.target.value })}
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

export default RequestNew
