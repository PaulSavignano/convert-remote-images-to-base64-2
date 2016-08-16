import React, { Component } from 'react'
import { Button, FormGroup } from 'react-bootstrap'
import { Meteor } from 'meteor/meteor'
import { Bert } from 'meteor/themeteorchef:bert'

export class Base64 extends Component {
  constructor(props) {
    super(props)
    this.state = { base64String: null }
    this.handleBase64Conversion = this.handleBase64Conversion.bind(this)
    this.renderPreview = this.renderPreview.bind(this)
  }
  handleBase64Conversion() {
    const { remoteUrl, base64String } = this.refs
    Meteor.call('getImageFromUrlAsBase64', remoteUrl.value, (error, result) => {
      if (error) {
        console.log(error)
        Bert.alert(error.reason, 'danger')
      }
      if (result) {
        url.value = ''
        base64String.value = result
        component.setState({ base64String: result })
      }
    })
  }
  renderPreview() {
    return this.state.base64String ?
    <img
      src={`data:image/png;base64,${this.state.base64String}`}
      alt="Embedded Image"
      style={{ maxWidth: '300px', marginBottom: '20px' }}
    /> : ''
  }
  render() {
    return (
      <div>
        <h4 className="page-header">Convert an Image to base64</h4>
        <FormGroup>
          <input
            ref="remoteUrl"
            type="text"
            className="form-control"
            placeholder="Type a URL here and press enter to convert"
          />
        </FormGroup>
        <FormGroup>
          { this.renderPreview }
          <textarea
            ref="base64String"
            className="form-control"
            placeholder="Your base64String will appear here after conversion."
          />
        </FormGroup>
        <Button
          onClick={ this.handleBase64Conversion }
          bsStyle="success"
        >Convert to base64
        </Button>
      </div>
    )
  }
}

Base64.propTypes = {}
