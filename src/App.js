import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: [],
      index: 0,
      loading: true,
    }
  }

  handleClick = () => {
    let index = Math.floor(Math.random() * this.state.data.length)

    this.setState({
      ...this.state,
      index,
    })
  }


  componentDidMount() {
    axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            data: response.data.quotes,
            loading: false
          })
        }, 1000);
      })
  }


  render() {
    const loadingStyle = this.state.loading ? { width: 200 } : {} 
    
    return (
      <div id="quote-box" style={loadingStyle} >
        {
          this.state.loading ? <div style={{ textAlign: 'center' }}>Loading ...</div> :
            <>
              <div id="text">{this.state.data[this.state.index].quote}</div>
              <div id="author">- {this.state.data[this.state.index].author} -</div>
              <div id="bottom">
                <span id="tweet-quote"></span>
                <span
                  id="new-quote"
                  onClick={this.handleClick}
                >
                  New quote
                </span>
              </div>
            </>
        }
      </div>
    )
  }
}
