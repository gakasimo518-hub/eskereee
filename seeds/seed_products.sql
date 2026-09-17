INSERT INTO categories (id, name, created_at, updated_at) VALUES
    (1, 'Elettronica', NOW(), NOW()),
    (2, 'Abbigliamento', NOW(), NOW()),
    (3, 'Casa & Giardino', NOW(), NOW()),
    (4, 'Libri', NOW(), NOW()),
    (5, 'Sport', NOW(), NOW());

INSERT INTO products (id, name, description, price, category_id, created_at, updated_at) VALUES
    (1, 'Smartphone XYZ', 'Smartphone di ultima generazione con display OLED 6,5", 128GB di storage e fotocamera da 48MP.', 699.99, 1, NOW(), NOW()),
    (2, 'Laptop Pro 15"', 'Laptop potente con processore i7, 16GB RAM, SSD 512GB e scheda grafica dedicata.', 1299.50, 1, NOW(), NOW()),
    (3, 'Cuffia Bluetooth', 'Cuffia wireless con cancellazione attiva del rumore e autonomia di 30 ore.', 149.00, 1, NOW(), NOW()),
    (4, 'T-Shirt Unisex', 'T-Shirt 100% cotone, disponibile in vari colori e taglie.', 19.99, 2, NOW(), NOW()),
    (5, 'Jeans Slim Fit', 'Jeans dal taglio slim, denim stretch, lavaggio scuro.', 49.95, 2, NOW(), NOW()),
    (6, 'Felpa con Cappuccio', 'Felpa in felpa spessa con cappuccio regolabile e tasca frontale.', 39.90, 2, NOW(), NOW()),
    (7, 'Set di Pentole Antiaderenti', 'Set da 5 pezzi di pentole antiaderenti con manici in silicone.', 79.99, 3, NOW(), NOW()),
    (8, 'Lampada da Tavolo LED', 'Lampada da tavolo con luce regolabile e ricarica USB integrata.', 34.50, 3, NOW(), NOW()),
    (9, 'Cuscino Memory Foam', 'Cuscino ergonomico in memory foam per un sonno migliore.', 24.99, 3, NOW(), NOW()),
    (10, 'Romanzo Fantasy "L\'Eternità"', 'Avvincente romanzo fantasy ambientato in un mondo di magia e avventure.', 14.99, 4, NOW(), NOW()),
    (11, 'Guida alla Programmazione Python', 'Manuale completo per imparare Python da zero, con esempi pratici.', 29.95, 4, NOW(), NOW()),
    (12, 'Libro di Cucina Vegana', 'Raccolta di ricette vegane salutari e gustose per tutti i giorni.', 22.50, 4, NOW(), NOW()),
    (13, 'Bicicletta da Corsa', 'Bicicletta leggera in alluminio, ideale per gare e allenamenti su strada.', 899.00, 5, NOW(), NOW()),
    (14, 'Pallone da Calcio', 'Pallone da calcio ufficiale FIFA, materiale resistente e design accattivante.', 34.99, 5, NOW(), NOW()),
    (15, 'Zaino da Trekking 30L', 'Zaino impermeabile con scomparti multipli, ideale per escursioni di più giorni.', 59.90, 5, NOW(), NOW());