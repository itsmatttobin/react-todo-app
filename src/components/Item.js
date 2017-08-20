import React, { Component } from 'react';

class Item extends Component {
	handleChange(e, index) {
		const item = this.props.allItems[index];

		// Copy and update item
		const updatedItem = {
			...item,
			[e.target.name]: e.target.value
		}
		this.props.updateItemInList(index, updatedItem);
	}

	render() {
		const { details, index } = this.props;
		return (
			<li className="item" key={index}>
				<input type="text" name="title" value={details.title} onChange={(e) => this.handleChange(e, index)} />
				<span className="delete-item" onClick={() => this.props.deleteItemFromList(index)}>&times;</span>
			</li>
		)
	}
}

export default Item;