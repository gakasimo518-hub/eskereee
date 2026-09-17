INSERT INTO roles (name, description, created_at, updated_at)
VALUES
    ('admin',   'Administrator with full permissions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('user',    'Standard user with limited permissions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('manager', 'Manager with elevated permissions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (name) DO NOTHING;