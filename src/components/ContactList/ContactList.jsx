import { Component } from "react";
import css from "./ContactList.module.css";
import PropTypes from 'prop-types';
import { LOCAL_KEY } from "contacts/localKey";

export class ContactList extends Component {

	componentDidMount() {
		this.setLocalStorage(this.props.list)
	}

	componentDidUpdate() {
		this.setLocalStorage(this.props.list);
	}

	componentWillUnmount() {
		this.setLocalStorage([]);
	}

	setLocalStorage = value => {
		localStorage.setItem(LOCAL_KEY, JSON.stringify(value));
	}

	render() {
		const { list, removeContact } = this.props;

		return (
			<ul className={css.contacts__list}>
				{list.map(({ name, id, number }) =>
					<li className={css.contact} key={id}>
						<span>{name}: {number}</span>
						<button
							id={id}
							onClick={removeContact(id)}
							className={css.removeBtn}
							type="button">
							Delete
						</button>
					</li>
				)}
			</ul>
		)
	}
}

ContactList.propTypes = {
	list: PropTypes.arrayOf(PropTypes.exact({
		name: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		number: PropTypes.string.isRequired,
	}))
}