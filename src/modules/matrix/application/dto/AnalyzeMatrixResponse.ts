export interface MatrixStats {
  max: number;
  min: number;
  avg: number;
  sum: number;
  isDiagonal: boolean;
}

export interface AnalyzeMatrixResponse {
  results: MatrixStats[];
}