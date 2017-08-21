import React, { Component } from 'react';
import tick from '../images/tick.svg';

class Item extends Component {
	handleChange(e, index) {
		const item = this.props.allItems[index];

		// Copy and update item
		const updatedItem = {
			...item,
			[e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
		}
		this.props.updateItemInList(index, updatedItem);

		if(e.target.name === 'title' && e.target.value === '') {
			this.props.deleteItemFromList(index);
		}
	}

	render() {
		const { details, index } = this.props;
		let classes = 'item';
		if(details.complete)
			classes += ' complete';

		return (
			<li className={classes} key={index}>
				<div className="styled-checkbox">
					<input type="checkbox" name="complete" checked={details.complete} onChange={(e) => this.handleChange(e, index)} />
					<img src={tick} alt="" />
				</div>				
				<input type="text" name="title" value={details.title} onChange={(e) => this.handleChange(e, index)} />
				<span className="delete-item" onClick={() => this.props.deleteItemFromList(index)}>&times;</span>
			</li>
		)
	}
}

export default Item;