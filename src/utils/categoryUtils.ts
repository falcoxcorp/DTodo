import { products } from '../data/products';
import { categories } from '../data/categories';
import { Category, Product } from '../types';

// Función para calcular conteos reales de productos por categoría
export const calculateRealCategoryCounts = (allProducts?: Product[]): Category[] => {
  const productsToCount = allProducts || products;

  return categories.map(category => {
    // Contar productos reales en esta categoría
    const categoryProducts = productsToCount.filter(product => product.category === category.id);
    const realCount = categoryProducts.length;

    // Calcular conteos reales para subcategorías
    const updatedSubcategories = category.subcategories.map(subcategory => {
      const subcategoryProducts = categoryProducts.filter(product => product.subcategory === subcategory.id);
      return {
        ...subcategory,
        count: subcategoryProducts.length
      };
    });

    return {
      ...category,
      count: realCount,
      subcategories: updatedSubcategories
    };
  });
};

// Función para obtener productos por categoría
export const getProductsByCategory = (categoryId: string) => {
  if (categoryId === 'all') {
    return products;
  }
  return products.filter(product => product.category === categoryId);
};

// Función para obtener productos por subcategoría
export const getProductsBySubcategory = (categoryId: string, subcategoryId: string) => {
  const categoryProducts = getProductsByCategory(categoryId);
  if (subcategoryId === 'all') {
    return categoryProducts;
  }
  return categoryProducts.filter(product => product.subcategory === subcategoryId);
};