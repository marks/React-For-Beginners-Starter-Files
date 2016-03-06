var React = require('react');
var ReactDOM = require('react-dom')

var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Navigation = ReactRouter.Navigation
var History = ReactRouter.History
var createBrowserHistory = require('history/lib/createBrowserHistory')

var h = require('./helpers')

/* App */
var App = React.createClass({
  getInitialState: function(){
    return {
      fishes: {},
      order: {}
    }
  },
  addFish: function(fish){
    var timestamp = (new Date()).getTime()
    this.state.fishes['fish-'+timestamp] = fish // updates the state object
    this.setState({fishes: this.state.fishes}) // actually set the state and be efficient by telling it what changed
  },
  render: function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="A fresh seafood market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    )
  }

})

var AddFishForm = React.createClass({
  render: function(){
    return (
      <form ref="fishForm" className="fish-edit" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name" />
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="available">In stock</option>
          <option value="unavailable">Out of stock</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to image"></input>
        <button type="submit">Add Item</button>
      </form>
    )
  },
  createFish: function(e){
    e.preventDefault()
    var fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    }
    this.props.addFish(fish)
    this.refs.fishForm.reset()
  }
})

var Header = React.createClass({
  render: function() {
    return (
      <header className="top">
        <h1>
          Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day
        </h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
})

var Order = React.createClass({
  render: function(){
    return (
      <p>Order</p>
    )
  }
})

var Inventory = React.createClass({
  render: function(){
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm {...this.props} />
      </div>
    )
  }
})

/* StorePicker component 
    This will let us make <StorePicker/>
*/
var StorePicker = React.createClass({
  mixins: [History],
  render: function() {
    var name = "Mark"
    return (
      <form className='store-selector' onSubmit={this.goToStore}>
        {/* HTML for Store selector */}
        <h2>Please enter a store, {name}</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="Submit" />
      </form>
    )
  },

  goToStore: function(e){
    e.preventDefault()
    // get data from input
    var storeId = this.refs.storeId.value
    // transition from <StorePicker/> to <App/>
    this.history.pushState(null,'/store/'+storeId)
  }



});

var NotFound = React.createClass({
  render: function(){
    return <h1>404: Page Not Found :(</h1>
  }
})

/* Routes */
var routes = (
  <Router history={createBrowserHistory()} >
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'))
