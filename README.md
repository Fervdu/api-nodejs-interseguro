# Matrix Analysis API - Node.js + TypeScript

API RESTful desarrollada con **Node.js**, **Express.js** y **TypeScript** que analiza matrices numéricas calculando estadísticas y detectando propiedades especiales como matrices diagonales.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

---

## Tabla de Contenidos

- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Uso de la API](#-uso-de-la-api)
- [Ejemplos](#-ejemplos)


---

## Características

- ✅ **Análisis de múltiples matrices** simultáneamente
- ✅ **Cálculo de estadísticas**: máximo, mínimo, promedio y suma
- ✅ **Detección de matrices diagonales**
- ✅ **Validación robusta** de entrada con mensajes de error claros
- ✅ **Arquitectura limpia** (Clean Architecture) con separación de capas
- ✅ **TypeScript** para type safety
- ✅ **Seguridad** con Helmet y CORS
- ✅ **Dockerizado** para fácil despliegue
- ✅ **Health check** endpoint para monitoreo
- ✅ **Manejo de errores** centralizado

---

## Arquitectura

Este proyecto implementa **Clean Architecture** con las siguientes capas:

```
┌─────────────────────────────────────────┐
│   Infrastructure (HTTP, Express)        │  ← Frameworks y drivers
├─────────────────────────────────────────┤
│   Presentation (Controllers, Routes)    │  ← Controladores HTTP
├─────────────────────────────────────────┤
│   Application (Use Cases, DTOs)         │  ← Lógica de aplicación
├─────────────────────────────────────────┤
│   Domain (Services, value-objects)      │  ← Lógica de negocio pura
└─────────────────────────────────────────┘
```

## Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Docker** (opcional, para contenerización)

---

## Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

---

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
NODE_ENV=development
PORT=3000
```

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Entorno de ejecución (`development`, `production`, `test`) | `development` |
| `PORT` | Puerto donde corre el servidor | `3000` |

---

## Ejecución

### Modo Desarrollo (con hot-reload)

```bash
npm run dev
```

### Modo Producción

```bash
# 1. Compilar TypeScript a JavaScript
npm run build

# 2. Iniciar servidor
npm start
```

### Verificar compilación de tipos

```bash
npm run type-check
```

El servidor estará disponible en: `http://localhost:3000`

---

## Uso de la API

### Base URL

```
http://localhost:3000
```

### Endpoints Disponibles

#### 1. Health Check

Verifica el estado del servidor.

```http
GET /health
```

**Respuesta exitosa (200 OK):**

```json
{
  "success": true,
  "data": {
    "status": "OK",
    "uptime": 123.456,
    "timestamp": "2024-01-28T12:00:00.000Z",
    "environment": "development"
  }
}
```

---

#### 2. Analizar Matrices

Calcula estadísticas de múltiples matrices.

```http
POST /api/matrix/analyze
Content-Type: application/json
```

**Request Body:**

```json
{
  "matrices": [
    [[1, 0], [0, 1]],
    [[2, 3], [0, 4]]
  ]
}
```

**Respuesta exitosa (200 OK):**

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
      },
      {
        "max": 4,
        "min": 0,
        "avg": 2.25,
        "sum": 9,
        "isDiagonal": false
      }
    ]
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

**Respuesta con error (400 Bad Request):**

```json
{
  "success": false,
  "error": {
    "type": "ValidationError",
    "message": "Matrix must be a non-empty array"
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

---

## Ejemplos

### Ejemplo 1: Matriz Identidad

**Request:**

```bash
curl -X POST http://localhost:3000/api/matrix/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "matrices": [
      [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    ]
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "max": 1,
        "min": 0,
        "avg": 0.3333,
        "sum": 3,
        "isDiagonal": true
      }
    ]
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

---

### Ejemplo 2: Múltiples Matrices

**Request:**

```bash
curl -X POST http://localhost:3000/api/matrix/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "matrices": [
      [[5, 0], [0, 3]],
      [[1, 2], [3, 4]],
      [[10, 0, 0], [0, 20, 0], [0, 0, 30]]
    ]
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "max": 5,
        "min": 0,
        "avg": 2,
        "sum": 8,
        "isDiagonal": true
      },
      {
        "max": 4,
        "min": 1,
        "avg": 2.5,
        "sum": 10,
        "isDiagonal": false
      },
      {
        "max": 30,
        "min": 0,
        "avg": 6.6667,
        "sum": 60,
        "isDiagonal": true
      }
    ]
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

---

### Ejemplo 3: Error - Matriz Inválida

**Request:**

```bash
curl -X POST http://localhost:3000/api/matrix/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "matrices": [
      [[1, 2], [3]]
    ]
  }'
```

**Response (400 Bad Request):**

```json
{
  "success": false,
  "error": {
    "type": "ValidationError",
    "message": "All rows must have the same length. Expected 2, got 1 at row 1"
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

---
