import { NextFunction, Request, Response } from 'express';
import { AnalyzeMatricesUseCase } from '../../../application/use-cases/AnalyzeMatricesUseCase';
import { MatrixMapper } from '../../mappers/MatrixMapper';

export class MatrixController {
  constructor(
    private readonly analyzeMatricesUseCase: AnalyzeMatricesUseCase
  ) {}

  // analyze(req: Request, res: Response): Response {
  //   try {
  //     // 1️⃣ Adaptar HTTP → Application
  //     const requestDto = MatrixMapper.toAnalyzeRequest(req.body);

  //     // 2️⃣ Ejecutar caso de uso
  //     const result = this.analyzeMatricesUseCase.execute(requestDto);

  //     // 3️⃣ Responder
  //     return res.status(200).json(result);

  //   } catch (error: any) {
  //     return res.status(400).json({
  //       message: error.message ?? 'Unexpected error',
  //     });
  //   }
  // }

  analyze = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestDto = MatrixMapper.toAnalyzeRequest(req.body);
      const result = this.analyzeMatricesUseCase.execute(requestDto);
      
      res.status(200).json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);  // ← Pasar al middleware de errores
    }
  }
}
