import React, { useEffect, useRef } from "react";
interface Props {
  children: React.ReactElement;
  onContentEndVisible: () => void;
}
interface Options {
  rootMargin: string;
  threshold: number;
  root: null;
}

export function Observer({ children, onContentEndVisible }: Props) {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: Options = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
