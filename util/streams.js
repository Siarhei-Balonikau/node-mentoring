var program = require('commander');

var actions = {
    reverse: function (str) {
        console.log('reverse');
    },

    transform: function (str) {
        console.log('transform');
    }
}

program
  .version('0.1.0')
  .option('-a, --action <name>', 'Action', function (name) {
      actions[name]();
  })
  .parse(process.argv);
