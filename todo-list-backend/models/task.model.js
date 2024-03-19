// models/task.model.js
const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

// Create a MySQL pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// constructor
const Task = function(task) {
  this.task = task.task;
  this.completed = task.completed;
};

Task.create = (newTask, result) => {
  pool.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err, null);
      return;
    }
    console.log("created task: ", { id: res.insertId, ...newTask });
    result(null, { id: res.insertId, ...newTask });
  });
};

Task.getAll = result => {
  pool.query("SELECT * FROM tasks", (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(null, err);
      return;
    }
    console.log("tasks: ", res);
    result(null, res);
  });
};

Task.findById = (taskId, result) => {
  pool.query(`SELECT * FROM tasks WHERE id = ${taskId}`, (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found task: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Task with the id
    result({ kind: "not_found" }, null);
  });
};

Task.updateById = (id, task, result) => {
  pool.query(
    "UPDATE tasks SET task = ?, completed = ? WHERE id = ?",
    [task.task, task.completed, id],
    (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Task with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated task: ", { id: id, ...task });
      result(null, { id: id, ...task });
    }
  );
};

Task.remove = (id, result) => {
  pool.query("DELETE FROM tasks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Task with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted task with id: ", id);
    result(null, res);
  });
};

module.exports = Task;
