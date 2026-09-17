-- Seed Roles
INSERT INTO roles (id, name, description, created_at, updated_at) VALUES
  (1, 'admin', 'Administrator with full privileges', NOW(), NOW()),
  (2, 'user', 'Standard user with limited privileges', NOW(), NOW()),
  (3, 'moderator', 'Moderator with content management rights', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed Users
INSERT INTO users (id, username, email, password_hash, role_id, is_active, created_at, updated_at) VALUES
  (1, 'admin', 'admin@example.com', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8c6Vh6Z1K9J9e5Zc6eZ1YcVhZcUu6Y', 1, TRUE, NOW(), NOW()),
  (2, 'john_doe', 'john.doe@example.com', '$2b$10$7s9Qe5K9J9e5Zc6eZ1YcVhZcUu6YcVhZc6eZ1YcVhZcUu6YcVhZcU', 2, TRUE, NOW(), NOW()),
  (3, 'jane_smith', 'jane.smith@example.com', '$2b$10$eZ1YcVhZcUu6YcVhZc6eZ1YcVhZcUu6YcVhZc6eZ1YcVhZcUu6YcV', 2, TRUE, NOW(), NOW()),
  (4, 'moderator', 'mod@example.com', '$2b$10$Uu6YcVhZc6eZ1YcVhZcUu6YcVhZc6eZ1YcVhZcUu6YcVhZc6eZ1Yc', 3, TRUE, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;