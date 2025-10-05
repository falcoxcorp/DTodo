import { supabase } from '../lib/supabase';
import { categories } from '../data/categories';
import { products } from '../data/products';

export async function seedCategories() {
  console.log('Seeding categories...');

  const categoriesToInsert = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon,
    parent_id: null,
    display_order: 0
  }));

  const { error } = await supabase
    .from('categories')
    .upsert(categoriesToInsert, { onConflict: 'id' });

  if (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }

  console.log(`✓ Seeded ${categoriesToInsert.length} categories`);
}

export async function seedProducts() {
  console.log('Seeding products...');

  const productsToInsert = products.map(product => ({
    category_id: product.category,
    subcategory_id: product.category,
    name: product.name,
    description: product.description,
    brand: product.brand,
    base_price: product.price,
    currency: 'USD',
    image_url: product.image,
    images: [],
    is_active: true
  }));

  const { data, error } = await supabase
    .from('products')
    .insert(productsToInsert)
    .select();

  if (error) {
    console.error('Error seeding products:', error);
    throw error;
  }

  console.log(`✓ Seeded ${productsToInsert.length} products`);
  return data;
}

export async function seedInventory() {
  console.log('Seeding inventory...');

  const { data: existingProducts } = await supabase
    .from('products')
    .select('id');

  if (!existingProducts) {
    console.log('No products found, skipping inventory seed');
    return;
  }

  const provinces = [
    'la-habana', 'pinar-del-rio', 'artemisa', 'mayabeque', 'matanzas',
    'villa-clara', 'cienfuegos', 'sancti-spiritus', 'ciego-de-avila',
    'camaguey', 'las-tunas', 'holguin', 'granma', 'santiago-de-cuba',
    'guantanamo', 'isla-de-la-juventud'
  ];

  const inventoryToInsert = existingProducts.flatMap(product =>
    provinces.map(provinceId => ({
      product_id: product.id,
      province_id: provinceId,
      municipality_id: 'all',
      quantity: Math.floor(Math.random() * 50) + 10,
      reserved_quantity: 0
    }))
  );

  const { error } = await supabase
    .from('inventory')
    .upsert(inventoryToInsert, {
      onConflict: 'product_id,province_id,municipality_id'
    });

  if (error) {
    console.error('Error seeding inventory:', error);
    throw error;
  }

  console.log(`✓ Seeded ${inventoryToInsert.length} inventory records`);
}

export async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    await seedCategories();
    const seededProducts = await seedProducts();
    if (seededProducts && seededProducts.length > 0) {
      await seedInventory();
    }
    console.log('✓ Database seeding completed successfully!');
  } catch (error) {
    console.error('Database seeding failed:', error);
    throw error;
  }
}
