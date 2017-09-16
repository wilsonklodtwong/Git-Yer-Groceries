import React from 'react';
import firebase from './firebase.js';

const dbRef = firebase.database().ref('/stores');

class storeItem extends React.Component {
	constructor(props) {
		super();
		this.state = {
			newItem:'',
			items: [],
			checkedItem: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.addListItem = this.addListItem.bind(this);
		this.dbRef = firebase.database().ref(`/stores/${props.storeInfo.id}/list`);
		this.checked = this.checked.bind(this);
	}
	componentDidMount() {
		dbRef.on('value', (snapshot) => {
			const newItemsArray = [];
			const firebaseItems = snapshot.val();
			for (let key in firebaseItems) {
				const firebaseItem = firebaseItems[key];
				firebaseItem.id = key;
				newItemsArray.push(firebaseItem);
			}
			this.setState({
				items: newItemsArray,
			});
		});
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	addListItem(event){
		event.preventDefault()
		if(this.state.newItem !== "") {
			this.dbRef.push(this.state.newItem);
		}
		this.setState({
			newItem: "",
		})
	}

	checked(key) {
		const allCheckedItems = Array.from(this.state.checkedItem);
		console.log(allCheckedItems);
		allCheckedItems.push(key)

		this.setState({
			checkedItem: allCheckedItems
		})
	}

	render() { 
		const listItems = this.props.storeInfo.list;
		let itemArray = [];
		for (let key in listItems) {
			itemArray.push({
				listItem: listItems[key],
				key: key
			});
		}

		return (
				<li className="storeMain" key={this.props.storeInfo.id}>
					<div className="card-header">
						<h3>{this.props.storeInfo.store}</h3>
						<button onClick={() => this.props.removeItem(this.props.storeInfo.id)}>Remove</button>
					</div>
					<ul className="itemList">
						{itemArray.map((item) => {
							return (
								<li className={this.state.checkedItem.includes(item.key) ? 'item strikethru' : 'item'} key={item.key}>
									{item.listItem}
									<button onClick={() => this.checked(item.key)}>Got it!</button>
								</li>
								)
						})}
					</ul>
					<form id={this.props.storeInfo.id} onSubmit={this.addListItem} action="" className="storeInput">
						<input type="text" name="newItem" placeholder="Enter item" onChange={this.handleChange} value={this.state.newItem} />
						<button className="addButton">Add Item</button>
					</form>
				</li>
		)
	}
}

export default storeItem;