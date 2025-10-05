import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, X as XCircle, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { orderService } from '../services/database';

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const data = await orderService.getAll(user!.id);
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregado';
      case 'shipped':
        return 'En camino';
      case 'processing':
        return 'Procesando';
      case 'confirmed':
        return 'Confirmado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Pendiente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
      case 'confirmed':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Pagado';
      case 'pending':
        return 'Pendiente';
      case 'failed':
        return 'Fallido';
      case 'refunded':
        return 'Reembolsado';
      default:
        return 'Pendiente';
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Inicia sesión para ver tus pedidos
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Necesitas iniciar sesión para ver el historial de tus pedidos.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Package className="w-8 h-8 text-blue-600" />
          Mis Pedidos
        </h1>
        <p className="text-gray-600 mt-2">
          Consulta el estado y detalles de tus pedidos
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No tienes pedidos aún
          </h3>
          <p className="text-gray-600 mb-6">
            Cuando realices un pedido, aparecerá aquí
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Pedido</p>
                      <p className="font-semibold text-gray-900">{order.order_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fecha</p>
                      <p className="font-medium text-gray-900">
                        {new Date(order.created_at).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="font-medium">{getStatusText(order.status)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        {order.order_items?.length || 0} producto(s)
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${order.total.toFixed(2)} {order.currency}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Pago: {getPaymentStatusText(order.payment_status)}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Detalles
                    </button>
                  </div>

                  {order.addresses && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Dirección de entrega:</p>
                      <p className="text-sm text-gray-600">
                        {order.addresses.street_address}, {order.addresses.municipality_name},{' '}
                        {order.addresses.province_name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Detalles del Pedido
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Número de Pedido</p>
                    <p className="font-semibold">{selectedOrder.order_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fecha</p>
                    <p className="font-semibold">
                      {new Date(selectedOrder.created_at).toLocaleString('es-ES')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estado</p>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span className="font-medium">{getStatusText(selectedOrder.status)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estado de Pago</p>
                    <p className="font-semibold">
                      {getPaymentStatusText(selectedOrder.payment_status)}
                    </p>
                  </div>
                </div>

                {selectedOrder.addresses && (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-semibold mb-2">Dirección de Entrega</h3>
                    <p className="text-gray-700">{selectedOrder.addresses.street_address}</p>
                    <p className="text-gray-600">
                      {selectedOrder.addresses.municipality_name}, {selectedOrder.addresses.province_name}
                    </p>
                    {selectedOrder.addresses.postal_code && (
                      <p className="text-gray-600">CP: {selectedOrder.addresses.postal_code}</p>
                    )}
                    {selectedOrder.addresses.reference_point && (
                      <p className="text-gray-500 text-sm mt-1">
                        {selectedOrder.addresses.reference_point}
                      </p>
                    )}
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold mb-3">Productos</h3>
                  <div className="space-y-3">
                    {selectedOrder.order_items?.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        {item.product_snapshot?.image_url && (
                          <img
                            src={item.product_snapshot.image_url}
                            alt={item.product_snapshot.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {item.product_snapshot?.name || 'Producto'}
                          </p>
                          <p className="text-sm text-gray-600">
                            Cantidad: {item.quantity} × ${item.unit_price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-semibold text-blue-600">
                          ${item.total_price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>${selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    {selectedOrder.shipping_cost > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Envío:</span>
                        <span>${selectedOrder.shipping_cost.toFixed(2)}</span>
                      </div>
                    )}
                    {selectedOrder.tax > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Impuestos:</span>
                        <span>${selectedOrder.tax.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-blue-600">
                        ${selectedOrder.total.toFixed(2)} {selectedOrder.currency}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-semibold mb-2">Notas</h3>
                    <p className="text-gray-600">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
