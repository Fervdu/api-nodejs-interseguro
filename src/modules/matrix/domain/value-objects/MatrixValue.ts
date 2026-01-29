import { DomainError } from '../../../../shared/errors/DomainError';

export class MatrixValue {
  private readonly matrix: number[][];

  constructor(matrix: number[][]) {
    this.validate(matrix);
    this.matrix = matrix;
  }

  get value(): number[][] {
    return this.matrix;
  }


private validate(matrix: number[][]): void {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new DomainError('Matrix must be a non-empty array');
  }

  const rowLength = matrix[0].length;
  
  if (rowLength === 0) {
    throw new DomainError('Matrix rows cannot be empty');
  }

  matrix.forEach((row, index) => {
    if (!Array.isArray(row)) {
      throw new DomainError(`Row ${index} must be an array`);
    }
    
    if (row.length !== rowLength) {
      throw new DomainError(`All rows must have the same length. Expected ${rowLength}, got ${row.length} at row ${index}`);
    }
    
    row.forEach((cell, colIndex) => {
      if (typeof cell !== 'number' || isNaN(cell)) {
        throw new DomainError(`Invalid number at position [${index}, ${colIndex}]`);
      }
    });
  });
}
}
