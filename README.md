# Digital Library

## Description

Digital Library es una aplicación de backend para gestionar una biblioteca doméstica, relacionando autores y libros.

## Tecnologías utilizadas

- Backend: Node.js, Express.
- BBDD: MongoDB.
- Dependencias: dotenv, express, mongoose, cloudinary, multer, multer-storage-cloudinary.
- Dev Dependencias: nodemon.

## Instalación

Para clonar y ejecutar esta aplicación se necesita Git y Node.js (que incluye npm) instalados en tu dispositivo.

- Clonar el repositorio: git clone https://github.com/lamarietaestudi/Digital-Library.git
- Acceder al directorio del proyecto: cd Digital-Library
- Instalar dependencias: npm install
- Ejecutar la aplicación: npm run dev

## Uso

Una vez que la aplicación esté ejecutándose, se accede a ella mediante `http://localhost:3000`

## Scripts disponibles

- npm run start: inicia la aplicación.
- npm run dev: inicia la aplicación en modo desarrollo con nodemon.
- npm run authorsSeed: carga en la BBDD datos de autores.
- npm run booksSeed: carga en la BBDD datos de libros.

## EndPoints

### Colección Autores (Authors)

| Método     | URL            | Descripción                          | Permisos          |
| ---------- | -------------- | ------------------------------------ | ----------------- |
| **GET**    | `/authors`     | Carga a todos los autores de la BBDD | Cualquier usuario |
| **POST**   | `/authors`     | Crea un nuevo autor en la BBDD       | Cualquier usuario |
| **PUT**    | `/authors/:id` | Actualiza los datos de un autor      | Cualquier usuario |
| **DELETE** | `/authors/:id` | Borra un autor de la BBDD            | Cualquier usuario |

### Colección Libros (Books)

| Método     | URL          | Descripción                         | Permisos          |
| ---------- | ------------ | ----------------------------------- | ----------------- |
| **GET**    | `/books`     | Carga a todos los libros de la BBDD | Cualquier usuario |
| **POST**   | `/books`     | Crea un nuevo libro en la BBDD      | Cualquier usuario |
| **PUT**    | `/books/:id` | Actualiza los datos de un libro     | Cualquier usuario |
| **DELETE** | `/books/:id` | Borra un libro de la BBDD           | Cualquier usuario |

## Aviso Legal

### Proyecto Práctico

Este proyecto es una práctica personal y no representa un producto comercial. Está destinado a la demostración de habilidades técnicas y el aprendizaje.
