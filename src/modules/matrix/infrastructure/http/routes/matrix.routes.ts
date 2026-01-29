import { Router } from 'express';
import { MatrixController } from '../controllers/MatrixController';
import { AnalyzeMatricesUseCase } from '../../../application/use-cases/AnalyzeMatricesUseCase';

const router = Router();

// Dependency injection manual
const analyzeMatricesUseCase = new AnalyzeMatricesUseCase();
const matrixController = new MatrixController(analyzeMatricesUseCase);

router.post('/analyze', (req, res, next) => matrixController.analyze(req, res, next));

export default router;
