import express from 'express'
import { createProductRouter } from './routes/productRoute'
import { ProductService } from './services/productService'
import { ProductRepository } from './repos/productRepository'

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(express.json())

const productRepo = new ProductRepository()
const productService = new ProductService(productRepo)
app.use('/products', createProductRouter(productService))

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
