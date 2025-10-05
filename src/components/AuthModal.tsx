import { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { signIn, signUp, resetPassword } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'reset') {
        const { error } = await resetPassword(email);
        if (error) {
          setError(error.message);
        } else {
          setResetSent(true);
        }
      } else if (mode === 'signup') {
        if (!fullName.trim()) {
          setError('Por favor ingrese su nombre completo');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) {
          setError(error.message);
        } else {
          onClose();
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError('Correo o contraseña incorrectos');
        } else {
          onClose();
        }
      }
    } catch (err) {
      setError('Ocurrió un error. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
    setResetSent(false);
    setMode('signin');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {mode === 'signin' && 'Iniciar Sesión'}
          {mode === 'signup' && 'Crear Cuenta'}
          {mode === 'reset' && 'Recuperar Contraseña'}
        </h2>

        {resetSent ? (
          <div className="text-center py-4">
            <p className="text-green-600 mb-4">
              Se ha enviado un correo con instrucciones para restablecer tu contraseña.
            </p>
            <button
              onClick={() => {
                setResetSent(false);
                setMode('signin');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Volver a iniciar sesión
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Juan Pérez"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Procesando...' : mode === 'signin' ? 'Iniciar Sesión' : mode === 'signup' ? 'Crear Cuenta' : 'Enviar Correo'}
            </button>

            <div className="text-center space-y-2">
              {mode === 'signin' && (
                <>
                  <button
                    type="button"
                    onClick={() => setMode('reset')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                  <p className="text-sm text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Regístrate
                    </button>
                  </p>
                </>
              )}
              {mode === 'signup' && (
                <p className="text-sm text-gray-600">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Inicia Sesión
                  </button>
                </p>
              )}
              {mode === 'reset' && (
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Volver a iniciar sesión
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
