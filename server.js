// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
app.set('views engine','pug');
app.set('views','./views');
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
var todoList = [
  { name: "Đi chợ" },
  { name: "Nấu cơm" },
  { name: "Rửa bát" },
  { name: "Học code tại CodersX" }
];
app.get("/todos", function(req, res) {
  var q = req.query.q;
  if (q){
  var matchedTodo = todoList.filter(function(todo) {
    if (todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1){
      return todo
    }
  });
 } else {
    matchedTodo = todoList;
  }
  res.render("index.pug", {todoList: matchedTodo,q:q});
})
app.get('/todos/create', function(req,res){
  res.render('create.pug')
})
app.post('/todos/create', function(req,res){
  todoList.push(req.body)
  res.render('index.pug',{todoList:todoList})
  res.redirect('back')
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
