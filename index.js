const button = document.querySelector('button');
const notes = document.querySelector('.notes');
const textarea = document.querySelector('textarea');

let arrayNotes = [];

button.addEventListener('click', () => {
	let text = textarea.value; // находим значение в textarea

	arrayNotes.push(text); // добавляем значение в массив заметок

	let localNotes = JSON.stringify(arrayNotes); // собираем многострочные заметки
	if (localStorage.getItem('myNotes')) {
		localStorage.setItem('myNotes', localNotes);
	} else {
		localStorage.setItem('myNotes', localNotes); // установка ключа хранилища с массивом значений
	}

	console.log(JSON.parse(localStorage.getItem('myNotes')));

	textarea.value = '';
	notes.innerHTML = '';

	render(notes, arrayNotes);
});

function render(parentNode, data) {
	for (let i = 0; i < data.length; i++) {
		let item = data[i];

		const node = document.createElement('div'); // создаем div где лежит одна заметка
		node.classList.add('notes__added'); // добавляем класс для стилизации
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