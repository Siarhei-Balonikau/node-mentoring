var minimist = require('minimist');
var fs = require('fs');
var util = require('util');
var csv = require("csvtojson");

function reverse() {
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function(data) {
        process.stdout.write(reverseString(data));
    });
}

function transform() {
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function(data) {
        process.stdout.write(data.toUpperCase());
    });
}

function outputFile(file) {
    var reader = fs.createReadStream(file);
    reader.setEncoding('utf8');
    reader.on('data', function(data) {
        process.stdout.write(data);
    });
}

function convertedFromFile(file) {
    if (fs.existsSync(file)) {
        csv()
            .fromFile(file)
            .then(function(jsonObj) {
                process.stdout.write(JSON.stringify(jsonObj));
            })
    } else {
        console.log("File doesn't exist");
    }
}

function convertedToFile(file) {
    if (fs.existsSync(file)) {
        var writeStream = fs.createWriteStream(file.replace('csv', 'json'));
        csv()
            .fromFile(file)
            .then(function(jsonObj) {
                writeStream.write(JSON.stringify(jsonObj));
            })
    } else {
        console.log("File doesn't exist");
    }
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function handleCommandLine(argv) {
    if (argv.help || argv.h || Object.keys(argv).length < 2) {
        return printHelpMessage();
    }

    const action = argv.action || argv.a;
    const file = argv.file || argv.f;

    try {
        switch (action) {
            case 'reverse':
                reverse();
                break;
            case 'transform':
                transform();
                break;
            case 'outputFile':
                outputFile(file);
                break;
            case 'convertedFromFile':
                convertedFromFile(file);
                break;
            case 'convertedToFile':
                convertedToFile(file);
                break;
            default:
                console.log('You write wrong parameters');
                printHelpMessage();
                break;
        }
    } catch (e) {
        return printHelpMessage(e);
    }
}

function printHelpMessage(e) {
    console.log(e);
    console.log('Use --action or --a for choosing function');
    console.log('Use --file or --f for setting file');
}

handleCommandLine(minimist(process.argv.slice(2)));
