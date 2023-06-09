import css from "./ContactForm.module.css";
import { Component } from "react";
import { nanoid } from 'nanoid/non-secure';

import PropTypes from 'prop-types';

export class ContactForm extends Component {

	state = {
		name: '',
		number: ''
	}

	submitForm = event => {
		event.preventDefault();
		const { getContacts } = this.props;

		getContacts({
			...this.state,
			id: nanoid(),
		});

		this.reset();
	}

	handleInput = ({ target: { name, value } }) => {
		this.setState({ [name]: value });
	}

	reset = () => {
		this.setState({ name: '', number: '' });
	}

	render() {

		return (
			<form className={css.form} onSubmit={this.submitForm}>
				<label className={css.label} htmlFor="name-id">
					Name
					<input
						value={this.state.name}
						onChange={this.handleInput}
						className={css.input}
						id="name-id"
						type="text"
						name="name"
						pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
						title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
						required
					/>
				</label>
				<label className={css.label} htmlFor="number-id">
					<input
						value={this.state.number}
						onChange={this.handleInput}
						className={css.input}
						id="number-id"
						type="tel"
						name="number"
						pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
						required
					/>
				</label>
			<button className={css.btnSubmit} type="submit">Add contact</button>
		</form>
		)
	}
}

ContactForm.propTypes = {
	name: PropTypes.string,
	number: PropTypes.string,
}