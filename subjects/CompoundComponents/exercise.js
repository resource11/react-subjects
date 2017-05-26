////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Hints to get started:
//
// - <RadioGroup> will need some state
// - It then needs to pass that state to the <RadioOption>s so they know
//   whether or not they are active
//
// Got extra time?
//
// Implement a `value` prop and allow this to work like a "controlled input"
// (https://facebook.github.io/react/docs/forms.html#controlled-components)
//
// - Add a button to <App> that sets `this.state.radioValue` to a pre-determined
//   value, like "tape"
// - Make the <RadioGroup> update accordingly
//
// Implement keyboard controls on the <RadioGroup> (you'll need tabIndex="0" on
// the <RadioOption>s so the keyboard will work)
//
// - Enter and space bar should select the option
// - Arrow right, arrow down should select the next option
// - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////



// **************
// more notes about arrays in ternary like

// isThing? [tab, panel] : [panel, tab]

// arrays are flattened in that ternary

// React.createElement('div', {}, [thing1, thing2], moreStuff)

// function add(...args) {
//   const numbers = flatten(args)
//   return sum(numbers)
// }

// add([ 1, 3 ], 2)
// add([ 1, 2 ])




import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

class RadioGroup extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string
  }

  state = {
    value: this.props.defaultValue // why are we using props to set state? This may be the starting state, and it's passed down from the parent?
  }

  // // handler for selecting value. Takes value as parameter, sets state of this.state.value to value, calls anonymous function to handle onChange and passes in this.state.value.
  // select(value) {
  //   this.setState({ value }, () => {
  //     this.props.onChange(this.state.value)
  //   })
  // }

  // look at the child value of isSelected and compare it to this component's state.value. If true, set to true. onClick grabs child props and changes the state according to child props value (the RadioOption value)
  render() {
    const children = React.Children.map(this.props.children, (child) => (
      React.cloneElement(child, {
        isSelected: this.state.value === child.props.value,
        // onClick: () => this.select(child.props.value)
        onClick: () => this.setState({ value: child.props.value })
      })
    ))

    return <div>{children}</div>
  }
}

class RadioOption extends React.Component {
  static propTypes = {
    value: PropTypes.string
  }

  render() {
    return (
      <div onClick={this.props.onClick}>
        <RadioIcon isSelected={this.props.isSelected}/> {this.props.children}
      </div>
    )
  }
}

class RadioIcon extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div
        style={{
          borderColor: '#ccc',
          borderSize: '3px',
          borderStyle: this.props.isSelected ? 'inset' : 'outset',
          height: 16,
          width: 16,
          display: 'inline-block',
          cursor: 'pointer',
          background: this.props.isSelected ? 'rgba(0, 0, 0, 0.05)' : ''
        }}
      />
    )
  }
}

class App extends React.Component {
  state = {
    radioValue: 'fm'
  }

  //the state of this component is bubbled up from the children

  render() {
    return (
      <div>
        <h1>♬ It's about time that we all turned off the radio ♫</h1>

        <h2>Radio Value: {this.state.radioValue}</h2>

        <RadioGroup
          defaultValue={this.state.radioValue} // pass this down to RadioGroup
          onChange={(radioValue) => this.setState( { radioValue })}
          // how does this change? This is the parent.
          // we want RadioGroup to own some state
        >
          <RadioOption value="am">AM</RadioOption>
          <RadioOption value="fm">FM</RadioOption>
          <RadioOption value="tape">Tape</RadioOption>
          <RadioOption value="aux">Aux</RadioOption>
        </RadioGroup>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
