const inquirer = require('inquirer');
const ContactController = require('./ContactController');

module.exports = class MenuController {
	constructor() {
		this.mainMenuQuestions = [
			{
				type: 'list',
				name: 'mainMenuChoice',
				message: 'Please choose from an option below: ',
				choices: ['Add new contact', 'Display Current Time and Date', 'Remind Me', 'Exit'],
			},
		];
		this.book = new ContactController();
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
				case 'Display Current Time and Date':
					this.clear();
					this.getDate();
					this.main();
					break;
				case 'Remind Me':
					this.clear();
					this.remindMe();
					this.main();
					break;
				case 'Exit':
					this.exit();
					break;
				default:
					console.log('Invalid input');
					this.main();
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	addContact() {
		this.clear();
     inquirer.prompt(this.book.addContactQuestions).then((answers) => {
       this.book.addContact(answers.name, answers.phone).then((contact) => {
         console.log("Contact added successfully!");
         this.main();
       }).catch((err) => {
         console.log(err);
         this.main();
       });
     });
	}

	clear() {
		console.log('\x1Bc');
	}

	exit() {
		console.log('Thanks for using AddressBloc!');
		process.exit();
	}

	getContactCount() {
		return this.contacts.length;
	}

	getDate() {
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
		return dateString;
	}

	remindMe() {
		return 'Learning is a life-long pursuit\n\n';
	}
};
