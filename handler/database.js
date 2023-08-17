const Enmap = require('enmap');

module.exports = new Enmap({
    name: 'userdata', dataDir: `${__dirname}/../db/`,
});
