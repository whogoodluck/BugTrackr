import { Router } from 'express'
import bugController from '../controllers/bug.controller'
import authMiddleware from '../middlewares/auth'

const bugRouter = Router()

bugRouter.use(authMiddleware.authenticateToken)

bugRouter.post('/', bugController.createBug)
bugRouter.get('/my-bugs', bugController.getMyBugs)
bugRouter.get('/:id', bugController.getBugById)

bugRouter.get('/', authMiddleware.requireAdmin, bugController.getAllBugs)

bugRouter.put('/:id', bugController.updateBug)
bugRouter.delete('/:id', bugController.deleteBug)

export default bugRouter
