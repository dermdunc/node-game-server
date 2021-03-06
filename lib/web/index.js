var api = require('./api');
var web = require('./web');
var utils = require('../utils');

var Server = function(gs, port){
	var self = this;
	
	this.gs = gs; // The GS controls all data, so we go through it
	this.port = port;
	this.server = null;
	
	this.start = function(){
		
		var express = require('express');
		var server = express.createServer();
		var port = self.port || 3000;
		server.listen(port);

		server.use(express.staticProvider(process.cwd() + '/public'));
		server.use(express.bodyDecoder());
		server.use(express.gzip());
		server.set('view engine', 'ejs');
		
		// Error handlers
		server.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
		
		api.handle(server, this.gs);
		web.handle(server, this.gs);
		
		self.server = server;
		utils.log('Web server started on '+port);
	};
};

exports.Server = Server;