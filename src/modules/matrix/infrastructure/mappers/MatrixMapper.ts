import { AnalyzeMatrixRequest } from '../../application/dto/AnalyzeMatrixRequest';

export class MatrixMapper {
  static toAnalyzeRequest(body: any): AnalyzeMatrixRequest {
    if (!body.matrices || !Array.isArray(body.matrices)) {
      throw new Error('Invalid matrices payload');
    }

    return {
      matrices: body.matrices,
    };
  }
}