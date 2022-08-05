# Challenge Telecom Clima

<p align="center"><a href="" target="_blank" ><img width="220" height="180"src="./public/static/Telecom_logo_2021.svg" alt="logo" style="max-width: 100%;border-radius: 10px;padding: 5px;"></a></p>

## Consignas

Las tecnologías a utilizar son NodeJS, ReactJS o React Native. En el caso de preferir RN, utilizarlo de
manera nativa (sin expo).
La siguiente prueba plantea el desarrollo de una aplicación de consulta de clima que pueda visualizar el
pronóstico actual, próximos 5 días para la ciudad actual y de otras 5 ciudades seleccionables.

## Iniciar Proyecto

Primero, ejecute el servidor de desarrollo:

```bash
npm install
# o
yarn install
```

Luego debemos crear un archivo .env en la raiz del proyecto, con las propiedades que tiene el archivo .example.env que lo puse a modo de ejemplo

Por ultimo, si ya contamos con el servidor iniciado, debemos iniciar nuestro proyecto frontend de manera local. Para ello, vamos a ingresar el siguiente comando en la terminal

```bash
npm run dev
# o
yarn run dev
```

## Descripcion

Este proyecto de frontend fue solicitado como challenge en una entrevista de trabajo a cargo de Jennifer Mallo.

El proyecto esta desarrollado en ReackJS con typescript.

El proyecto se encuentra en netlify que es un servidor gratuito https://telecomclima.netlify.app/ cabe aclarar que al cargar el clima por defecto no será el de su localidad porque el servidor se encuentra en otro lugar. Para corroborar que funciona bien, debe correr el servidor de manera local con los pasos anteriores.

## Aclaración

```bash
1- El proyecto fue desarrollado en menos de 48hs.
2- El diseño no es tenido como requerimiento.
3- Existen algunos fix por mejorar, como es el caso de nuevo componente para la card del clima, funcionamiento del boton favorito al volver al home, manera responsive, entro otros pequeños fix.
4- Cuando estamos en Home podemos agregar en favorito, luego abrimos el menu desplegable y podemos observar que se encuentra agregado. Al hacer click sobre uno de ellos, nos permitirá visualizar el clima de los proximos 5 dias.
5- Proyecto Backend: https://github.com/bertini91/TelecomClimaBackend
```

### Desarrollador

Nicolás Bertini Argañaras
[https://www.nicolas-bertini.com.ar/]
[https://www.linkedin.com/in/nicolas-bertini-argañaras/]
