const button = document.querySelector('button');
const notes = document.querySelector('.notes');
const textarea = document.querySelector('textarea');
const label = document.querySelector('label');

let arrayNotes = [];

document.addEventListener('DOMContentLoaded', () => {
	if(localStorage.getItem('myNotes') !== null) {
		let previousData = JSON.parse(localStorage.getItem('myNotes')); // сохраненные данные в виде строки получаю в массив

		for(let i = 0; i < previousData.length; i++) {
			arrayNotes.push(previousData[i]); // добавляю в новый массив старые данные
		}
	}

	render(notes, arrayNotes); // запускаю функцию рендеринга старых заметок
});

button.addEventListener('click', () => {
	let text = textarea.value; // нахожу значение в textarea

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
		arrayNotes.push(text); // добавление значений в массив заметок
	}

	let localNotes = JSON.stringify(arrayNotes); // собираем заметки (строка)
	localStorage.setItem('myNotes', localNotes); // установка ключа хранилища с массивом значений в виде строк

	// console.log(JSON.parse(localStorage.getItem('myNotes'))); // это массив

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