﻿# Aplicación prueba Meli adn

Esta aplicación cumple con los requerimientos solicitados en la prueba enviada por mercado libre.

# Caracteristicas de la prueba

# back-end

Se crea una funcion con node y express en el back-end que cumple con el siguiente requerimiento:

secuencia de ADN contiene patrones característicos de un "mutante". Se evalúa una matriz de ADN (dna) de tamaño n x n, buscando secuencias horizontales, verticales y diagonales de 4 letras iguales consecutivas. Si se encuentran más de una secuencia mutante, la función retorna true, indicando que el ADN es de un mutante. Si no se encuentran secuencias mutantes, retorna false. 

manejo lowdb para controlar la cantidad de stats que se vayan consultando y lograr almacenar cuantos humanos y mutantes da como resultado la aplicación

# front-end

se crea una aplicacion utilizando react 18 y next 14 que cumple con los siguientes requerimientos:

diseño inspirado en mercado libre que realiza por medio de middlewere las consultas al back-end de los end points /mutant y /stats permitiendole al usuario enviar una cadena de adn random la cual determinara si es mutante o no, mostrando en tiempo real los resultados de los stats

manejo de estilos sass
manejo de ssr

## Estructura del Proyecto

El proyecto está dividido en dos partes principales: el frontend y el backend. Asegúrate de instalar las dependencias de cada una y seguir las instrucciones para ejecutarlas.

### 1. Frontend

La carpeta frontend contiene la interfaz de usuario de la aplicación.

- *Paso 1:* Navega a la carpeta frontend:
  bash
  cd meli-frontend
  

- *Paso 2:* Instala las dependencias necesarias:
  bash
  npm install
  

- *Paso 3:* Ejecuta el servidor de desarrollo:
  bash
  npm run dev
  
  Esto iniciará el frontend en modo de desarrollo. Por defecto, estará disponible en http://localhost:3001.

  # evidencias
  ![image](https://github.com/user-attachments/assets/27c9a43c-7506-41bd-8e4f-0b0f4dd41164)
  ![image](https://github.com/user-attachments/assets/b2add68d-560a-4452-874b-d3dea0fc4204)


### 2. Backend

La carpeta backend contiene la lógica del servidor de la aplicación.

- *Paso 1:* Navega a la carpeta backend:
  bash
  cd meli-backend
  

- *Paso 2:* Instala las dependencias necesarias:
  bash
  npm install
  

- *Paso 3:* Ejecuta el servidor:
  bash
  node index.js
  
  El servidor del backend estará disponible en el puerto configurado en el archivo index.js, normalmente http://localhost: 3000.

## Compatibilidad

Esta aplicación cuenta con soporte para dispositivos móviles y de escritorio, lo que permite a los usuarios acceder de forma conveniente desde cualquier plataforma.

### Requisitos Previos

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu máquina para poder ejecutar los comandos descritos anteriormente.
