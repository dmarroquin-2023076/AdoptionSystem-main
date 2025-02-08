'use strict'

import Animal from '../animal/animal.model.js'  // Correcta importación del modelo
import User from '../user/user.model.js'

// Guardar
export const save = async (req, res) => {
    try {
        let { keeper, ...data } = req.body;
        if (!keeper) {
            return res.status(400).send({ message: 'Keeper ID is required' });
        }

        let user = await User.findById(keeper);
        if (!user) {
            return res.status(404).send({ message: 'Keeper not found' });
        }

        if (user.role !== 'CLIENT') {
            return res.status(403).send({ message: 'Keeper must be a CLIENT' })
        }

        let animal = new Animal({ ...data, keeper: user._id });
        await animal.save();
        return res.status(201).send({ message: 'Animal saved successfully', animal });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error saving animal', error });
    }
}

// Obtener todos los Animales
export const getAll = async (req, res) => {
    try {
        let animals = await Animal.find()
        if (animals.length === 0) {
            return res.send({ message: 'No animals found', animals })
        }
        return res.send({ message: 'Animals found', animals })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'General error', error })
    }
}

// Obtener Animal por ID
export const getId = async (req, res) => {
    try {
        let id = req.params.id

        let animal = await Animal.findById(id)
        if (!animal) {
            return res.status(404).send(
                { message: 'Animal not found' }
            )
        }
        return res.send({ message: 'Animal Found:', animal })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'General Error', error })
    }
}

// Actualizar Animal
export const update = async (req, res) => {
    try {
        let id = req.params.id
        let data = req.body

        let updatedAnimal = await Animal.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )
        if (!updatedAnimal) return res.status(404).send({ message: 'Animal not found and not updated' })
        return res.send({ message: 'Animal updated successfully', updatedAnimal })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'General Error', error })
    }
}

export const deleteAnimal = async (req, res) => {
    try {
        let id = req.params.id
        let deletedAnimal = await Animal.findByIdAndDelete(id)
        if (!deletedAnimal) return res.status(404).send({ message: 'Animal not found, not deleted' })
        return res.send({ message: 'Deleted animal successfully', deletedAnimal })
    } catch (error) {
        console.error('General Error', error);
        return res.status(500).send({ message: 'General Error', error })
    }
}
