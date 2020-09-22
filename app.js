var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dateFormat = require('dateformat');

const mysql_dbc = require('./src/db/db_con')();
const firebase_dbc = require('./src/db/db_con2');

const util = require('util')

const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const boardRouter = require('./routes/board');
const indexRouter = require('./routes/index');

// const contentRouter = require('./routes/content');
// const channelRouter = require('./routes/channel');
// const companyRouter = require('./routes/company')
// const boardRouter = require('./routes/board');
// const advRouter = require('./routes/adv');

const statusCode = require('./src/utils/statusCode');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


global.dateFormat = dateFormat;

//+++++db connection+++++

const pool = mysql_dbc.init();

pool.query = util.promisify(pool.query);
global.conn = pool;


var _delegateError = conn._protocol._delegateError;

conn._protocol._delegateError = function(err, sequence) {
    if (err.fatal)
        console.trace('MySQL fatal error: ' + err.message);

    return _delegateError.call(this, err, sequence);
};

function handleDisconnect(connection) {
    connection = mysql_dbc.init(); // Recreate the connection, since

    connection.query = util.promisify(connection.query);
    global.conn = connection;// the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
      });                                     // process asynchronous requests in the meantime.
      // If you're also serving http, display a 503 error.
      connection.on('error', function(err) {
      console.log(new Date());
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        console.log(err);                           // server variable configures this)
      }
    });
  };

handleDisconnect(conn);



// pool.on('connection', connection => {
//     console.log(`mysql connection and pool detail: ${connection.threadId} - ${mysqlPoolConnection(pool)}`, );
// });

// pool.on('acquire', connection => {
//     console.log(`mysql acquire and pool detail: ${connection.threadId} - ${mysqlPoolConnection(pool)}`, );
// });

// pool.on('release', connection => {
//     console.log(`mysql release and pool detail: ${connection.threadId} - ${mysqlPoolConnection(pool)}`, );
// });

// pool.on('enqueue', connection => {
//     console.log(`mysql enqueue and pool detail: ${connection.threadId} - ${mysqlPoolConnection(pool)}`, );
// });

// function mysqlPoolConnection(pool) {
//     return `_allConnections: ${pool._allConnections.length}[ ${getConnectionThreadIds(pool._allConnections)} ], _acquiringConnections: ${pool._acquiringConnections.length} [ ${getConnectionThreadIds(pool._acquiringConnections)} ], _freeConnections: ${pool._freeConnections.length} [ ${getConnectionThreadIds(pool._freeConnections)} ]`;
// }
// function getConnectionThreadIds(cons) {
//     return cons.map(con => con.threadId).join(',');
// }


//+++++++++++++++++++++++++

global.statusCode = statusCode;

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/board', boardRouter);
app.use('/index', indexRouter);

module.exports = app;
