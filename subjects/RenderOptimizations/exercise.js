////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to
//   prevent tearing when scrolling quickly
// - Remember scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import * as RainbowListDelegate from './RainbowListDelegate'
import './styles'

class RainbowList extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  }

  state = {
    scrollY: 0,
    availableHeight: window.innerHeight
  }

  componentDidMount() {
    this.setState({
      availableHeight: this.node.clientHeight
    })
  }

  handleScroll = (e) => {
    this.setState({
      scrollY: e.target.scrollTop
    })
  }


  render() {
    const { scrollY, availableHeight } = this.state
    const { numRows, rowHeight, renderRowAtIndex } = this.props
    const totalHeight = numRows * rowHeight

    const scrollBottom = scrollY + availableHeight
    const startIndex = Math.max(0, Math.floor(scrollY / rowHeight) - 20)
    const endIndex = Math.min(numRows, Math.ceil(scrollBottom/rowHeight) + 20)
    // const endIndex = startIndex  + howManyFit


    const items = []

    let index = startIndex
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }

    return (
      <div
        onScroll={this.handleScroll}
        style={{ height: '100%', overflowY: 'scroll' }}
        ref={node => this.node = node}
      >
        <ol style={{ height: totalHeight, paddingTop: startIndex * rowHeight }}>
          {items}
        </ol>
      </div>
    )
  }
}

ReactDOM.render(
  <RainbowList
    numRows={50000}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById('app')
)
