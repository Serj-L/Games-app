import { FC, useState, useEffect } from 'react';
import ReactDom from 'react-dom';

interface PortalProps {}

const Portal: FC<PortalProps> = ({ children }) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDom.createPortal(children, container);
};

export default Portal;
