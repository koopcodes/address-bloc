const MenuController = require('../controllers/MenuController');

// #1: We are calling the describe method and passing MenuController as the name of the test suite. We then pass a function defining the suite. Inside we have another call to describe. We call this function again because we might want to test several methods of the same class and separating them with different describe calls is a good way of grouping them.

describe('MenuController', () => {
	beforeEach(() => {
		this.menu = new MenuController();
	});

	describe('remindMe()', () => {
		it('should return text string when called', () => {
			expect(this.menu.remindMe()).toBe('Learning is a life-long pursuit');
		});
	});
});
