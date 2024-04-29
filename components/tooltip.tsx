import { useEffect, useRef, ReactNode } from 'react';
import tippy, { Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

type TooltipProps = {
  content: string;
  children: ReactNode;
};

// استفاده از پکیج tippy.js
const Tooltip = ({ content, children }: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  let tooltipInstance: Instance | null = null;

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipInstance = tippy(tooltipRef.current, {
        content: content,
        arrow: true,
        placement: 'top',
      });
    }

    return () => {
      if (tooltipInstance) {
        tooltipInstance.destroy();
      }
    };
  }, [content]);

  return <div ref={tooltipRef}>{children}</div>;
};

export default Tooltip;
