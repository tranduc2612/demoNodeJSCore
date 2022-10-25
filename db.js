const mysql = require("mysql");

class DataBase {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "test",
      charset: "utf8_general_ci",
    });
  }

  runMySQL(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, results, fields) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  }

  async loadData() {
    let sql = "SELECT * from products";
    return await this.runMySQL(sql)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw err;
      });
  }

  async updateData() {
    let sql = "Update * from products";
    return await this.runMySQL(sql)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw err;
      });
  }

  createData(data) {
    let sql = `insert into products (name,price) values ('${data.newName}',${data.newPrice});`;
    this.runMySQL(sql)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteData(id) {
    let sql = `delete from products where id = ${id}`;
    this.runMySQL(sql)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw err;
      });
  }
}
// const db = new DataBase();
// db.loadData
// module.exports = new DataBase();
