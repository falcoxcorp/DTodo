import React, { useState } from 'react';
import { Settings, Bell, Shield, Globe, Moon, Sun, Smartphone, Mail, MapPin } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    offers: true
  });

  const [preferences, setPreferences] = useState({
    language: 'es',
    currency: 'USD',
    theme: 'light',
    autoLocation: true
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-600" />
            Configuración
          </h1>
          <p className="text-gray-600 mt-2">
            Personaliza tu experiencia de compra y gestiona tus preferencias
          </p>
        </div>

        <div className="space-y-8">
          {/* Notifications Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Notificaciones</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Notificaciones por email</h3>
                  <p className="text-sm text-gray-600">Recibe actualizaciones de pedidos y ofertas por correo</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => handleNotificationChange('email', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Notificaciones push</h3>
                  <p className="text-sm text-gray-600">Recibe notificaciones en tu navegador</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => handleNotificationChange('push', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">SMS</h3>
                  <p className="text-sm text-gray-600">Recibe actualizaciones importantes por mensaje de texto</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Ofertas y promociones</h3>
                  <p className="text-sm text-gray-600">Recibe información sobre descuentos y ofertas especiales</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.offers}
                    onChange={(e) => handleNotificationChange('offers', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Preferencias</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idioma
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moneda preferida
                </label>
                <select
                  value={preferences.currency}
                  onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="USD">USD - Dólar Americano</option>
                  <option value="CUP">CUP - Peso Cubano</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tema de la aplicación
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => handlePreferenceChange('theme', 'light')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      preferences.theme === 'light'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    Claro
                  </button>
                  <button
                    onClick={() => handlePreferenceChange('theme', 'dark')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      preferences.theme === 'dark'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    Oscuro
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Detección automática de ubicación</h3>
                    <p className="text-sm text-gray-600">Detectar automáticamente tu provincia y municipio</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.autoLocation}
                      onChange={(e) => handlePreferenceChange('autoLocation', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Security Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Privacidad y Seguridad</h2>
            </div>

            <div className="space-y-4">
              <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">Cambiar contraseña</h3>
                <p className="text-sm text-gray-600">Actualiza tu contraseña para mantener tu cuenta segura</p>
              </button>

              <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">Autenticación de dos factores</h3>
                <p className="text-sm text-gray-600">Agrega una capa extra de seguridad a tu cuenta</p>
              </button>

              <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">Descargar mis datos</h3>
                <p className="text-sm text-gray-600">Obtén una copia de toda tu información personal</p>
              </button>

              <button className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                <h3 className="font-medium mb-1">Eliminar cuenta</h3>
                <p className="text-sm text-red-500">Elimina permanentemente tu cuenta y todos tus datos</p>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;