import { useEffect, useRef } from 'react';

/**
 * Custom hook to keep both the frontend and backend servers alive
 * This prevents Render.com from putting services to sleep due to inactivity
 */
export const useKeepAlive = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const pingServers = async () => {
      try {
        // Ping the frontend
        await fetch(window.location.origin, {
          method: 'HEAD',
          cache: 'no-cache',
        });
        console.log('Frontend keep-alive ping sent');

        // Ping the backend
        await fetch('https://manimate-backend.onrender.com/', {
          method: 'HEAD',
          cache: 'no-cache',
        });
        console.log('Backend keep-alive ping sent');
      } catch (error) {
        console.warn('Keep-alive ping failed:', error);
      }
    };

    // Start pinging immediately, then every 10 minutes (600,000 ms)
    pingServers();
    intervalRef.current = setInterval(pingServers, 10 * 60 * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
};