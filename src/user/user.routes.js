import { Router } from "express"
import { 
    getAll, 
    get, 
    update,
    updatePassword,

} from "./user.controller.js"
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { updateUserValidator } from "../../middlewares/validators.js"


const api = Router()

//Rutas privadas (Solo puede acceder si está logeado)
api.get('/', validateJwt, getAll)
api.get('/:id',validateJwt,  get)
api.put('/:id',validateJwt, updateUserValidator, update)
api.put('/pass/:id', validateJwt, updatePassword);


export default api