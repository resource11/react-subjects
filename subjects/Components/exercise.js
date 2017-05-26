////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - Make it so that you can click on a tab and it will appear active
//   while the others appear inactive
// - Make it so the panel renders the correct content for the selected tab
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'

const styles = {}

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10
}

class Tabs extends React.Component {

  // // older syntax
  // constructor {
  //   super()
  //   this.state {
  //     ...
  //   }
  //   this.handleClick() = () => {
  //     ...
  //   }
  // }

  // is now...
  state = {
    // activeIndex: 0
    activeIndex: parseInt(localStorage.activeIndex || '0', 10)
  }

  handleClick = (index) => {
    // const index = parseInt(e.target.getAttribute('data-index')) // this is the old way
    this.setState({ activeIndex: index })
    localStorage.setItem('activeIndex', index) // how do we store activeIndex into localStorage? look this up
  }
  // woo hoo!

  render() {
    return (
      <div className="Tabs">
        {this.props.data.map((item, index) => {
          const isActive = this.state.activeIndex === index
          return (
            <div
              key={item.id}
              className="Tab"
              style={isActive ? styles.activeTab : styles.tab}
              onClick={() => this.handleClick(index)} // pass in the index to set the current tab on click
            >
            { item.name }
          </div>
            )
        })}
        <div className="TabPanel" style={styles.panel}>
          {this.props.data[this.state.activeIndex].description}
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}/>
      </div>
    )
  }
}

const DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' }
]

ReactDOM.render(<App countries={DATA}/>, document.getElementById('app'), function () {
  require('./tests').run(this)
})
