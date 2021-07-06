import "./App.css";
import React from "react";
import {
  HashRouter,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
} from "react-router-dom";

const ROUTES = {
  HOME: "/",
  SIMPLE: "/simple",
  NESTED: "/nested",
  NESTED_FIRST: "/nested/first",
  NESTED_SECOND: "/nested/second",
  DYNAMIC: "/dynamic",
};

// Componente principal
export default function App() {
  return (
    <HashRouter>
      <div>
        {/* Esta barra de navegación siempre esta visible */}
        <nav>
          <ul className="horizontal">
            <li>
              {/* Usamos <Link> en lugar de <a> tags para navegar */}
              <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
              <Link to={ROUTES.SIMPLE}>Ruta simple</Link>
            </li>
            <li>
              <Link to={ROUTES.NESTED}>Ruta nesteada</Link>
            </li>
            <li>
              <Link to={ROUTES.DYNAMIC}>Ruta dinámica</Link>
            </li>
          </ul>
        </nav>

        {/* El componente SWITCH busca entre sus children y renderiza 
        el primero cuyo path matchee con la URL actual. */}
        <Switch>
          <Route path={ROUTES.SIMPLE}>
            <Simple />
          </Route>
          <Route path={ROUTES.NESTED}>
            <Nested />
          </Route>
          <Route path={ROUTES.DYNAMIC}>
            <Dynamic />
          </Route>
          <Route path={ROUTES.HOME}>
            <Home />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

// El resto de los componentes también están declarados en este
// archivo por simplicdad pero idealmente deberían ser diferentes.

function Home() {
  return (
    <div className="background">
      <h2>
        <span style={{ fontSize: 50, marginRight: 20 }}>🏠</span>Home
      </h2>
      <p>
        Esta es la página principal de nuestra aplicación. Ingresar a <b>/</b>
        nos lleva aquí.
      </p>
    </div>
  );
}

function Simple() {
  return (
    <div className="background">
      <h2>
        <span style={{ fontSize: 50, marginRight: 20 }}>🛣</span>Ruta simple
      </h2>
      <p>
        Esta página se accede utilizando la ruta <b>{ROUTES.SIMPLE}</b>
      </p>
    </div>
  );
}

function Nested() {
  const selected = { color: "greenyellow", fontWeight: "bold" };
  return (
    <HashRouter>
      <div className="background">
        <nav>
          <ul className="horizontal bad-practice">
            {/* NavLink es similar a Link pero nos permite aplicar
            un estilo o classname diferente si la ruta es un match*/}
            <li>
              <NavLink to={ROUTES.NESTED_FIRST} activeStyle={selected}>
                Primera Ruta Nesteada
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.NESTED_SECOND} activeStyle={selected}>
                Segunda Ruta Nesteada
              </NavLink>
            </li>
          </ul>
        </nav>
        <h2>
          <span style={{ fontSize: 50, marginRight: 20 }}>🤯</span>Ruta nesteada
        </h2>
        <p>Esta ruta tiene su propio HashRouter dentro del router principal.</p>
        {/* Un switch adentro de otro switch */}
        <Switch>
          <Route path={ROUTES.NESTED_FIRST}>
            <FirstNested />
          </Route>
          <Route path={ROUTES.NESTED_SECOND}>
            <SecondNested />
          </Route>
          <Route path={ROUTES.HOME}>
            <HomeNested />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

function HomeNested() {
  return (
    <div className="background divider">
      <h3>Ruta base</h3>
      <p>
        Esta es la ruta que mostramos al navegar a '{ROUTES.NESTED}' para ver
        alguna de las otras rutas presionar en 'Primera Ruta Nesteada' o
        'Segunda Ruta Nesteada'
      </p>
    </div>
  );
}

function FirstNested() {
  return (
    <div className="background">
      <h2>Primera Ruta Nesteada</h2>
      <p>Esta es la ruta que mostramos al navegar a '{ROUTES.NESTED_FIRST}'</p>
    </div>
  );
}

function SecondNested() {
  return (
    <div className="background">
      <h2>Segunda Ruta Nesteada</h2>
      <p>Esta es la ruta que mostramos al navegar a '{ROUTES.NESTED_SECOND}'</p>
    </div>
  );
}

function Dynamic() {
  return (
    <HashRouter>
      <div className="background">
        <nav>
          <ul className="horizontal bad-practice">
            {/* NavLink es similar a Link pero nos permite aplicar
            un estilo o classname diferente si la ruta es un match*/}
            <li>
              <Link to={`${ROUTES.DYNAMIC}/first`}>Primera</Link>
            </li>
            <li>
              <Link to={`${ROUTES.DYNAMIC}/second`}>Segunda</Link>
            </li>
            <li>
              <Link to={`${ROUTES.DYNAMIC}/third`}>Tercera</Link>
            </li>
          </ul>
        </nav>
        <h2>
          <span style={{ fontSize: 50, marginRight: 20 }}>🏃‍♂️</span>Ruta dinámica
        </h2>
        <p>
          Esta es una única ruta que renderiza distinto contenido dependiendo de
          la url
        </p>
        {/* Le asignamos el valor id pero podría ser cualquier otra cosa relevante
         al dominio de la aplicación */}
        <Switch>
          <Route path={`${ROUTES.DYNAMIC}/:id`}>
            <DynamicChild />
          </Route>
          {/** Tambien agregamos un ruteo al path base, no es necesario pero sirve
          para manejar el caso de no haber seleccionado ningun path */}
          <Route path={`${ROUTES.DYNAMIC}`}>
            <DynamicChild />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

function DynamicChild() {
  // Importamos el hook useParams de la librería
  // para recuperar la parte dinamica de la URL
  let { id } = useParams();

  return (
    <div>
      <hr />
      {!id && (
        <p>
          Seleccionar algun elemento
          <span style={{ fontSize: 30, marginLeft: 20 }}>😔</span>
        </p>
      )}
      {!!id && (
        <p>
          El elemento seleccionado es: '{id}'
          <span style={{ fontSize: 30, marginLeft: 20 }}>😃</span>
        </p>
      )}
    </div>
  );
}
