import React from 'react';

const useIsInViewport = (elRef: typeof React.useRef) => {
    const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false);
    
    const observer = React.useMemo(() => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)), []);

    // @ts-ignore
    // if (!elRef.current) return false;

    React.useEffect(() => {
        // @ts-ignore
        observer.observe(elRef.current);
        return () => {
            observer.disconnect()
        }
    }, [elRef, observer]);

    return isIntersecting;
}

export default useIsInViewport