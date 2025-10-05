import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save, X, CreditCard as Edit2, Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { profileService, addressService, orderService } from '../services/database';
import { useLocation } from '../contexts/LocationContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const { provinces } = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [editedProfile, setEditedProfile] = useState({
    full_name: '',
    phone: '',
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    province_id: '',
    province_name: '',
    municipality_id: '',
    municipality_name: '',
    street_address: '',
    postal_code: '',
    reference_point: '',
    is_default: false,
  });

  useEffect(() => {
    if (user) {
      loadProfile();
      loadAddresses();
      loadOrders();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const data = await profileService.get(user!.id);
      setProfile(data);
      setEditedProfile({
        full_name: data?.full_name || user?.user_metadata?.full_name || '',
        phone: data?.phone || '',
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAddresses = async () => {
    try {
      const data = await addressService.getAll(user!.id);
      setAddresses(data || []);
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const data = await orderService.getAll(user!.id);
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await profileService.update(user.id, editedProfile);
      setProfile({ ...profile, ...editedProfile });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error al actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleAddAddress = async () => {
    if (!user) return;
    if (!newAddress.province_id || !newAddress.municipality_id || !newAddress.street_address) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setSaving(true);
    try {
      const selectedProvince = provinces.find(p => p.id === newAddress.province_id);
      const selectedMunicipality = selectedProvince?.municipalities.find(
        m => m.id === newAddress.municipality_id
      );

      await addressService.create(user.id, {
        ...newAddress,
        province_name: selectedProvince?.name || '',
        municipality_name: selectedMunicipality?.name || '',
      });

      await loadAddresses();
      setShowAddressForm(false);
      setNewAddress({
        province_id: '',
        province_name: '',
        municipality_id: '',
        municipality_name: '',
        street_address: '',
        postal_code: '',
        reference_point: '',
        is_default: false,
      });
    } catch (error) {
      console.error('Error adding address:', error);
      alert('Error al agregar dirección');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!window.confirm('¿Estás seguro de eliminar esta dirección?')) return;

    try {
      await addressService.delete(addressId);
      await loadAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Error al eliminar dirección');
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    if (!user) return;
    try {
      await addressService.setDefault(user.id, addressId);
      await loadAddresses();
    } catch (error) {
      console.error('Error setting default address:', error);
      alert('Error al establecer dirección predeterminada');
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <User className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Inicia sesión para ver tu perfil
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Necesitas iniciar sesión para acceder a tu información personal.
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
          <p className="mt-4 text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  const selectedProvince = provinces.find(p => p.id === newAddress.province_id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'confirmed':
      case 'processing':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      processing: 'Procesando',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <User className="w-8 h-8 text-blue-600" />
              Mi Perfil
            </h1>
            <p className="text-gray-600 mt-2">
              Gestiona tu información personal y direcciones
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                onClick={() => {
                  setEditedProfile({
                    full_name: profile?.full_name || '',
                    phone: profile?.phone || '',
                  });
                  setIsEditing(false);
                }}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.full_name}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, full_name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.full_name || 'No especificado'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <p className="text-gray-900">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+53 5555 5555"
                  />
                ) : (
                  <p className="text-gray-900">{profile?.phone || 'No especificado'}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Direcciones de Entrega</h2>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                {showAddressForm ? 'Cancelar' : '+ Agregar Dirección'}
              </button>
            </div>

            {showAddressForm && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="font-medium mb-4">Nueva Dirección</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Provincia *
                    </label>
                    <select
                      value={newAddress.province_id}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, province_id: e.target.value, municipality_id: '' })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecciona provincia</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Municipio *
                    </label>
                    <select
                      value={newAddress.municipality_id}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, municipality_id: e.target.value })
                      }
                      disabled={!newAddress.province_id}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">Selecciona municipio</option>
                      {selectedProvince?.municipalities.map((municipality) => (
                        <option key={municipality.id} value={municipality.id}>
                          {municipality.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      value={newAddress.street_address}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, street_address: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Calle 23 #456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      value={newAddress.postal_code}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, postal_code: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Punto de Referencia
                    </label>
                    <input
                      type="text"
                      value={newAddress.reference_point}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, reference_point: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Cerca del parque..."
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddAddress}
                  disabled={saving}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : 'Guardar Dirección'}
                </button>
              </div>
            )}

            <div className="space-y-3">
              {addresses.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No tienes direcciones guardadas
                </p>
              ) : (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 border rounded-lg ${
                      address.is_default ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {address.is_default && (
                          <span className="inline-block px-2 py-1 text-xs bg-blue-600 text-white rounded mb-2">
                            Predeterminada
                          </span>
                        )}
                        <p className="font-medium text-gray-900">{address.street_address}</p>
                        <p className="text-sm text-gray-600">
                          {address.municipality_name}, {address.province_name}
                        </p>
                        {address.postal_code && (
                          <p className="text-sm text-gray-600">CP: {address.postal_code}</p>
                        )}
                        {address.reference_point && (
                          <p className="text-sm text-gray-500 mt-1">{address.reference_point}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!address.is_default && (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Predeterminada
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Historial de Compras</h2>
            </div>

            {loadingOrders ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Cargando historial...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No tienes compras realizadas</p>
                <p className="text-gray-400 text-sm mt-2">
                  Cuando realices tu primera compra, aparecerá aquí
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(order.status)}
                          <span className="font-semibold text-gray-900">
                            Orden #{order.order_number}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : order.status === 'shipped'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Fecha: {formatDate(order.created_at)}
                        </p>
                        {order.shipping_province && (
                          <p className="text-sm text-gray-600">
                            Destino: {order.shipping_municipality}, {order.shipping_province}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${order.total}
                        </p>
                        <p className="text-xs text-gray-500">{order.currency}</p>
                      </div>
                    </div>

                    {order.order_items && order.order_items.length > 0 && (
                      <div className="border-t border-gray-100 pt-3 mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Productos ({order.order_items.length}):
                        </p>
                        <div className="space-y-2">
                          {order.order_items.map((item: any) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 text-sm"
                            >
                              {item.product_image && (
                                <img
                                  src={item.product_image}
                                  alt={item.product_name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              )}
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                  {item.product_name || item.products?.name}
                                </p>
                                <p className="text-gray-600">
                                  {item.product_brand || item.products?.brand}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-gray-900">
                                  {item.quantity} x ${item.unit_price}
                                </p>
                                <p className="font-semibold text-gray-900">
                                  ${item.total_price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {order.payment_status && (
                      <div className="border-t border-gray-100 pt-3 mt-3">
                        <p className="text-sm text-gray-600">
                          Estado de pago:{' '}
                          <span
                            className={`font-medium ${
                              order.payment_status === 'completed'
                                ? 'text-green-600'
                                : order.payment_status === 'failed'
                                ? 'text-red-600'
                                : 'text-yellow-600'
                            }`}
                          >
                            {order.payment_status === 'completed'
                              ? 'Completado'
                              : order.payment_status === 'failed'
                              ? 'Fallido'
                              : order.payment_status === 'refunded'
                              ? 'Reembolsado'
                              : 'Pendiente'}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
