var mysql = require('mysql');
const config = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'standup',
    port: 8889
  };
const DB = {
    insert: (data) => {
        const connection = mysql.createConnection(config);
        connection.query('INSERT INTO user_details SET ?', data, function (error, results) {
            if (error) throw error;
        });
        connection.end();
    },

    fetch: (name, member) => {
        console.log(name);
        console.log(member);
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection(config);
            connection.query('SELECT * FROM user_details where `STANDUP_NAME` = ? AND `TEAM_SLACK` LIKE ?', [ name, `%${member}%` ], function (error, results) {
                if (error) {
                    reject();
                };
                console.log(results);
                resolve(results);
            });
            connection.end();
        })
    }
}

module.exports = DB;