# Bulk Insert Guide for Products

This guide provides multiple methods to add products to your database.

## Method 1: Using the Seed Endpoint (Easiest)

The `/products/seed` endpoint will populate your database with 24 sample products across 5 categories.

### Step 1: Call the Seed Endpoint

**Via Browser:**
```
https://foodzy-ecommerce-production.up.railway.app/products/seed
```

**Via curl:**
```bash
curl -X POST https://foodzy-ecommerce-production.up.railway.app/products/seed
```

**Response:**
```json
{
  "message": "Products seeded successfully"
}
```

### Step 2: Verify Products

```
https://foodzy-ecommerce-production.up.railway.app/products
```

You should see 24 products across these categories:
- **Vegetables**: 5 products
- **Fruits**: 5 products
- **Dairy**: 4 products
- **Bakery**: 4 products
- **Snacks**: 5 products

---

## Method 2: Direct SQL Insertion

Use this method to add custom products directly to the PostgreSQL database.

### Step 1: Access Railway PostgreSQL

1. Go to Railway Dashboard
2. Click on your PostgreSQL service
3. Click "Data" tab → "Query"

### Step 2: Run SQL Insert

```sql
INSERT INTO products (
  id,
  name,
  description,
  price,
  "imageUrl",
  category,
  "isAvailable",
  rating,
  "reviewCount",
  "createdAt"
)
VALUES
  (
    gen_random_uuid(),
    'Organic Spinach',
    'Fresh organic spinach leaves',
    3.50,
    'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
    'Vegetables',
    true,
    4.7,
    89,
    NOW()
  ),
  (
    gen_random_uuid(),
    'Fresh Mango',
    'Sweet and juicy mangoes',
    4.99,
    'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    'Fruits',
    true,
    4.9,
    156,
    NOW()
  ),
  (
    gen_random_uuid(),
    'Almond Milk',
    'Creamy and nutritious almond milk',
    5.50,
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    'Dairy',
    true,
    4.6,
    112,
    NOW()
  );
```

### Step 3: Verify

Visit your backend API:
```
https://foodzy-ecommerce-production.up.railway.app/products
```

---

## Method 3: Manual Insertion via Railway UI

1. Go to Railway Dashboard → PostgreSQL → "Data" tab
2. Click on `products` table
3. Click "Insert Row"
4. Fill in the fields:
   - **name**: Product name
   - **description**: Product description
   - **price**: Price (decimal)
   - **imageUrl**: Image URL (use Unsplash)
   - **category**: One of: Vegetables, Fruits, Dairy, Bakery, Snacks
   - **isAvailable**: true
   - **rating**: 0-5 (decimal)
   - **reviewCount**: Number of reviews
5. Click "Save"

---

## Product Image Sources

### Free Image Sources:
- **Unsplash**: `https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w=800&q=80`
- **Pexels**: `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=800`

### Example Categories and Images:

**Vegetables:**
- Spinach: `https://images.unsplash.com/photo-1576045057995-568f588f82fb`
- Broccoli: `https://images.unsplash.com/photo-1459411621453-7b03977f4bfc`
- Bell Pepper: `https://images.unsplash.com/photo-1563565375-f3fdfdbefa83`

**Fruits:**
- Mango: `https://images.unsplash.com/photo-1553279768-865429fa0078`
- Grapes: `https://images.unsplash.com/photo-1537640538966-79f369143f8f`
- Pineapple: `https://images.unsplash.com/photo-1550258987-190a2d41a8ba`

**Dairy:**
- Almond Milk: `https://images.unsplash.com/photo-1550583724-b2692b85b150`
- Cream Cheese: `https://images.unsplash.com/photo-1452195100486-9cc805987862`

**Bakery:**
- Sourdough: `https://images.unsplash.com/photo-1549931319-a545dcf3bc73`
- Donuts: `https://images.unsplash.com/photo-1551024506-0bccd828d307`

**Snacks:**
- Protein Bar: `https://images.unsplash.com/photo-1604480132736-44c188fe4d20`
- Dried Fruit: `https://images.unsplash.com/photo-1610832958506-aa56368176cf`

---

## Product Template

Use this template to add new products:

```sql
INSERT INTO products (
  id, name, description, price, "imageUrl", category,
  "isAvailable", rating, "reviewCount", "createdAt"
)
VALUES (
  gen_random_uuid(),
  'PRODUCT_NAME',
  'PRODUCT_DESCRIPTION',
  PRICE_NUMBER,
  'IMAGE_URL',
  'CATEGORY',  -- Vegetables, Fruits, Dairy, Bakery, or Snacks
  true,
  RATING,      -- 0.0 to 5.0
  REVIEW_COUNT,
  NOW()
);
```

---

## Updating Existing Products

To add category to existing products:

```sql
UPDATE products
SET category = 'Vegetables'
WHERE name IN ('Organic Cabbage', 'Red Tomato', 'Fresh Corn', 'Organic Potato', 'Fresh Carrot');

UPDATE products
SET category = 'Fruits'
WHERE name IN ('Green Apple', 'Fresh Orange', 'Fresh Banana');

UPDATE products
SET category = 'Dairy'
WHERE name IN ('Fresh Milk');

UPDATE products
SET category = 'Bakery'
WHERE name IN ('Whole Wheat Bread');
```

---

## Troubleshooting

### Products not showing on frontend?
1. Check backend API: `https://foodzy-ecommerce-production.up.railway.app/products`
2. Verify `NEXT_PUBLIC_API_URL` is set in Vercel
3. Check browser console for errors

### Category filter not working?
1. Ensure products have `category` field set
2. Check `/products/categories/all` endpoint returns categories
3. Verify frontend is deployed with latest code

### Images not loading?
1. Use HTTPS URLs only
2. Add `?auto=format&fit=crop&w=800&q=80` to Unsplash URLs
3. Test image URL in browser first
