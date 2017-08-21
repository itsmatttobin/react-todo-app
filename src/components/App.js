import React, { Component } from 'react';
import AddItemForm from './AddItemForm';
import Item from './Item';

class App extends Component {
  constructor() {
    super();

    this.addItemToList = this.addItemToList.bind(this);
    this.deleteItemFromList = this.deleteItemFromList.bind(this);
    this.updateItemInList = this.updateItemInList.bind(this);
    this.deleteAllFromList = this.deleteAllFromList.bind(this);
    this.completeAllInList = this.completeAllInList.bind(this);

    this.state = {
      items: {}
    }
  }

  componentWillMount() {
    const localStorageRef = localStorage.getItem('todo-items');

    if(localStorageRef) {
      this.setState({
        items: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('todo-items', JSON.stringify(nextState.items));
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

  deleteAllFromList() {
    this.setState({
      items: {}
    });
  }

  completeAllInList() {
    const items = {...this.state.items};
    let newItems = {}
    for(const key in items) {
      let obj = items[key];
      obj.complete = true
      newItems[key] = obj;
    }
    this.setState({ items: newItems });
  }

  render() {
    const numItems = Object.keys(this.state.items).length;
    return (
      <div className="App">
        <header>
          <h1>TODO... <span>A to-do list app built with React</span></h1>
        </header>

        <div id="content">
          <section className="add-items">
            <h2>Add an item...</h2>

            <AddItemForm addItemToList={this.addItemToList} />
          </section>

          {numItems > 0 &&
            <section className="list-items">              
              <ul className="item-list">
                {
                  Object
                    .keys(this.state.items)
                    .map(key => <Item key={key} index={key} allItems={this.state.items} details={this.state.items[key]} deleteItemFromList={this.deleteItemFromList} updateItemInList={this.updateItemInList} />)
                }
              </ul>
              <div className="actions">
                <button className="green" onClick={() => this.completeAllInList()}>Complete All</button>
                <button onClick={() => this.deleteAllFromList()}>Remove All</button>
              </div>              
            </section>
          }
        </div>
      </div>
    );
  }
}

export default App;
