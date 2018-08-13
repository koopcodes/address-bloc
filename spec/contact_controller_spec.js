const ContactController = require('../controllers/ContactController');
const sequelize = require('../db/models/index').sequelize;

describe('ContactController', () => {
	beforeEach(done => {
		this.book = new ContactController();
		// #1 Before each test, we want to clear the test database of any entries created.
		sequelize
			.sync({ force: true })
			.then(res => {
				done();
			})
			.catch(err => {
				done();
			});
	});

	// #2 We want to scope the call to describe to the ContactController suite.
	describe('#addContact()', () => {
		it('should add a single contact into the book', done => {
			this.book
				.addContact('Alice', '001-101-1010', 'alice@blocstudent.io')
				.then(contact => {
					expect(contact.name).toBe('Alice');
					expect(contact.phone).toBe('001-101-1010');
					expect(contact.email).toBe('alice@blocstudent.io');
					done();
				})
				.catch(err => {
					done();
				});
		});
	});

	describe('#getContacts()', () => {
		it('should return an empty array when no contacts are available', done => {
			this.book
				.getContacts()
				.then(contacts => {
					expect(contacts.length).toBe(0);
					done();
				})
				.catch(err => {
					console.log(err);
					done();
				});
		});

		it('should return an array of contacts when contacts are available', done => {
			this.book
				.addContact('Alice', '001-101-1010', 'alice@example.com')
				.then(() => {
					this.book.getContacts().then(contacts => {
						expect(contacts.length).toBe(1);
						done();
					});
				})
				.catch(err => {
					console.log(err);
					done();
				});
		});
	});

});
