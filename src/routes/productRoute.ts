import { Router, Request, Response } from 'express'
import { ProductService } from '../services/productService'

export function createProductRouter(_service: ProductService) {   
    const router = Router()

    router.get('/', async (req: Request, res: Response) => {
        const products = await _service.get()
    
        res.json(products)
    })
    
    router.get('/:id', async (req: Request, res: Response) => {
        const id = Number(req.params.id)

        const product = await _service.getById(id)
    
        res.json(product)
    })
    
    router.post('/', async (req: Request, res: Response) => {
        const newProduct = req.body
        console.log(newProduct)

        await _service.create(newProduct)

        res.status(201).json(newProduct)
    })

    router.patch('/:id', async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const payload = req.body

        await _service.update(id, payload)

        res.status(204).send()
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        const id = Number(req.params.id)

        await _service.delete(id)

        res.status(204).send()
    })

    return router
}
