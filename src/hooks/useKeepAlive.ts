import { useEffect, useRef } from 'react';

/**
 * Custom hook to keep the server alive by pinging it every 15 minutes
 * This prevents Render.com from putting the service to sleep due to inactivity
 */
export const useKeepAlive = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const pingServer = async () => {
      try {
        // Ping the current domain with a simple HEAD request
        await fetch(window.location.origin, {
          method: 'HEAD',
          cache: 'no-cache',
        });
        console.log('Keep-alive ping sent successfully');
      } catch (error) {
        console.warn('Keep-alive ping failed:', error);
      }
    };

    // Start pinging immediately, then every 15 minutes (900,000 ms)
    pingServer();
    intervalRef.current = setInterval(pingServer, 15 * 60 * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
};