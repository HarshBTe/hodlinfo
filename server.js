const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "./index.html");
});


app.listen(port, () =>{
	console.log(`Example app listening on port ${port}`)
});


const { Pool, Client } = require('pg');

const client = new Client({
	user: 'postgres',
	password: 'HarshD36@',
	host: 'localhost',
	port: '3000',
	database: 'postgres',
});


client.connect();

// Creating Table in database

const createTable = `
  CREATE TABLE cryptocurrency(
    name varchar(50),
    last FLOAT,
	buy FLOAT,
	sell FLOAT,
	volume FLOAT,
	base_unit varchar(10)
  );
`;

// client.query(createTable, (err, result) => {
// 	if (err) {
// 		console.error('Error creating table', err);
// 	} else {
// 		console.log('Table created successfully');
// 	}

// 	client.end();
// });


// Fetching First 10 objects data in new_arr from API


async function getData() {
	const url = 'https://api.wazirx.com/api/v2/tickers';
	const response = await fetch(url);
	const jsonResponse = await response.json();

  
  let arr = [0,1,2,3,4,5,6,7,8,9];
  let new_arr = [];

  for (let j of arr){
    var firstKey = Object.values(jsonResponse)[j];
    new_arr.push(firstKey);
  } 

  return new_arr;
}

let new_arr = getData();


//Inserting rows into the table


const pool = new Pool({
	user: 'postgres',
	password: 'HarshD36@',
	host: 'localhost',
	port: '3000',
	database: 'postgres',
  })


//   pool.query(`INSERT INTO cryptocurrency (name , last , buy , sell , volume, base_unit) values
// 	(${new_arr[0].name}, ${new_arr[0].last}, ${new_arr[0].buy}, ${new_arr[0].sell},
// 		 ${new_arr[0].volume}, ${new_arr[0].base_unit})`, (err, res) => {
// 		console.log(err, res)
// 		pool.end()
// 	})

