# Employee Onboarding Dashboard


## Comenzando

Primero, clona el repositorio e instala las dependencias:

```bash
git clone <https://github.com/Matisayas/hr-systems.git>
cd <hr-systems>
npm install



## Luego, ejecuta el servidor de desarrollo:
npm run dev

Abre http://localhost:3000
en tu navegador para ver la aplicación. La página se actualizará automáticamente al modificar archivos.

## Descripción del Proyecto
El Employee Onboarding Dashboard es una aplicación web diseñada para gestionar la creación y edición de empleados de manera eficiente. Cuenta con una interfaz intuitiva, modos de visualización oscuro/claro y varias funcionalidades que facilitan la gestión de la información de los usuarios.


## Decisiones Técnicas

-Se utilizó App Router para la gestión de rutas y redirección de páginas.
-Se crearon componentes reutilizables a nivel global, utilizados en distintos servicios de la aplicación.
-Se middleware para rutas protegidas 
-Se utilizó local storage y cookies para la persistencia de datos y la gestión de sesiones.
-Se utilizo react hook form en los formularios
-Se utilizo zod para la validacion de datos
-Se divido por modulos en el caso de empleados es uno solo con sus paginas, hooks y forms

## Funcionalidades Implementadas

-Diseño de UI moderno y responsive

-Sidebar con navegación (actualmente con la ruta "Empleados")

-Tabla de empleados con columnas dinámicas y búsqueda global

-Botón de cuenta con funcionalidad de cierre de sesión

-Página de creación de empleados

-Página de edición de empleados dentro de un modal

-Gestión de cookies y local storage

-Refactorización de código para mantener buenas prácticas

-Modo oscuro/claro

-Configuración visual del sidebar y opciones personalizadas de UI

##Tiempo Aproximado Invertido
Se estima que el desarrollo de este proyecto tomó aproximadamente 12 horas.



## Uso de Inteligencia Artificial
Se utilizó IA para agilizar la implementación de algunas funcionalidades y la organización del código, manteniendo un control manual sobre la calidad y consistencia del proyecto.


## Mejoras Futuras
Con más tiempo, se podrían implementar mejoras como:

-Optimización de la combinación de colores para mayor contraste y accesibilidad

-Página de visualización detallada de la información del usuario

-Formularios en pasos (steps) para listas largas, evitando scroll extenso

## Credenciales
email: admin@rebuhr.com
password: password123
(Las credenciales de admin se visualizan abajo del login y en el boton del usuario)
