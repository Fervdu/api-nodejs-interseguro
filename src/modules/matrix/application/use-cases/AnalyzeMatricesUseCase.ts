import { AnalyzeMatrixRequest } from '../dto/AnalyzeMatrixRequest';
import { AnalyzeMatrixResponse, MatrixStats } from '../dto/AnalyzeMatrixResponse';
import { MatrixValue } from '../../domain/value-objects/MatrixValue';
import { MatrixAnalyzer } from '../../domain/services/MatrixAnalyzer';

export class AnalyzeMatricesUseCase {

  execute(request: AnalyzeMatrixRequest): AnalyzeMatrixResponse {
    const results: MatrixStats[] = [];

    for (const rawMatrix of request.matrices) {
      // 1️⃣ Validación fuerte de dominio
      const matrix = new MatrixValue(rawMatrix);

      // 2️⃣ Lógica pura
      const stats = MatrixAnalyzer.calculateStats(matrix.value);
      const isDiagonal = MatrixAnalyzer.isDiagonal(matrix.value);

      // 3️⃣ Adaptar al DTO de salida
      results.push({
        max: stats.max,
        min: stats.min,
        avg: stats.avg,
        sum: stats.sum,
        isDiagonal,
      });
    }

    return { results };
  }
}
