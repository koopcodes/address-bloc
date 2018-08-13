const inquirer = require('inquirer');
const ContactController = require('./ContactController');

module.exports = class MenuController {
	constructor() {
		this.mainMenuQuestions = [
			{
				type: 'list',
				name: 'mainMenuChoice',
				message: 'Please choose from an option below:',
				choices: ['Add new contact', 'View all contacts', 'Get current time', 'Remind Me', 'Exit'],
			},
		];
		this.book = new ContactController();
	}

	addContact() {
		this.clear();
		inquirer.prompt(this.book.addContactQuestions).then(answers => {
			this.book
				.addContact(answers.name, answers.phone, answers.email)
				.then(contact => {
					console.log('Contact added successfully!');
					this.main();
				})
				.catch(err => {
					console.log(err);
					this.main();
				});
		});
	}

	main() {
		console.log('Welcome to AddressBloc!');
		inquirer
			.prompt(this.mainMenuQuestions)
			.then(response => {
				switch (response.mainMenuChoice) {
				case 'Add new contact':
					this.addContact();
					break;
				case 'View all contacts':
					this.getContacts();
					break;
				case 'Get current time':
					this.getTime();
					break;
				case 'Remind Me':
					this.remindMe();
					break;
				case 'Exit':
					this.exit();
				default:
					console.log('Invalid input');
					this.main();
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	clear() {
		console.log('\x1Bc');
	}

	exit() {
		console.log('Thanks for using AddressBloc!');
		process.exit();
	}

	getContacts() {
		this.clear();

		this.book
			.getContacts()
			.then(contacts => {
				for (let contact of contacts) {
					console.log(`
          name: ${contact.name}
          phone number: ${contact.phone}
          email: ${contact.email}
          ---------------`);
				}
				this.main();
			})
			.catch(err => {
				console.log(err);
				this.main();
			});
	}

	getContactCount() {
		console.log(this.contacts.length);
		this.main();
		return this.contacts.length;
	}

	getTime() {
		function addZero(i) {
			if (i < 10) {
				i = '0' + i;
			}
			return i;
		}
		var currentDate = new Date();
		var hours = addZero(currentDate.getHours());
		var minutes = addZero(currentDate.getMinutes());
		var seconds = addZero(currentDate.getSeconds());
		var date = addZero(currentDate.getDate());
		var month = addZero(currentDate.getMonth() + 1);
		var year = currentDate.getFullYear();
		var dateString = 'It\'s ' + hours + ':' + minutes + ':' + seconds + ' on ' + month + '/' + date + '/' + year;
		console.log(dateString);
		this.main();
		return dateString;
	}

	remindMe() {
		console.log('Learning is a life-long pursuit');
		this.main();
		return 'Learning is a life-long pursuit';
	}
};
