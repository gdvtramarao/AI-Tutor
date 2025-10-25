import React, { useState, useRef, useCallback, useEffect } from 'react';

interface ResizablePanelsProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

const ResizablePanels: React.FC<ResizablePanelsProps> = ({ leftPanel, rightPanel }) => {
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [topPanelHeight, setTopPanelHeight] = useState(50);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeState = useRef<{
    isResizing: boolean;
    direction: 'horizontal' | 'vertical' | null;
  }>({ isResizing: false, direction: null });

  const handleResizeStart = useCallback((
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    direction: 'horizontal' | 'vertical'
  ) => {
    resizeState.current = { isResizing: true, direction };
    document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
    
    if ('touches' in e && e.cancelable) {
        e.preventDefault();
    }
  }, []);

  useEffect(() => {
    const handleResizeMove = (e: MouseEvent | TouchEvent) => {
      if (!resizeState.current.isResizing || !containerRef.current) {
        return;
      }

      if ('touches' in e && e.cancelable) {
        e.preventDefault();
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const minWidthPx = 400;
      const minHeightPx = 250;

      if (resizeState.current.direction === 'horizontal') {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const newWidthPx = clientX - containerRect.left;

        if (newWidthPx >= minWidthPx && newWidthPx <= containerRect.width - minWidthPx) {
          setLeftPanelWidth((newWidthPx / containerRect.width) * 100);
        }
      } else if (resizeState.current.direction === 'vertical') {
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const newHeightPx = clientY - containerRect.top;
        if (newHeightPx >= minHeightPx && newHeightPx <= containerRect.height - minHeightPx) {
          setTopPanelHeight((newHeightPx / containerRect.height) * 100);
        }
      }
    };

    const handleResizeEnd = () => {
      if (!resizeState.current.isResizing) return;
      
      resizeState.current = { isResizing: false, direction: null };
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('touchmove', handleResizeMove, { passive: false });
    window.addEventListener('mouseup', handleResizeEnd);
    window.addEventListener('touchend', handleResizeEnd);
    window.addEventListener('mouseleave', handleResizeEnd);

    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('touchmove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
      window.removeEventListener('touchend', handleResizeEnd);
      window.removeEventListener('mouseleave', handleResizeEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col lg:flex-row flex-grow h-full min-h-0">
      {/* Mobile view - resizable and stacked */}
      <div className="lg:hidden flex flex-col w-full h-full min-h-0">
        <div className="w-full flex flex-col min-h-0 flex-shrink-0" style={{ height: `${topPanelHeight}%`, minHeight: '250px' }}>
          {leftPanel}
        </div>
        <div 
          className="h-4 -my-1 cursor-row-resize flex items-center justify-center group flex-shrink-0"
          onMouseDown={(e) => handleResizeStart(e, 'vertical')}
          onTouchStart={(e) => handleResizeStart(e, 'vertical')}
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize panels"
        >
          <div className="h-1 w-12 bg-light-border dark:bg-dark-border group-hover:bg-cyan-500 transition-colors duration-200 rounded-full"></div>
        </div>
        <div className="w-full flex flex-col min-h-0 flex-grow" style={{ minHeight: '250px' }}>
          {rightPanel}
        </div>
      </div>
      
      {/* Desktop view - resizable and side-by-side */}
      <div className="hidden lg:flex w-full h-full min-h-0">
        <div className="h-full flex flex-col flex-shrink-0" style={{ width: `${leftPanelWidth}%`, minWidth: '400px' }}>
          {leftPanel}
        </div>
        <div 
          className="w-4 -mx-1 cursor-col-resize flex items-center justify-center group flex-shrink-0"
          onMouseDown={(e) => handleResizeStart(e, 'horizontal')}
          onTouchStart={(e) => handleResizeStart(e, 'horizontal')}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panels"
        >
          <div className="w-1 h-12 bg-light-border dark:bg-dark-border group-hover:bg-cyan-500 transition-colors duration-200 rounded-full"></div>
        </div>
        <div className="h-full flex flex-col flex-grow min-w-0" style={{ minWidth: '400px' }}>
          {rightPanel}
        </div>
      </div>
    </div>
  );
};

export default ResizablePanels;
