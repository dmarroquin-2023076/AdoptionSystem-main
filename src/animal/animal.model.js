import mongoose from 'mongoose'  

const animalSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },

        description: {
            type: String,
            maxLength: [50, `Can't be overcome 50 characters`],
            required: [true, 'Description is required']
        },

        age: {
            type: String,
            maxLength: [2, `Can't be overcome 2 characters`],
            required: [true, 'Age is required']
        },
        category: {
            type: String,
            maxLength: [75, `Can't be overcome 75 characters`],
            required: [true, 'Category is required']
        },
        keeper: {
            type: mongoose.Schema.Types.ObjectId,  
            ref: 'User',
            required: [true, 'Keeper ID is required']
        }
    }
)


export default mongoose.model('Animal', animalSchema)  
