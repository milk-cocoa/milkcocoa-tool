#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var MilkCocoa = require('milkcocoa');
var fs = require('fs');
var path = require('path');
var cwd = process.cwd();
var output = argv.output || path.resolve(cwd, 'output.csv');

if(!argv.ds) throw new Error('--ds datastore name required.');
if(!argv.app_id) throw new Error('--app_id app_id required.');

var host = argv.host || (argv.app_id + '.mlkcca.com');

if(argv.apikey && argv.apisecret) {
	var milkcocoa = new MilkCocoa(argv.app_id, {
		host: host
	});
}else{
	var milkcocoa = MilkCocoa.connectWithApiKey(argv.app_id, argv.apikey, argv.apisecret, {
		host: host
	});	
}

var cmd = argv['_'][0];

if(cmd == 'export-csv') {
	setTimeout(function() {
		export_csv(function(err) {
			if(err) {
				process.exit(1);
			}else{
				process.exit(0);
			}
		});
	}, 100);
}

function export_csv(cb) {
	var size = argv.size || 2000;
	var history = milkcocoa.dataStore(argv.ds).history();
	var data = [];
	history.sort('desc');
	history.size(500);
	history.limit(Number(size));
	history.on('error', function(err) {
	    console.error(err);
		cb(err);
	});
	history.on('data', function(_data) {
		data = data.concat(_data);
	});
	history.on('end', function(_data) {
		fs.writeFileSync(output, csv_format(data));
		cb(null);
	});
	history.run();
}

function csv_format(jsonData) {
	var header = 'id, timestamp, ' + json_to_csv_header(jsonData[0].value);
	return header + '\n' + jsonData.map(function(d) {
		return d.id + ', ' + d.timestamp + ', ' + json_to_csv(d.value);
	}).join('\n');
}

function json_to_csv(value) {
	return Object.keys(value).map(function(key) {
		return JSON.stringify(value[key]);
	}).join(' ,');
}

function json_to_csv_header(value) {
	return Object.keys(value).join(' ,');
}
