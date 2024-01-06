import express from 'express'
import { createProductRouter } from './routes/productRoute'
import { ProductService } from './services/productService'

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(express.json())

const productService = new ProductService()
app.use('/products', createProductRouter(productService))

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
