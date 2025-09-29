# Guardián IA

"Aplicación impulsada por Inteligencia Artificial (IA) para el análisis de seguridad en espacios de trabajo. Genera informes de riesgo profesionales para el personal de servicio, basándose en la legislación argentina vigente, con el fin de prevenir accidentes y garantizar el cumplimiento normativo."

## Configuración y Ejecución Local

Siga estos pasos para configurar y ejecutar el proyecto en su máquina local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- npm (generalmente se instala con Node.js)

### Pasos

1.  **Instalar dependencias:**
    Navegue a la carpeta raíz del proyecto y ejecute el siguiente comando para instalar todas las dependencias necesarias.
    ```bash
    npm install
    ```

2.  **Configurar la clave de API de Gemini:**
    Para que la aplicación se comunique con la API de Gemini, necesita una clave de API.
    
    Cree un archivo llamado `.env.local` en la raíz del proyecto.
    
    Dentro de `.env.local`, agregue su clave de API de la siguiente manera:
    ```
    API_KEY="SU_CLAVE_DE_API_AQUI"
    ```
    Reemplace `SU_CLAVE_DE_API_AQUI` con su clave de API de Google Gemini.

    > **Importante:** La aplicación está configurada para usar la variable de entorno `API_KEY`. Asegúrese de usar este nombre exacto en su archivo `.env.local`.

3.  **Ejecutar la aplicación:**
    Una vez que las dependencias estén instaladas y la clave de API configurada, inicie el servidor de desarrollo local.
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    El comando anterior iniciará un servidor de desarrollo. Abra su navegador web y visite la URL que se muestra en la terminal (generalmente es `http://localhost:5173` o similar).
