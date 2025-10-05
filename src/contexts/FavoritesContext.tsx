import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { useAuth } from './AuthContext';
import { favoriteService } from '../services/database';

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => Promise<void>;
  removeFromFavorites: (productId: number) => Promise<void>;
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => Promise<void>;
  favoritesCount: number;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      loadLocalFavorites();
    }
  }, [user]);

  const loadFavorites = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await favoriteService.getAll(user.id);
      const productsList = data.map((fav: any) => ({
        id: fav.products.id,
        name: fav.products.name,
        price: fav.products.base_price,
        image: fav.products.image_url,
        category: fav.products.category_id,
        subcategory: fav.products.subcategory_id,
        brand: fav.products.brand,
        description: fav.products.description,
        rating: 4.5,
        reviews: 0,
        inStock: true,
        isNew: false,
        specifications: {}
      }));
      setFavorites(productsList);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLocalFavorites = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dtodo-favorites');
      if (saved) {
        try {
          setFavorites(JSON.parse(saved));
        } catch (error) {
          console.error('Error parsing favorites from localStorage:', error);
          setFavorites([]);
        }
      }
    }
  };

  const saveLocalFavorites = (newFavorites: Product[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dtodo-favorites', JSON.stringify(newFavorites));
    }
  };

  const addToFavorites = async (product: Product) => {
    if (user) {
      try {
        await favoriteService.add(user.id, String(product.id));
        setFavorites(prev => {
          const isAlreadyFavorite = prev.some(fav => fav.id === product.id);
          if (isAlreadyFavorite) return prev;
          return [...prev, product];
        });
      } catch (error) {
        console.error('Error adding to favorites:', error);
      }
    } else {
      setFavorites(prev => {
        const isAlreadyFavorite = prev.some(fav => fav.id === product.id);
        if (isAlreadyFavorite) return prev;
        const newFavorites = [...prev, product];
        saveLocalFavorites(newFavorites);
        return newFavorites;
      });
    }
  };

  const removeFromFavorites = async (productId: number) => {
    if (user) {
      try {
        await favoriteService.remove(user.id, String(productId));
        setFavorites(prev => prev.filter(fav => fav.id !== productId));
      } catch (error) {
        console.error('Error removing from favorites:', error);
      }
    } else {
      setFavorites(prev => {
        const newFavorites = prev.filter(fav => fav.id !== productId);
        saveLocalFavorites(newFavorites);
        return newFavorites;
      });
    }
  };

  const isFavorite = (productId: number) => {
    return favorites.some(fav => fav.id === productId);
  };

  const toggleFavorite = async (product: Product) => {
    if (isFavorite(product.id)) {
      await removeFromFavorites(product.id);
    } else {
      await addToFavorites(product);
    }
  };

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        favoritesCount,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
