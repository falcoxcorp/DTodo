import { supabase } from '../lib/supabase';
import { Product } from '../types';

export const productService = {
  async getAll(filters?: { category?: string; subcategory?: string; search?: string }) {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (filters?.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters?.subcategory) {
      query = query.eq('subcategory_id', filters.subcategory);
    }

    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async checkInventory(productId: string, provinceId: string, municipalityId?: string) {
    const { data, error } = await supabase
      .from('inventory')
      .select('quantity, reserved_quantity')
      .eq('product_id', productId)
      .eq('province_id', provinceId)
      .maybeSingle();

    if (error) throw error;
    return data ? data.quantity - data.reserved_quantity : 0;
  },
};

export const cartService = {
  async getOrCreateCart(userId: string) {
    const { data: existingCart } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (existingCart) return existingCart;

    const { data: newCart, error } = await supabase
      .from('carts')
      .insert({ user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return newCart;
  },

  async getItems(cartId: string) {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (*)
      `)
      .eq('cart_id', cartId);

    if (error) throw error;
    return data;
  },

  async addItem(cartId: string, productId: string, quantity: number, price: number) {
    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cartId)
      .eq('product_id', productId)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    const { data, error } = await supabase
      .from('cart_items')
      .insert({
        cart_id: cartId,
        product_id: productId,
        quantity,
        price_snapshot: price,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateItemQuantity(itemId: string, quantity: number) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeItem(itemId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
  },

  async clearCart(cartId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    if (error) throw error;
  },
};

export const favoriteService = {
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        id,
        created_at,
        products (*)
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  },

  async add(userId: string, productId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, product_id: productId })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async remove(userId: string, productId: string) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;
  },

  async isFavorite(userId: string, productId: string) {
    const { data } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .maybeSingle();

    return !!data;
  },
};

export const addressService = {
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId)
      .order('is_default', { ascending: false });

    if (error) throw error;
    return data;
  },

  async create(userId: string, address: any) {
    const { data, error } = await supabase
      .from('addresses')
      .insert({ ...address, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, address: any) {
    const { data, error } = await supabase
      .from('addresses')
      .update(address)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async setDefault(userId: string, addressId: string) {
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', userId);

    const { data, error } = await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', addressId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export const orderService = {
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        addresses (*),
        order_items (
          *,
          products (*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        addresses (*),
        order_items (
          *,
          products (*)
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  },

  async createPaymentIntent(amount: number, metadata: any = {}) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency: 'usd', metadata }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    return response.json();
  },

  async create(orderData: any) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-order`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return response.json();
  },
};

export const profileService = {
  async get(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async update(userId: string, profile: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
