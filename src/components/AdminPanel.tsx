import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Package, Grid3x3, Warehouse, ShoppingCart, ArrowLeft } from 'lucide-react';
import ProductManagement from './admin/ProductManagement';
import CategoryManagement from './admin/CategoryManagement';
import InventoryManagement from './admin/InventoryManagement';
import OrderManagement from './admin/OrderManagement';

type AdminView = 'products' | 'categories' | 'inventory' | 'orders';

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const { isAdmin } = useAuth();
  const [currentView, setCurrentView] = useState<AdminView>('products');

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h2>
          <p className="text-gray-600">No tienes permisos de administrador</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-gray-600 mt-1">Gestiona productos, categorías e inventario</p>
              </div>
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver a la Tienda
              </button>
            </div>

            <div className="flex gap-4 border-b border-gray-200">
              <button
                onClick={() => setCurrentView('products')}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 ${
                  currentView === 'products'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Package className="w-5 h-5" />
                Productos
              </button>

              <button
                onClick={() => setCurrentView('categories')}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 ${
                  currentView === 'categories'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
                Categorías
              </button>

              <button
                onClick={() => setCurrentView('inventory')}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 ${
                  currentView === 'inventory'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Warehouse className="w-5 h-5" />
                Inventario
              </button>

              <button
                onClick={() => setCurrentView('orders')}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 ${
                  currentView === 'orders'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Pedidos
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'products' && <ProductManagement />}
        {currentView === 'categories' && <CategoryManagement />}
        {currentView === 'inventory' && <InventoryManagement />}
        {currentView === 'orders' && <OrderManagement />}
      </div>
    </div>
  );
}
