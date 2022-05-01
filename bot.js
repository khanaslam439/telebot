const { Telegraf } = require('telegraf')

var bot = new Telegraf('5314636186:AAGOY4dzA7yzo5nyrDHdtYbMnmjiO8AP2L4')
var rules = false,
	balance = 0, selected = {
		product: '',
		category: ''
	};
var menus = {
	reply_markup: {
		inline_keyboard: [
			[{text: `My Profile`, callback_data: 'myProfile'}],
			[{text: `Add Balance`, callback_data: '2'}],
			[{text: `Buy Leads`, callback_data: 'buy-lead'}],
			[{text: `Preorder Leads`, callback_data: 'preorder-lead'}],
			[{text: `Rules`, callback_data: 'rules'}],
			[{text: `User Guides`, callback_data: '6'}],
			[{text: `Help`, callback_data: '7'}]
		]
	}
};

var profile = {
	reply_markup: {
		inline_keyboard: [
			[{text: `Add Balance`, callback_data: '2'}],
			[{text: `Back`, callback_data: 'back-to-main'}]
		]
	}
};

var rulesObj = {
	reply_markup: {
		inline_keyboard: [
			[{text: `I agree with the terms of service`, callback_data: 'agreed'}],
			[{text: `Back`, callback_data: 'back-to-main'}]
		]
	}
};
var products = {
	reply_markup: {
		inline_keyboard: [
			[{
				text: 'T-Mobile USA Inc.',
				callback_data: 'P1'
			}],
			[{
				text: 'AT&T Mobility LLC.',
				callback_data: 'P2'
			}],
			[{
				text: 'Verizon Wireless',
				callback_data: 'P3'
			}],
			[{
				text: 'MetroPCS Communications, Inc.',
				callback_data: 'P4'
			}],
			[
				{text: 'Back', callback_data: 'all-categories'} , 
				{text: 'update', callback_data: 'update'}
			]
		]
	}
}

var leads = {
	reply_markup: {
		inline_keyboard: [
			[{
				text: 'CHASE',
				callback_data: 'C1'
			}],
			[{
				text: 'WELLS FARGO',
				callback_data: 'C2'
			}],
			[{
				text: 'BANK OF AMERICA',
				callback_data: 'C3'
			}],
			[{
				text: 'M&T BANK',
				callback_data: 'C4'
			}],
			[{
				text: 'CITI BANK',
				callback_data: 'C5'
			}],
			[{
				text: 'U.S BANK',
				callback_data: 'C6'
			}],
			[
				{text: 'Back', callback_data: 'back-to-main'} , 
				{text: 'update', callback_data: 'update'}
			]
		]		
	}
}	

bot.command('start', ctx => {
	bot.telegram.sendMessage(ctx.chat.id, 'Main Menu', menus)
});

bot.action('myProfile', ctx => {
	ctx.deleteMessage();
	bot.telegram.sendMessage(ctx.chat.id, `Your chat ID: ${ctx.chat.id} \n Your Balance: 0 USD`, profile);
})

bot.action('back-to-main', ctx => {
	ctx.deleteMessage();
	bot.telegram.sendMessage(ctx.chat.id, 'Main Menu', menus)
})

bot.action('all-categories', ctx => {
	ctx.deleteMessage();
	bot.telegram.sendMessage(ctx.chat.id, 'Select Category', leads)
})

bot.action('rules', ctx => {
	ctx.deleteMessage();
	bot.telegram.sendMessage(ctx.chat.id, 'Rules not configured', rulesObj)
})

bot.action('agreed', ctx => {
	rules = true;
	ctx.deleteMessage();
	bot.telegram.sendMessage(ctx.chat.id, 'Main Menu', menus);
});

bot.action(['buy-lead', 'preorder-lead'], ctx => {
	ctx.deleteMessage();
	bot.telegram.sendMessage(ctx.chat.id, 'Select Category', leads);
})
bot.action(['C1', 'C2', 'C3', 'C4', 'C5', 'C6'], ctx => {
	ctx.deleteMessage();
	
	bot.telegram.sendMessage(ctx.chat.id, 'Select Product', products);
});
bot.action(['P1', 'P2', 'P3', 'P4'], ctx => {
	ctx.deleteMessage();
	var stock = [32, 41, 15, 76, 60];
	var stockCount = stock[Math.round(Math.random() * 4)];
	bot.telegram.sendMessage(ctx.chat.id, `Category: 3. BANK OF AMERICA \n Product: [Verizon Wireless] \n Quantity: ${stockCount} \n Price: 12 \n Wholesale Price: 10`,  {
		reply_markup: {
			inline_keyboard: [
				[{
					text: 'Cancel',
					callback_data: 'cancel-lead'
				}]
			]
		}
	});
});

bot.action('cancel-lead', ctx => {
	ctx.reply('Buying lead cancelled');
});
// bot.start((ctx) => ctx.reply('Welcome'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()



// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
