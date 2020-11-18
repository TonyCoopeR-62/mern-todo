const router = require('express').Router()
const Todo = require('../models/todo.model')

router.route('/').get((req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const { name, description, isCompleted } = req.body
  const date = Date.parse(req.body.date)

  const newTodo = new Todo({
    name,
    description,
    isCompleted,
    date,
  })

  newTodo.save()
    .then(() => res.json('Todo added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json('Todo deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      todo.name = req.body.name
      todo.description = req.body.description
      todo.isCompleted = req.body.isCompleted
      todo.date = Date.parse(req.body.date)
      
      todo.save()
        .then(() => res.json('Todo updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
})


module.exports = router
