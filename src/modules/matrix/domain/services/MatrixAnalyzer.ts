export class MatrixAnalyzer {
  static calculateStats(matrix: number[][]) {
    const values = matrix.flat();
    
    if (values.length === 0) {
      throw new Error('Cannot calculate stats on empty matrix');
    }

    const sum = values.reduce((a, b) => a + b, 0);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = Number((sum / values.length).toFixed(4)); // ← Redondear

    return { sum, max, min, avg };
  }

  static isDiagonal(matrix: number[][]): boolean {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
      return false;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;

    if (rows !== cols) return false;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (i !== j && matrix[i][j] !== 0) {
          return false;
        }
      }
    }

    return true;
  }
}