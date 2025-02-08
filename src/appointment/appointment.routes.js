import { Router } from "express"
import {
  aggAppointment,
} from "./appointment.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post("/", validateJwt, aggAppointment)


export default api