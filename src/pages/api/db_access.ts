import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2';

export interface DBItem {
  name: string;
  icon: string;
  quality: number;
  item_class: string;
  item_level: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DBItem[]>
) {
  const searchTerm = req.query.searchTerm as string;
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'world',
    port: 3306
  });

  connection.connect();

  connection.query(`SELECT * FROM item WHERE name LIKE '%${searchTerm}%'`, function (error: mysql.QueryError, results: DBItem[]) {
    console.log("attempt query")
    if (error) throw error;
    console.log("successful query")
    console.log(results)
    res.status(200).json(results);
  });

  connection.end();
}
