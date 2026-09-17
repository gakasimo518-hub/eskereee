-- migrations/002_add_indexes.sql
-- Add indexes to improve query performance
-- Assumes PostgreSQL syntax

-- Ensure unique email addresses for users
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique
ON users (email);

-- Index product name for fast search
CREATE INDEX IF NOT EXISTS idx_products_name
ON products (name);

-- Index foreign key columns for join performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id
ON orders (user_id);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id
ON order_items (order_id);

CREATE INDEX IF NOT EXISTS idx_order_items_product_id
ON order_items (product_id);

CREATE INDEX IF NOT EXISTS idx_product_categories_product_id
ON product_categories (product_id);

CREATE INDEX IF NOT EXISTS idx_product_categories_category_id
ON product_categories (category_id);