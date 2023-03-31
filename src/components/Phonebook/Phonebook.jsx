import { Component } from "react";
import { ContactForm } from "components/ContactForm/ContactForm";

import PropTypes from 'prop-types';
import { ContactList } from "components/ContactList/ContactList";
import { Filter } from "components/Filter/Filter";

export class Phonebook extends Component {

	state = {
		contacts: [],
		filter: "",
	}

	handlerFilter = ({ target: { value } }) => {
		this.setState({
			filter: value,
		});
	}

	getContacts = data => {
		const { name } = data;
		const { contacts } = this.state;

		const isRepeat = contacts.some(
			contact => contact.name === name
		);

		if (isRepeat) {
			this.notificationAlready(name);
			return;
		}

		this.setState(prevState => ({
			contacts: [
				...prevState.contacts,
				data,
			]
		}));
	};

	notificationAlready = name => {
		alert(`${name} is already in contacts`);
	}

	getFilteredContacts = () => {
		const { contacts, filter } = this.state;
		const normalizeFilter = filter.toLowerCase();
		return contacts.filter(({ name }) =>
			name.toLowerCase().includes(normalizeFilter));
	}

	removeContact = id => () => {
		this.setState(({ contacts }) => ({
			contacts: contacts.filter(contact => contact.id !== id)
		}))
	}

	render() {
		const { contacts, name } = this.state;

		const filteredContacts = this.getFilteredContacts();

		return (
			<>
				<h1>Phonebook</h1>
				<ContactForm getContacts={this.getContacts} />
				{
					contacts.length > 0
					&&
					<>
						<h2>Contacts</h2>
						<Filter value={name} handlerFilter={this.handlerFilter} />
						<ContactList list={filteredContacts} removeContact={this.removeContact} />
					</>
				}
			</>
		)
	}
}

Phonebook.propTypes = {
	contactsList: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
	}))
}