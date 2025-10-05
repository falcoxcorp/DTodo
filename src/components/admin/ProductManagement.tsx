import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, CreditCard as Edit, Trash2, X, Save, Upload, Image as ImageIcon } from 'lucide-react';
import { provinces } from '../../data/provinces';

interface Product {
  id: string;
  name: string;
  model: string;
  brand: string;
  image_url: string;
  category_id: string;
  description: string;
  is_active: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface ProvincePricing {
  province_id: string;
  price: number;
  enabled: boolean;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    model: '',
    brand: '',
    image_url: '',
    category_id: '',
    description: '',
    is_active: true,
  });

  const [provincePricing, setProvincePricing] = useState<ProvincePricing[]>(
    provinces.map((province) => ({
      province_id: province.id,
      price: 0,
      enabled: false,
    }))
  );

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      return formData.image_url;
    }

    setUploadingImage(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        console.log('Upload error, using image URL instead:', uploadError);
        return formData.image_url || imagePreview;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return formData.image_url || imagePreview;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage();

      const productData = {
        ...formData,
        image_url: imageUrl,
      };

      let productId: string;

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        productId = editingProduct.id;
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single();

        if (error) throw error;
        productId = data.id;
      }

      await saveRegionalPricing(productId);

      resetForm();
      loadProducts();
      alert('Producto guardado exitosamente');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error al guardar el producto');
    }
  };

  const saveRegionalPricing = async (productId: string) => {
    const enabledPricing = provincePricing.filter((p) => p.enabled && p.price > 0);

    if (enabledPricing.length === 0) return;

    try {
      const { data: regions } = await supabase
        .from('regions')
        .select('id, code')
        .in('code', enabledPricing.map((p) => p.province_id));

      if (!regions) return;

      await supabase
        .from('regional_pricing')
        .delete()
        .eq('product_id', productId);

      const pricingData = enabledPricing.map((pricing) => {
        const region = regions.find((r) => r.code === pricing.province_id);
        return {
          product_id: productId,
          region_id: region?.id,
          price: pricing.price,
          currency: 'USD',
          is_available: true,
        };
      }).filter((p) => p.region_id);

      if (pricingData.length > 0) {
        const { error } = await supabase
          .from('regional_pricing')
          .insert(pricingData);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error saving regional pricing:', error);
    }
  };

  const loadRegionalPricing = async (productId: string) => {
    try {
      const { data, error } = await supabase
        .from('regional_pricing')
        .select(`
          price,
          regions (code)
        `)
        .eq('product_id', productId);

      if (error) throw error;

      const newPricing = provinces.map((province) => {
        const pricing = data?.find((p: any) => p.regions?.code === province.id);
        return {
          province_id: province.id,
          price: pricing?.price || 0,
          enabled: !!pricing,
        };
      });

      setProvincePricing(newPricing);
    } catch (error) {
      console.error('Error loading regional pricing:', error);
    }
  };

  const handleEdit = async (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      model: product.model,
      brand: product.brand,
      image_url: product.image_url,
      category_id: product.category_id || '',
      description: product.description || '',
      is_active: product.is_active,
    });
    setImagePreview(product.image_url);
    await loadRegionalPricing(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar el producto');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      model: '',
      brand: '',
      image_url: '',
      category_id: '',
      description: '',
      is_active: true,
    });
    setProvincePricing(
      provinces.map((province) => ({
        province_id: province.id,
        price: 0,
        enabled: false,
      }))
    );
    setImageFile(null);
    setImagePreview('');
    setEditingProduct(null);
    setShowForm(false);
  };

  const toggleProvinceEnabled = (provinceId: string) => {
    setProvincePricing((prev) =>
      prev.map((p) =>
        p.province_id === provinceId ? { ...p, enabled: !p.enabled } : p
      )
    );
  };

  const updateProvincePrice = (provinceId: string, price: number) => {
    setProvincePricing((prev) =>
      prev.map((p) =>
        p.province_id === provinceId ? { ...p, price } : p
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Productos</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Agregar Producto
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full my-8">
              <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imagen del Producto
                    </label>
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload" className="cursor-pointer block">
                            {imagePreview ? (
                              <div className="flex items-center justify-center min-h-[200px] max-h-[300px]">
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="max-w-full max-h-[300px] object-contain rounded-lg"
                                />
                              </div>
                            ) : (
                              <div className="py-8">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">
                                  Click para subir imagen o arrastra aquí
                                </p>
                              </div>
                            )}
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          O ingresa URL de imagen directamente abajo
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL de Imagen (alternativo)
                    </label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => {
                        setFormData({ ...formData, image_url: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del Producto *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría *
                    </label>
                    <select
                      required
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marca *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Modelo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Describe las características y especificaciones del producto..."
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Disponibilidad y Precios por Provincia
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Selecciona las provincias donde estará disponible el producto y asigna el precio para cada una
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                    {provinces.map((province) => {
                      const pricing = provincePricing.find((p) => p.province_id === province.id);
                      return (
                        <div
                          key={province.id}
                          className={`p-3 border-2 rounded-lg transition-all ${
                            pricing?.enabled
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id={`province-${province.id}`}
                              checked={pricing?.enabled || false}
                              onChange={() => toggleProvinceEnabled(province.id)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                            />
                            <label
                              htmlFor={`province-${province.id}`}
                              className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                            >
                              {province.name}
                            </label>
                          </div>
                          {pricing?.enabled && (
                            <div className="mt-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">$</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={pricing.price || ''}
                                  onChange={(e) =>
                                    updateProvincePrice(province.id, parseFloat(e.target.value) || 0)
                                  }
                                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                  placeholder="0.00"
                                />
                                <span className="text-sm text-gray-600">USD</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center border-t pt-4">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                  />
                  <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                    Producto activo (visible en la tienda)
                  </label>
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                  >
                    <Save className="w-5 h-5" />
                    {uploadingImage ? 'Subiendo imagen...' : editingProduct ? 'Actualizar Producto' : 'Guardar Producto'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Imagen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marca/Modelo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500 line-clamp-2">{product.description}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{product.brand}</div>
                  <div className="text-sm text-gray-500">{product.model}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No hay productos registrados</p>
            <p className="text-sm text-gray-400 mt-1">Haz clic en "Agregar Producto" para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
}
