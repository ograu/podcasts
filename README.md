# Ejecución de la aplicación

Esta aplicación puede ejecutarse en dos modos: **desarrollo** y **producción**.

## Modo desarrollo

En modo desarrollo, los assets (JavaScript, CSS, etc.) se sirven sin minimizar. Pueden estar concatenados para facilitar la depuración, pero el código es legible y fácil de modificar. Para iniciar la aplicación en modo desarrollo, ejecuta:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite, permitiendo recarga en caliente y acceso a los assets sin minificar.

## Modo producción

En modo producción, los assets se sirven concatenados y minimizados para optimizar el rendimiento y reducir el tamaño de descarga. Para construir y servir la aplicación en modo producción, ejecuta:

```bash
npm run build
npm run preview
```

El comando `build` genera los archivos optimizados en la carpeta `dist`, y `preview` inicia un servidor local para probar la versión final.
