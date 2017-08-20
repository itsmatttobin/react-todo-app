import React, { Component } from 'react';

class AddItemForm extends Component {
	createItem(e) {
		e.preventDefault();

		const item = {
			title: this.title.value
		}

		this.props.addItemToList(item);
		this.itemForm.reset();
	}

	render() {
		return (
			<form ref={(input) => this.itemForm = input} onSubmit={(e) => this.createItem(e)}>
				<input ref={(input) => this.title = input} type="text" />
			</form>
		)
	}
}

export default AddItemForm;