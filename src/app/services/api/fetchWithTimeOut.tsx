export const fetchWithTimeout = async (url:any, options = {}, timeoutDelay = 20000) => {
    try {
      const response = await Promise.race([
        fetch(url, options),
        timeout(timeoutDelay)  
      ]);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const timeout = (delay:any) => {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Requête échouée par timeout")), delay)
    );
  };