# Página web de restaurante en React + JSX

## Integrantes

- Vielka Katherine Borja Roldán
- José Carlos Fernández Zambrano

## Descripción del emprendimiento

Página web de restaurante italiano.

## Arquitectura del sitio

Carpetas principales:

- `src/App.jsx` - componentes y vistas de la aplicación.
- `src/main.jsx` - punto de entrada de React.
- `src/styles.css` - estilos globales.
- `assets/imgs/` - imágenes públicas usadas por Vite.

Vistas:

- Inicio y destacados.
- Menú del restaurante.
- Información del emprendimiento.
- Formulario de reservación.

## Instrucciones de uso

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Ejecutar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

3. Generar versión de producción:

   ```bash
   npm run build
   ```

## Docker

El proyecto compila la aplicación React con Vite y sirve la carpeta `dist` con Nginx.

```bash
docker build -t restaurante-react .
docker run -p 8080:8080 restaurante-react
```

## Proceso de desarrollo

- Planificación: estructura de información y asignación de vistas.
- Implementación: React, JSX, componentes reutilizables y CSS.
- Revisión: pruebas de navegación, compilación y accesibilidad básica.
