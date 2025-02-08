import { Router } from "express"
import { save, getAll, getId, update, deleteAnimal } from  '../animal/animal.controller.js'

const api = Router()

api.post('/', save)
api.get('/', getAll)
api.get('/:id', getId)
api.put('/:id', update)
api.delete('/:id', deleteAnimal)

export default api
