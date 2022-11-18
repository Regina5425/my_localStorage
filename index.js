const button = document.querySelector('button');
const notes = document.querySelector('.notes');
const textarea = document.querySelector('textarea');
const label = document.querySelector('label');

let arrayNotes = [];

document.addEventListener('DOMContentLoaded', () => {
	if(localStorage.getItem('myNotes') !== null) {
		let previousData = JSON.parse(localStorage.getItem('myNotes'));

		for(let i = 0; i < previousData.length; i++) {
			arrayNotes.push(previousData[i]);
		}
	}

	render(notes, arrayNotes);
});

button.addEventListener('click', () => {
	let text = textarea.value;

	if(textarea.validity.valueMissing) {
		let error = document.createElement('div');
		error.classList.add('error');
		error.innerHTML = `Поле не заполнено`;
		label.append(error);

		textarea.addEventListener('change', () => {
			error.remove();
		});
	}

	if(text !== '') {
		arrayNotes.push(text);
	}

	let localNotes = JSON.stringify(arrayNotes);
	localStorage.setItem('myNotes', localNotes);

	textarea.value = '';
	notes.innerHTML = '';

	render(notes, arrayNotes);
});

function render(parentNode, data) {
	for (let i = 0; i < data.length; i++) {
		let item = data[i];

		const node = document.createElement('div');
		node.classList.add('notes__added');
		node.textContent = item;

		const delBtn = document.createElement('button');
		delBtn.classList.add('del__btn');
		delBtn.textContent = 'Удалить';

		delBtn.addEventListener('click', () => {
			node.remove();
			data.splice(i, 1);
		});

		parentNode.append(node);
		node.append(delBtn);
	}
}