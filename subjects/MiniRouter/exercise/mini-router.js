////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { createHashHistory } from 'history'

/*
// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

class Router extends React.Component {

  //set the context for children, expose history and location to children
  static childContextTypes = {
    history: React.PropTypes.object,
    location: React.PropTypes.object
  }

  //get the context for children
  getChildContext() {
    return {
      location: this.state.location,
      history: this.history
    }
  }

  // router's job is make history, so create some
  history = createHashHistory()

  // set the state
  state = {
    location: this.history.location
  }

  // call back with history whenever URL changes
  componentDidMount() {
    this.history.listen(() => {
      this.setState({
        location: this.history.location
      })
    })

  }

  render() {
    return this.props.children
  }
}


class Route extends React.Component {
  //set the context for just location
  static contextTypes = {
    location: React.PropTypes.object
  }

  render() {
    //define this.context.location for location, otherwise you use the global window location. Same happens if you don't define event
    const { location } = this.context
    // writing component:Component destructures the JS so we can write <Component/>
    const { path, render, component:Component } = this.props

    //define how to match, you can ask a string if it starts with another string
    const itMatches = location.pathname.startsWith(path)

    //check to see if it matches
    if (itMatches) {
      if (render) {
        return render()
      } else if (Component) {
        return <Component/>
      } else {
        return null
      }
    } else {
      return null
    }
  }
}


class Link extends React.Component {
  //set the context for history
  static contextTypes = {
    history: React.PropTypes.object
  }

  handleClick = (e) => {
    e.preventDefault()
    // if location changes, push location
    // check if location.pathname !== to to solve hash history error

    // if (location.pathname != to)
    //   location.history.push.to
    // grep for location.history in repo

    this.context.history.push(this.props.to)
  }

  render() {
    return (
      <a
        href={`#${this.props.to}`}
        onClick={this.handleClick}
      >
        {this.props.children}
      </a>
    )
  }
}

export { Router, Route, Link }
