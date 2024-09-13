import { readFile } from 'fs/promises'

import dotenv from 'dotenv'
import Job from './models/Job.js'

import connectDB from './db/connect.js'

dotenv.config()

const start = async () => {
    try {
        await connectDB(process.env.DB_URL)

        await Job.deleteMany()

        const jsonProducts = JSON.parse(
            await readFile(new URL('./mock_data.json', import.meta.url))
        )

        await Job.create(jsonProducts)

        console.log('Success')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()