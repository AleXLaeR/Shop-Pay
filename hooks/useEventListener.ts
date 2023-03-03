import { useEffect, useRef } from 'react';

type BindingElement = Element | typeof window;
type EventType = keyof ElementEventMap | keyof WindowEventMap;

export default function useEventListener<T extends Event>(
  eventType: EventType,
  cb: (event: T) => void,
  element: BindingElement = window,
) {
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  useEffect(() => {
    const handler = (e: Event) => cbRef.current(e as T);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [element, eventType]);
}
