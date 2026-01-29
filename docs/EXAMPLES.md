# API Examples

Este documento contiene ejemplos prácticos de uso de la API.

## 📋 Índice

1. [Ejemplo Básico](#ejemplo-básico)
2. [Matriz Diagonal](#matriz-diagonal)
3. [Múltiples Matrices](#múltiples-matrices)
4. [Casos de Error](#casos-de-error)

---

## Ejemplo Básico

### Matriz Identidad 2x2

```bash
curl -X POST http://localhost:3000/api/matrix/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "matrices": [
      [[1, 0], [0, 1]]
    ]
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "max": 1,
        "min": 0,
        "avg": 0.5,
        "sum": 2,
        "isDiagonal": true
      }
    ]
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

---

## Matriz Diagonal

### Matriz diagonal 3x3

```bash
curl -X POST http://localhost:3000/api/matrix/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "matrices": [
      [[5, 0, 0], [0, 10, 0], [0, 0, 15]]
    ]
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "max": 15,
        "min": 0,
        "avg": 3.3333,
        "sum": 30,
        "isDiagonal": true
      }
    ]
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

---

## Múltiples Matrices

### Análisis de 3 matrices diferentes

```bash
curl -X POST http://localhost:3000/api/matrix/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "matrices": [
      [[1, 2], [3, 4]],
      [[5, 0], [0, 5]],
      [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    ]
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "max": 4,
        "min": 1,
        "avg": 2.5,
        "sum": 10,
        "isDiagonal": false
      },
      {
        "max": 5,
        "min": 0,
        "avg": 2.5,
        "sum": 10,
        "isDiagonal": true
      },
      {
        "max": 1,
        "min": 1,
        "avg": 1,
        "sum": 9,
        "isDiagonal": false
      }
    ]
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

---

## Casos de Error

### Error: Matriz con filas de diferente longitud

```bash
curl -X POST http://localhost:3000/api/matrix/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "matrices": [
      [[1, 2, 3], [4, 5]]
    ]
  }'
```

**Respuesta (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "type": "ValidationError",
    "message": "All rows must have the same length. Expected 3, got 2 at row 1"
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

### Error: Matriz con valores no numéricos

```bash
curl -X POST http://localhost:3000/api/matrix/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "matrices": [
      [[1, "dos"], [3, 4]]
    ]
  }'
```

**Respuesta (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "type": "ValidationError",
    "message": "Invalid number at position [0, 1]"
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

### Error: Matriz vacía

```bash
curl -X POST http://localhost:3000/api/matrix/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "matrices": [[]]
  }'
```

**Respuesta (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "type": "ValidationError",
    "message": "Matrix rows cannot be empty"
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

---


---

## Testing con JavaScript/Fetch

```javascript
const analyzeMatrices = async (matrices) => {
  try {
    const response = await fetch('http://localhost:3000/api/matrix/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matrices }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error.message);
    }

    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

// Ejemplo de uso
analyzeMatrices([
  [[1, 0], [0, 1]],
  [[2, 3], [0, 4]]
]).then(result => {
  console.log('Results:', result.data.results);
});
```
