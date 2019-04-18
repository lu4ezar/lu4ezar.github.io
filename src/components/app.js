// @ts-check
import React from 'react';
import ReactForm from './form';
import List from './list';
import View from '../elements/viewItem';
import Filter from './filter';
import Pagination from './pagination';
import Item from '../Item';
import { DragDropContext } from 'react-beautiful-dnd';
import Layout from '../layout/layout';
import moment from 'moment';
import { isExpired } from '../utils/utils';
import update from 'immutability-helper';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			filteredList: null,
			paginatedList: [],
			item: {},
			mode: 'list'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// есть лишнее
	componentDidMount() {
		if (localStorage.length) {
			this.getDataFromLocalStorage();
		} else {
			let data = this.getItems(12); // нужно только для тестового списка
			this.setState({
				list: data
			});
		}
		window.addEventListener('beforeunload', this.saveDataToLocalStorage);
	}

	componentWillUnmount() {
		this.saveDataToLocalStorage();
		window.removeEventListener('beforeunload', this.saveDataToLocalStorage);
	}

	getDataFromLocalStorage = () => {
		const list = JSON.parse(localStorage.getItem('list'));
		// 'normalize' data: check for expired items and
		// convert date/time strings into date objects
		for (let i = 0; i < list.length; i++) {
			const item = list[i];
			let { status, date, time } = item;
			if (status !== 'completed') {
				item.status = isExpired(item);
			}
			if (date) {
				item.date = moment(date).toDate();
			}
			if (time) {
				item.time = moment(time).toDate();
			}
		}
		this.setState({
			list
		});
	};

	saveDataToLocalStorage = () => {
		localStorage.clear();
		if (this.state.list.length) {
			localStorage.setItem('list', JSON.stringify(this.state.list));
		}
	};

	handleChange(event) {
		const target = event.target;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(obj) {
		let list;
		if (obj.status !== 'completed') {
			obj.status = isExpired(obj);
		}
		// if mode === 'form' => we're adding a new item,
		// so we need to assign unique id and add it to the list
		// 'else' means it was 'edit mode', so we're updating existing item
		if (this.state.mode === 'form') {
			obj.id = this.getUniqueId();
			list = update(this.state.list, { $unshift: [obj] });
		} else {
			const index = this.getItemIndexById(obj.id);
			list = update(this.state.list, { [index]: { $set: obj } });
		}
		this.setState(
			{
				list
			},
			() => this.handleCloseModal()
		);
	}

	handleClickListItem = id => {
		const item = this.getItemById(id);
		this.setState({
			item,
			mode: 'view'
		});
	};

	handleCloseModal = () => {
		this.setState({
			mode: 'list',
			item: {}
		});
	};

	getFilteredList = arr => {
		let list = [...this.state.list];
		list =
			arr && arr.length ? list.filter(({ id }) => arr.includes(id)) : arr;
		this.setState({
			filteredList: list
		});
	};

	getPaginatedList = arr => {
		let list = this.state.filteredList
			? [...this.state.filteredList]
			: [...this.state.list];
		list = list.filter(({ id }) => {
			return arr.includes(id);
		});
		this.setState({
			paginatedList: list
		});
	};

	clearList = () => this.setState({ list: [] });

	render() {
		const { list, filteredList, paginatedList, item, mode } = this.state;
		const forPagination = filteredList ? filteredList : list;
		const noListMessage = !list.length
			? 'Your list is empty'
			: filteredList && !filteredList.length
			? 'Change filter settings or disable it'
			: null;
		const buttonFunctions = {
			view: this.handleClickListItem,
			edit: this.editItem,
			deleteItem: this.deleteItem,
			completed: this.markCompleted
		};
		const modalWindowProps = {
			item,
			mode,
			close: this.handleCloseModal
		};
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Layout
					handleChange={this.handleChange}
					clear={this.clearList}
					rightSide={
						<Filter list={list} onChange={this.getFilteredList} />
					}
					leftSide={
						<List
							list={paginatedList}
							noListMessage={noListMessage}
							btnFunc={buttonFunctions}
						/>
					}
					bottom={
						<Pagination
							list={forPagination}
							onChange={this.getPaginatedList}
						/>
					}
				/>
				{/*			***modal window***		*/}
				{mode !== 'list' &&
					(mode === 'edit' || mode === 'form' ? (
						<ReactForm
							{...modalWindowProps}
							handleSubmit={this.handleSubmit}
						/>
					) : (
						mode === 'view' && (
							<View
								{...modalWindowProps}
								functions={buttonFunctions}
							/>
						)
					))}
			</DragDropContext>
		);
	}

	getItems = n => {
		let arr = [];
		for (let i = 0; i < n; i++) {
			const text = 'test item ' + i;
			const desc = 'test description ' + i;
			const item = new Item(text, desc);
			item.id = i;
			arr.push(item);
		}
		return arr;
	};

	// arr можно убрать, он нужен только для тестового списка
	getUniqueId = () => {
		const arr = this.state.list.map(({ id }) => id);
		for (let i = 0; i < arr.length; i++) {
			if (!arr.includes(i)) {
				return i;
			}
		}
		return arr.length;
	};

	deleteItem = id => {
		let list = this.state.list;
		const index = list.findIndex(item => item.id === id);
		if (window.confirm(`Удалить ${list[index].task}?`)) {
			list = update(list, { $splice: [[index, 1]] });
			this.setState({
				list,
				mode: 'list'
			});
		}
	};

	editItem = id => {
		const item = { ...this.getItemById(id) };
		this.setState(state => ({
			mode: 'edit',
			item
		}));
	};

	markCompleted = id => {
		const item = { ...this.getItemById(id) };
		if (item.status === 'completed') {
			return;
		}
		item.status = 'completed';
		item.date = item.time = moment().toDate();
		const list = [...this.state.list];
		const itemIndex = this.getItemIndexById(id);
		list[itemIndex] = item;
		this.setState({
			list
		});
	};

	reorder = (startIndex, endIndex) => {
		// массив id-значений отфильтрованного списка сопоставляется с оригинальным списком,
		// чтобы получить реальный текущий индекс элементов (react-beautiful-dnd)
		startIndex = this.getItemIndexById(
			this.state.paginatedList[startIndex].id
		);
		endIndex = this.getItemIndexById(this.state.paginatedList[endIndex].id);
		const arr = [...this.state.list];
		const [removed] = arr.splice(startIndex, 1);
		arr.splice(endIndex, 0, removed);
		return arr;
	};

	onDragEnd = result => {
		const { source, destination } = result;
		if (!destination) {
			return;
		}
		if (source.index === destination.index) {
			return;
		}
		const list = this.reorder(source.index, destination.index);
		this.setState({
			list
		});
	};

	itemAlreadyExists = val => {
		this.state.list.some(value => value['task'] === val);
	};

	getItemIndexById = id => {
		const list = [...this.state.list];
		const itemIndex = list.findIndex(item => item.id === id);
		return itemIndex;
	};

	getItemById = id => {
		const list = [...this.state.list];
		const itemIndex = list.findIndex(item => item.id === id);
		return list[itemIndex];
	};
}

export default App;
