////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
import React from 'react'
import ReactDOM from 'react-dom'
import serializeForm from 'form-serialize'

class CheckoutForm extends React.Component {
  state = {
    sameAsBilling: true,
    billingName: 'Ryan',
    billingState: 'WA',
    shippingName: 'Michael',
    shippingState: 'CA'

  }

  render() {
    const {
      sameAsBilling,
      shippingName,
      billingName,
      shippingState,
      billingState
    } = this.state

    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Billing Name:
                <input
                  type="text"
                  defaultValue={this.state.billingName}
                  onChange={(e) => {
                    this.setState({ billingName: e.target.value })
                  }}
                />
              </label>
            </p>
            <p>
              <label>Billing State:
                <input
                  type="text"
                  size="2"
                  defaultValue={this.state.billingState}
                  onChange={(e) => {
                    this.setState({ billingState: e.target.value })
                  }}
                />
              </label>
            </p>
          </fieldset>

          <br/>

          <fieldset>
            <label>
              <input
                type="checkbox"
                defaultChecked={this.state.sameAsBilling}
                onChange={(e) => {
                  this.setState({ sameAsBilling: e.target.checked })
                }}
              />
              Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>Shipping Name:
                <input
                  type="text"
                  value={ sameAsBilling ? billingName : shippingName }
                  onChange={(e) => {
                    this.setState({ shippingName: e.target.value })
                  }}
                />
              </label>
            </p>
            <p>
              <label>Shipping State:
                <input
                  type="text"
                  size="2"
                  value={ sameAsBilling ? billingState : shippingState }
                  onChange={(e) => {
                    this.setState({ shippingState: e.target.value })
                  }}
                />
              </label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<CheckoutForm/>, document.getElementById('app'))
