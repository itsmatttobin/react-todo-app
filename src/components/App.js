import React, { Component } from 'react';
import AddItemForm from './AddItemForm';
import Item from './Item';

class App extends Component {
  constructor() {
    super();

    this.addItemToList = this.addItemToList.bind(this);
    this.deleteItemFromList = this.deleteItemFromList.bind(this);
    this.updateItemInList = this.updateItemInList.bind(this);

    this.state = {
      items: {}
    }
  }

  addItemToList(item) {
    const items = {...this.state.items};
    const timestamp = Date.now();
    items[`item-${timestamp}`] = item;
    this.setState({ items });
  }

  deleteItemFromList(key) {
    const items = {...this.state.items};
    delete items[key];
    this.setState({ items });
  }

  updateItemInList(key, updatedItem) {
    const items = {...this.state.items};
    items[key] = updatedItem;
    this.setState({ items });
  }

  render() {
    return (
      <div className="App">
        <h1>TODO</h1>

        <h3>Add an item</h3>
        <AddItemForm addItemToList={this.addItemToList} />

        <h4>Items</h4>
        <ul className="item-list">
          {
            Object
              .keys(this.state.items)
              .map(key => <Item key={key} index={key} allItems={this.state.items} details={this.state.items[key]} deleteItemFromList={this.deleteItemFromList} updateItemInList={this.updateItemInList} />)
          }
        </ul>
      </div>
    );
  }
}

export default App;
