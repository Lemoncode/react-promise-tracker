import React from "react";
import { PROGRESS_UPDATE } from "./constants";
import { emitter, getProgressCount} from "./trackPromise";
import { defaultConfig, setupConfig } from './setupConfig';


export const usePromiseTracker = (configuration = defaultConfig) => {
  // Included in state, it will be evaluated just the first time,
  // TODO: discuss if this is a good approach
  // We need to apply defensive programming, ensure group and delay default to secure data
  // cover cases like not all params informed, set secure defaults
  const [config] = React.useState(setupConfig(configuration));
  // TODO: Este config almacenado es innecesario. Se puede tomar de las props sanitizadas
  // que se hagan en cada render y se almacene en un objeto a pelo.

  // Edge case, when we start the application if we are loading just onComponentDidMount
  // data, event emitter could have already emitted the event but subscription is not yet
  // setup
  React.useEffect(() => {
    if(config && config.group && getProgressCount(config.group) > 0) {
      setInternalPromiseInProgress(true);
      setPromiseInProgress(true);
    }
  }, config)
  // TODO: La dependencia "config" esta mal, debe ser un array. Funciona de chiripa,
  // pq realmente no estamos cambiando la configuracion desde fuera.
  // TODO: Este useEffect llama a 2 funciones que estan definidas más tarde:
  // setInternalPromiseInProgress y setPromiseInProgress. Funciona pq el useEffect se
  // ejecuta al final del render, y le ha dado tiempo a crearse esos metodos. Pero es
  // peligroso, de hecho en TS esto cantaría pq no encontraría esas referencias.
  // TODO: Y para colmo, setear a true la promesa consultando el getProgressCount es un error
  // ¿Que pasa si la promesa ya está empezada? Pues que pondríamos el promiseInProgress a true
  // incluso si tenemos un delay. No respetará el delay, lo pondrá a true si o si.

  // Internal will hold the current value
  const [
    internalPromiseInProgress,
    setInternalPromiseInProgress
  ] = React.useState(false);
  // TODO: Este estado se esta almacenado pero no sirve para nada, porque
  // el internalPromiseInProgress solo se utiliza en 2 sitios, para inicializar el ref
  // y en un useEffect que solo sucede 1 vez al principio. Por tanto, aunque
  // llamemos al setInteralPromiseInProgress para mantener ese estado actualiado,
  // nadie hace uso de el tras el primer render ... ¿para que lo queremos entonces?


  // Promise in progress is 'public', it can be affected by the _delay_ parameter
  // it may not show the current state
  const [promiseInProgress, setPromiseInProgress] = React.useState(false);


  // We need to hold a ref to latestInternal, to check the real value on
  // callbacks (if not we would get always the same value)
  // more info: https://overreacted.io/a-complete-guide-to-useeffect/
  const latestInternalPromiseInProgress = React.useRef(
    internalPromiseInProgress
  );

  const notifiyPromiseInProgress = () => {
    (!config || !config.delay || config.delay === 0) ?
      setPromiseInProgress(true)
    :
      setTimeout(() => {
        // Check here ref to internalPromiseInProgress
        if (latestInternalPromiseInProgress.aux) {
          setPromiseInProgress(true);
        }
      }, config.delay);
  };
  // TODO: ese setTimeout tiene que ser cancelable sino al desmontar el componente
  // antes de resolver el timeout petaría.

  const updatePromiseTrackerStatus = (anyPromiseInProgress, groupAffected) => {
    if (config.group === groupAffected) {
      setInternalPromiseInProgress(anyPromiseInProgress);
      // Update the ref object as well, we will check it when we need to
      // cover the _delay_ case (setTimeout)
      latestInternalPromiseInProgress.aux = anyPromiseInProgress;
      if (!anyPromiseInProgress) {
        setPromiseInProgress(false);
      } else {
        notifiyPromiseInProgress();
      }
    }
  };

  React.useEffect(() => {
    latestInternalPromiseInProgress.aux = internalPromiseInProgress;
    emitter.on(PROGRESS_UPDATE,
      (anyPromiseInProgress, groupAffected) => {
        updatePromiseTrackerStatus(anyPromiseInProgress, groupAffected);
      }
    );

    return () => {
      emitter.off(PROGRESS_UPDATE);
    };
  }, []);

  return { promiseInProgress };
};
