-- El campo "data" puede ser cualquier dato, inclusive un JSON
--
--
-- Inicio del script:
--
--
-- Todas las plataformas requieren usuarios
DROP TABLE IF EXISTS `mts_contracts`;

DROP TABLE IF EXISTS `coky_contacts`;

DROP TABLE IF EXISTS `coky_ticket_responses`;

DROP TABLE IF EXISTS `coky_tickets`;

DROP TABLE IF EXISTS `coky_users`;

DROP TABLE IF EXISTS `coky_prices`;

DROP TABLE IF EXISTS `coky_inventory`;

DROP TABLE IF EXISTS `coky_products`;

DROP TABLE IF EXISTS `coky_categories`;

CREATE TABLE `coky_users`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `second_name` VARCHAR(50),
  `first_lastname` VARCHAR(50) NOT NULL,
  `second_lastname` VARCHAR(50),
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `data` TEXT DEFAULT NULL,
  `role` INT NOT NULL DEFAULT 1,
  `status` INT NOT NULL DEFAULT 1,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modified` DATETIME DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;

-- Muchos proyectos tienen un formulario de contacto.
CREATE TABLE `coky_contacts`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `full_name` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(50),
  `email` VARCHAR(50) NOT NULL,
  `address` VARCHAR(150),
  `message` TEXT NOT NULL,
  `data` TEXT DEFAULT NULL,
  `privacy_policy` INT NOT NULL DEFAULT 1,
  `send_promo` INT NOT NULL DEFAULT 1,
  `status` INT NOT NULL DEFAULT 1,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modified` DATETIME DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;

-- La tabla de categorías se utiliza en un sin fin de productos de software
CREATE TABLE `coky_categories`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `parent_category` INT DEFAULT NULL,
  `name` VARCHAR(50) NOT NULL,
  `description` TEXT,
  `status` INT NOT NULL DEFAULT 1,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modified` DATETIME DEFAULT NULL,
  FOREIGN KEY (`parent_category`) REFERENCES `coky_categories`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;

-- Algunas plataformas como los sitios de ventas o inventarios requieren
-- una tabla de precios que les permite saber acerca de sus ganancias o pérdidas
CREATE TABLE `coky_prices`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  -- Campo para consultar en lenguaje natural, puede ser usado como categoría
  `related` VARCHAR(50) NOT NULL,
  -- El id del registro al que se hace relación
  `relation` INT NOT NULL DEFAULT 1,
  `price` INT NOT NULL DEFAULT 1,
  `start` DATETIME NOT NULL,
  `end` DATETIME NOT NULL,
  `status` INT NOT NULL DEFAULT 1,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modified` DATETIME DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;

-- Algunas plataformas como los sitios de ventas o inventarios requieren
-- una tabla de productos que les permite gestionar su inventario
CREATE TABLE `coky_products`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `category` INT NOT NULL,
  `value` INT NOT NULL DEFAULT 1,
  `start` DATETIME NOT NULL,
  `end` DATETIME NOT NULL,
  `data` TEXT DEFAULT NULL,
  `status` INT NOT NULL DEFAULT 1,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modified` DATETIME DEFAULT NULL,
  FOREIGN KEY (`category`) REFERENCES `coky_categories`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;

-- Algunas plataformas como los sitios de ventas o inventarios requieren
-- una tabla de inventario que les permite gestionar las cantidades de sus productos
CREATE TABLE `coky_inventory`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `product` INT NOT NULL,
  `quantity` DOUBLE NOT NULL DEFAULT 0,
  `data` TEXT DEFAULT NULL,
  `status` INT NOT NULL DEFAULT 1,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modified` DATETIME DEFAULT NULL,
  FOREIGN KEY (`product`) REFERENCES `coky_products`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;

-- Algunas plataformas requieren de un módulo en el que 
-- los usuarios puedan realizar sus solicitudes
CREATE TABLE `coky_tickets`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user` INT NOT NULL,
  `message` DOUBLE NOT NULL DEFAULT 0,
  `data` TEXT DEFAULT NULL,
  `status` INT NOT NULL DEFAULT 1,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modified` DATETIME DEFAULT NULL,
  FOREIGN KEY (`user`) REFERENCES `coky_users`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;

CREATE TABLE `coky_ticket_responses`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `ticket` INT NOT NULL,
  `user` INT NOT NULL,
  `message` DOUBLE NOT NULL DEFAULT 0,
  `data` TEXT DEFAULT NULL,
  `status` INT NOT NULL DEFAULT 1,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modified` DATETIME DEFAULT NULL,
  FOREIGN KEY (`user`) REFERENCES `coky_users`(`id`),
  FOREIGN KEY (`ticket`) REFERENCES `coky_tickets`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;

-- Tabla contratos para proyecto MTS
CREATE TABLE `mts_contracts`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user` INT NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `address` VARCHAR(150) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `start` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` DATETIME DEFAULT NULL,
  `status` INT NOT NULL DEFAULT 1,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modified` DATETIME DEFAULT NULL,
  FOREIGN KEY (`user`) REFERENCES `coky_users`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;