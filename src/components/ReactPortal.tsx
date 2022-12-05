import { useState, useLayoutEffect, FC, ReactNode, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

type IReactPortalProps = {
  children: ReactNode;
  wrapperId: string;
} & Pick<HTMLAttributes<HTMLDivElement>, 'className'>;

function createWrapperAndAppendToBody(wrapperId: string, className?: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  wrapperElement.setAttribute('class', className ?? '');
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

const ReactPortal: FC<IReactPortalProps> = ({ children, wrapperId, className }) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)!;
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId, className);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // wrapperElement state will be null on very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

export default ReactPortal;
