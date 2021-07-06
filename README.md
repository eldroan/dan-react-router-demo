# React router demo

Para agregar react-router a un proyecto tan solo debemos ejecutar
```bash
$ yarn add react-router-dom
```

O si estamos usando `npm`

```bash
$ npm install react-router-dom
```
## Sobre el repositorio

Este respositorio contine un proyecto de ejemplo diseñado para mostrar distintos tipos de rutas que se pueden declarar utilizando react router. 

Una versión deployada del mismo puede verse en [dan-react-router-demo.netlify.app](dan-react-router-demo.netlify.app)

Para inicializar el proyecto se utilizó create-react-app pero no es un requisito necesario para usar react-router.

Para ejecutarlo, primero instalar las dependencias
```bash
$ yarn
```

Y luego ejecutar el proyecto
```
$ yarn start
```

Una vez inicializado veremos una barra de navegación horizontal con botones para distintos ejemplos de rutas, estos son:

- Home: Es la ruta más general que renderizamos al tratar de acceder a `http://localhost:3000/` o `http://localhost:3000`
- Ruta simple: Es un ejemplo de una ruta nombrada de nuestra app que definimos dentro del router
- Ruta nesteada: En este caso definimos una ruta `nested` y dentro un segundo switch con dos rutas `first` y `second` dentro de la ruta padre
- Ruta dinámica: Un ejemplo de una ruta donde admitimos cualquier ruta de la forma `/dynamic/:id` y recuperamos el valor de `id` utilizando herramientas de la librería.

## Sobre react router

Utilizando react-router podemos definir las rutas de nuestra aplicación de manera `declarativa`. Existen 3 tipos de componentes principales en la librería

- Los `routers` o ruteadores como `<BrowserRouter>` y `<HashRouter>`
- Los `matchers` o comparadores de rutas como `<Route>` y `<Switch>`
- Y los componentes de navegación como `<Link>`


### Routers
La raíz de toda aplicación que utiliza react router debe contener un componente `router`  (`BrowserRouter` o `HashRouter`) y tipicamente se wrapea el componente `<App />` con el.

> HashRouter vs BrowserRouter
>
> La unica diferencia para el front de nuestra app es que entre la url base y una ruta el HashRouter agrega un `#` (ej: `http://example.com/#/your/page`) mientras que el BrowserRouter utiliza las urls tradicionales (ej: `http://example.com/your/page`). 
>
> La razón para usar uno u otro esta en la configuración del servidor. Cuando desarrollamos una single page application (SPA) estamos pidiéndole a javascript que maneje la navegación, para esto necesitamos que nuestro servidor responda con nuestra aplicación para todas las rutas posibles.
>
> Un servidor configurado para servir páginas 'tradicionales' (ej: php) retorna recursos distintos en cada ruta por lo que `your/page` en nuestra aplicación retornaría **404 not found**. Aquí es donde cobra sentido el hash router ya que lo que viene luego de `#` **nunca se envia al servidor** por lo cual este responde como si hubiera recibido `http://example.com` y nuestra app maneja la ruta `your/page` evitandonos agregar una configuración especial en el servidor.
> 
> Utilizando create-react-app podemos hacer uso de ambos al momento de desarrollo pero para usar el browser router necesitamos [configuración adicional](https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing).

### Matchers
Dentro de un `router` es que declaramos nuestros comparadores de rutas. Cuando declaramos un `Switch` este busca entre sus hijos los elementos `Route` cuyo path matchee la url actual. Este matcheo sigue las siguientes reglas

- Una ruta se considera que es un match si el `path` esta contenido en la url actual. Es por esto que `/` siempre es un match.
- Si una `Route` es un match se renderizará el componente definido como children de esa route.
- El componente `Switch` busca **EL PRIMER** elemento que matchee en el orden de declaración. Es por esto que nuestras rutas más especificas deberían declararse **antes** que las menos especificas. Por ejemplo, en caso de tener una ruta `/` esta debería ser la última.
- Si ninguna ruta es match no se renderiza nada.

### Navegación

La librería provee un componente `Link` para manjar los links dentro de nuestra aplicación

```jsx
<Link to="/">Home</Link>
```

Este componente es el equivalente al anchor `<a>` de html (de hecho, renderiza uno en el dom al ser utilizado) pero al utilizar react router no debemos utilziar los anchors tradicionales.

Ademas, otro componente interesante de navegación es `Redirect` el cual al momento de renderizarse furza la redirección al path declarado. Un patrón de uso podría ser el siguiente

```jsx
const Profile = (props) => {
  const isAuthenticated = !!props.user

  return !isAuthenticated ? <Redirect to="/login" /> : <ProfilePage user={props.user} />
}
```
## Sobre create-react-app
Para la inicialización de este repositorio se utilizó [create react app](https://create-react-app.dev/) una herramienta para comenzar proyectos de react de manera sencilla, sin configuraciones.