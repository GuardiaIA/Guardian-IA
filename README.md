# Guardián IA

Aplicación impulsada por Inteligencia Artificial (IA) para el análisis de seguridad en espacios de trabajo. Genera informes de riesgo profesionales para el personal de servicio, basándose en la legislación argentina vigente, con el fin de prevenir accidentes y garantizar el cumplimiento normativo.

## Configuración y Ejecución Local

Siga estos pasos para configurar y ejecutar el proyecto en su máquina local. El proceso se ha simplificado para que no necesite configurar archivos de entorno.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- npm (generalmente se instala con Node.js)

### Pasos

1.  **Instalar dependencias:**
    Navegue a la carpeta raíz del proyecto y ejecute el siguiente comando para instalar todas las dependencias necesarias.
    ```bash
    npm install
    ```

2.  **Ejecutar la aplicación:**
    Inicie el servidor de desarrollo local con el siguiente comando:
    ```bash
    npm run dev
    ```

3.  **Configurar la clave de API en el navegador:**
    -   El comando anterior iniciará un servidor de desarrollo. Abra su navegador web y visite la URL que se muestra en la terminal (generalmente `http://localhost:5173`).
    -   La primera vez que abra la aplicación, se le pedirá que ingrese su clave de API de Google Gemini.
    -   Pegue su clave y haga clic en "Guardar y Continuar". La clave se guardará en la sesión de su navegador para que no tenga que volver a ingresarla.
    -   Puede obtener su clave de API gratuita en [Google AI Studio](https://aistudio.google.com/app/apikey).

¡Eso es todo! Ahora puede iniciar sesión y utilizar la aplicación.

## Despliegue en GitHub Pages

Este proyecto se puede desplegar fácilmente como un sitio estático en GitHub Pages.

1.  **Crear un repositorio en GitHub:**
    Cree un nuevo repositorio en GitHub. El nombre del repositorio debe coincidir con el valor de `base` en el archivo `vite.config.ts` (ej. `/Guardian-IA/`). **¡Importante: El valor es sensible a mayúsculas y minúsculas!**

2.  **Subir el código:**
    Suba todos los archivos del proyecto a su nuevo repositorio de GitHub.

3.  **Construir el proyecto:**
    Ejecute el siguiente comando localmente para generar los archivos estáticos para producción. Esto creará una carpeta `docs`. **Importante:** Si ya existe una carpeta `docs`, bórrela antes de ejecutar este comando para asegurar una compilación limpia.
    ```bash
    npm run build
    ```

4.  **Subir la carpeta `docs`:**
    Añada la carpeta `docs` a git, haga commit y suba los cambios a su repositorio.
    ```bash
    git add docs
    git commit -m "Add build artifacts for deployment"
    git push
    ```

5.  **Configurar GitHub Pages:**
    -   En su repositorio de GitHub, vaya a `Settings` > `Pages`.
    -   En la sección "Build and deployment", bajo "Source", seleccione `Deploy from a branch`.
    -   Elija la rama `main` (o la que esté usando) y la carpeta `/docs` como la fuente.
    -   Guarde los cambios.

Su sitio estará disponible en la URL proporcionada por GitHub Pages después de unos minutos.