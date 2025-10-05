import { useEffect } from 'react';
import { envConfig } from '../config/env';

const SSLRedirect: React.FC = () => {
  useEffect(() => {
    // Solo redirigir en producción y si SSL está habilitado
    if (envConfig.environment === 'production' && envConfig.sslRedirect && envConfig.enableHttps) {
      // Verificar si estamos en HTTP en producción
      if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
        const httpsUrl = window.location.href.replace('http:', 'https:');
        console.log('🔒 Redirigiendo a HTTPS:', httpsUrl);
        window.location.replace(httpsUrl);
      }
    }
  }, []);

  return null; // Este componente no renderiza nada
};

export default SSLRedirect;