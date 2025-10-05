import { useState } from 'react';
import { Database, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { seedDatabase } from '../scripts/seedDatabase';

export function DatabaseSeeder() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      await seedDatabase();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error al poblar la base de datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-xl p-4 max-w-sm border border-gray-200 z-50">
      <div className="flex items-center gap-3 mb-3">
        <Database className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Base de Datos</h3>
      </div>

      {success && (
        <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-800">
            Base de datos poblada exitosamente
          </p>
        </div>
      )}

      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <button
        onClick={handleSeed}
        disabled={loading || success}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Poblando...
          </>
        ) : success ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Completado
          </>
        ) : (
          <>
            <Database className="w-4 h-4" />
            Poblar Base de Datos
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 mt-2">
        Esto cargará todas las categorías y productos en Supabase
      </p>
    </div>
  );
}
