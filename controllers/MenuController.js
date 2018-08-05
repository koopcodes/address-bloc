const inquirer = require('inquirer');

module.exports = class MenuController {
	constructor() {
		this.mainMenuQuestions = [
			{
				type: 'list',
				name: 'mainMenuChoice',
				message: 'Please choose from an option below: ',
				choices: ['Add new contact', 'Display Current Time and Date', 'Exit'],
			},
		];
		this.contacts = [];
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

	addContact() {
		this.clear();
		console.log('addContact called');
		this.main();
	}

	clear() {
		console.log('\x1Bc');
	}

	exit() {
		console.log('Thanks for using AddressBloc!');
		process.exit();
	}

	getDate() {
    function addZero(i) {if (i < 10) {i = "0" + i;} return i;}
		var currentDate = new Date();
		var hours = addZero(currentDate.getHours());
		var minutes = addZero(currentDate.getMinutes());
		var seconds = addZero(currentDate.getSeconds());
		var date = addZero(currentDate.getDate());
		var month = addZero(currentDate.getMonth() + 1);
		var year = currentDate.getFullYear();
		var dateString = 'It\'s ' + hours + ':' + minutes + ':' + seconds + ' on ' + (month) + '/' + date + '/' + year;
		console.log(dateString);
	}
};
