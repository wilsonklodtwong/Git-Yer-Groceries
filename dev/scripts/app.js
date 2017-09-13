import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import StoreItem from './storeItem.js'
import firebase from './firebase.js';

const dbRef = firebase.database().ref('/stores');

class Form extends React.Component {
	render() {
		return (
			<section className='add-item'>
				<form onSubmit={this.props.handleSubmit}>
					<input type="text" name="storename" placeholder="Enter store name" onChange={this.props.handleChange} value={this.props.storename} />
					<button>Submit</button>
				</form>
			</section>
		)
	}
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			storename: '',
			stores: [],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}
	removeItem(key) {
		const itemRef = firebase.database().ref(`/stores/${key}`);
		itemRef.remove();
	}
	handleSubmit(event) {
		event.preventDefault();
		const newItem = {
			store: this.state.storename,
		};  
		if(this.state.storename !== "") {
			dbRef.push(newItem);
		}
		this.state.storename = "";
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	addListItem(event){
		event.preventDefault();
		console.log(event.target.id)
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
				stores: newItemsArray,
			});
		});
	}

	render() {
		return (
			<div className='app'>
				<Header />
				<div className='container'>
					<Form 
						handleChange={this.handleChange} 
						handleSubmit={this.handleSubmit}
						storename={this.state.storename}
						currentItem={this.state.currentItem}
					/>
					<section className='display-item'>
						<div className='wrapper'>
							<ul>
								{this.state.stores.map(store => {
									return (
										<StoreItem 
										storeInfo={store} 
										removeItem={this.removeItem}
										/>
									);
								})}
							</ul>
						</div>
					</section>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));