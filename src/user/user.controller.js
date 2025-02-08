//Gestionar funciones de usuario
 
import User from './user.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
 
//Obtener todos
export const getAll = async(req,res)=>{
    try{
        //Configuraciones de paginación
        const { limit = 20, skip = 0 } = req.query
        //Consultar
        const users = await User.find()
            .skip(skip)
            .limit(limit)
           
        if(users.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Users not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Users found:',
                users
            }  
        )
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error', err})
    }
}
 
//Obtener uno
 
export const get = async(req, res)=>{
    try {
        //obtener el id del Producto a mostrar
        let { id } = req.params
        let user = await User.findById(id)
 
        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found: ',
                user
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}
 
//Actualizar datos generales
export const update = async(req, res)=>{
    try{
        const { id } = req.params
 
        const data = req.body
 
        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
 
        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated',
                user: update
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}
 
//Actualizar profilePicture
 
//Actualizar password ****
export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params // Extraer el ID del usuario de los parámetros de la solicitud
        const { oldPassword, newPassword } = req.body// No necesitas userLoggin si estás usando el ID

        // Buscar el usuario por ID
        const user = await User.findById(id) // Usar findById para buscar al usuario por su ID

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User  not found'
            })
        }

        // Verificar la contraseña antigua
        if (!await checkPassword(user.password, oldPassword)) {
            return res.status(400).send({
                success: false,
                message: 'Old password is incorrect'
            })
        }

        // Encriptar la nueva contraseña
        user.password = await encrypt(newPassword) // Encriptar la nueva contraseña
        const updatedUser  = await user.save()// Guardar el usuario con la nueva contraseña encriptada

        return res.send({
            success: true,
            message: 'Password updated successfully',
            user: updatedUser   
        }
    )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { message: 'General error with update password function', err }
        )
    }
}