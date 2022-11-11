# react-promise-tracker

Componente React Hoc, rastreador de promesas.


Para ver como funciona: [Demo](https://stackblitz.com/edit/react-promise-tracker-default-area-sample)

## ¿Por qué necesito esto?

Cuando realizamos llamadas AJAX (usando Fetch, Axios o cualquier tipo de librería...), resulta que ciertas llamadas son bloqueantes (es decir tenemos que evitar que el usuario pueda interactuar con la aplicación mientras se está realizando la llamada), y otras las hacemos en background (el usuario
puede seguir interactuando con la aplicación mientras se está realizando la llamada).

Gestionar esto no es fácil, ya que dichas llamadas se pueden realizar a
diferentes niveles de la aplicación ¿Cómo podemos hacer para saber si
tenemos que mostrar un spinner de carga y bloquear el UI? React Promise
Tracker se encarga de gestionar ese estado por ti.

Esta librería implementa:

- Una función que te permitirá que la librería haga tracking de una promesa.
- Un componente HOC, que  nos permitirá  usar un wrapper para mostrar/ocultar un spinner que indique que se están cargando datos... (se mostrará cuando el número de peticiones rastreadas sea mayor que cero, y estará oculto cuando no).

## Instalación

```cmd
npm install react-promise-tracker --save
```

## Uso

Siempre que quieras trackear una promesa, simplemente usa el componente como wrapper tal como se muestra en el siguiente código:

```diff
+ import { trackPromise} from 'react-promise-tracker';
//...

+ trackPromise(
    fetchUsers(); // You function that returns a promise
+ );
```

Después sólo te hace falta crear el componente de spinner, usar el hook __ y
usar el flag de __ para saber si hay promesas bloqueantes en marcha o no:

```diff
import React, { Component } from 'react';
+ import { usePromiseTracker } from "react-promise-tracker";

export const LoadingSpinerComponent = (props) => {
+ const { promiseInProgress } = usePromiseTracker();

  return (
    <div>
    {
+      (promiseInProgress === true) ?
        <h3>Hey I'm a spinner loader wannabe !!!</h3>
      :
        null
    }
  </div>
  )
};
```

- Para añadir un component spinner que un aspecto más profesional,  puedes hacer uso de _react-spinners_:

  - [Demo page](http://www.davidhu.io/react-spinners/)
  - [Github page](https://github.com/davidhu2000/react-spinners)

- Luego en el punto de entrada de tu aplicación (main / app / ...) solo tienes
que añadir el componente de spinner para que se renderice cuando toque:

```diff
import React from 'react';
+ import { LoadingSpinnerComponent} from './loadingSpinner';

export const AppComponent = (props) => (
  <div>
    <h1>Hello App!</h1>
+   <LoadingSpinnerComponent />
  </div>
);
```

## Ejemplo con áreas

Hay veces en las que tener un sólo spinner para toda la aplicación no te vale, en ciertos escenarios puede querer hacer tracking por separado de varias zonas
de tu interfaz de usuario, para ello puedes hacer uso de las areas de esta
librería (por ejemplo, en una aplicación de lista de productos con una sección de carrito de la compra, igual quieres bloquear la lista de la compra pero no el
carrito).

Vamos a definir dos areas, una para el carrito de la compra y otra para la lista de productos:

![Shopping cart sample](./resources/00-shopping-cart-sample.png)

Podemos añadir el área `default-area` para mostrar el spinner de la lista de productos:

```diff
import React from 'react';
+ import { LoadingSpinnerComponent} from './loadingSpinner';

export const ProductListComponent = (props) => (
  <div>
    ...
+   <LoadingSpinnerComponent /> // default-area
  </div>
);
```

Si añadimos el área, `shopping-cart-area` mostraremos el spinner del carro de compra:

```diff
import React from 'react';
+ import { LoadingSpinnerComponent} from './loadingSpinner';

export const ShoppingCartModal = (props) => (
  <div>
+   <LoadingSpinnerComponent area="shopping-cart-area" />
  </div>
);
```

Con este enfoque, no necesitamos definir diferentes componentes spinners, con uno solo podemos renderizarlo cuando queramos rastrear promises en una determinada área:

```diff
+ import { trackPromise} from 'react-promise-tracker';
...
+ trackPromise(
    fetchSelectedProducts();
+ ,'shopping-cart-area');
```

## Demos

Si quieres verlo en acción puedes visitar:

- [Ejemplo del área por defecto](https://stackblitz.com/edit/react-promise-tracker-default-area-sample)

- [Ejemplo de dos áreas](https://stackblitz.com/edit/react-promise-tracker-two-areas-sample)

## Sobre Lemoncode

Somos un equipo de una larga experiencia como desarrolladores freelance, establecidos como grupo en 2010.
Estamos especializados en tecnologías Front End y .NET. [Click aquí](http://lemoncode.net/services/en/#en-home) para más info sobre nosotros.

Para la audiencia LATAM/Español estamos desarrollando un máster Front End Online, más info: [http://lemoncode.net/master-frontend](http://lemoncode.net/master-frontend)
