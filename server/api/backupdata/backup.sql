/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: customer
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `customer` (
  `cus_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `cus_fname` varchar(25) NOT NULL,
  `cus_lname` varchar(25) NOT NULL,
  `cus_phone` int(10) NOT NULL,
  `cus_address` text NOT NULL,
  `cus_zipcode` int(5) NOT NULL,
  PRIMARY KEY (`cus_id`),
  KEY `username` (`username`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`username`) REFERENCES `login` (`username`)
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: login
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `login` (
  `username` varchar(255) NOT NULL,
  `dateCreate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: order
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `cus_id` int(11) NOT NULL,
  `order_amount` int(10) NOT NULL,
  `order_price` int(10) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `order_ShipMethod` varchar(50) NOT NULL,
  `order_status` varchar(50) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `cus_id` (`cus_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`cus_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 162 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: payment
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `payment` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `payment_totalvat` int(20) NOT NULL,
  `payment_bill` int(11) NOT NULL,
  `payment_method` varchar(20) NOT NULL,
  `payment_status` varchar(25) NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 36 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: product_detail
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `product_detail` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_type` varchar(20) NOT NULL,
  `product_gender` varchar(10) NOT NULL,
  `product_brand` varchar(20) NOT NULL,
  `product_description` text NOT NULL,
  `product_price` int(10) NOT NULL,
  `promotion_id` int(11) NOT NULL,
  `product_urlimg` varchar(255) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `promotion_id` (`promotion_id`),
  CONSTRAINT `product_detail_ibfk_1` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`promotion_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 117 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: product_inventory
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `product_inventory` (
  `product_id` int(11) NOT NULL,
  `product_size` varchar(5) NOT NULL,
  `product_quantity` int(10) NOT NULL,
  `product_dateadd` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`product_id`, `product_size`),
  CONSTRAINT `product_inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_detail` (`product_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: product_order
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `product_order` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_size` varchar(5) NOT NULL,
  `product_amount` int(10) NOT NULL,
  PRIMARY KEY (`order_id`, `product_id`, `product_size`),
  KEY `product_order_ibfk_1` (`product_id`),
  CONSTRAINT `product_order_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_inventory` (`product_id`),
  CONSTRAINT `product_order_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: promotion
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `promotion` (
  `promotion_id` int(11) NOT NULL AUTO_INCREMENT,
  `promotion_name` varchar(255) NOT NULL,
  `promotion_description` text DEFAULT NULL,
  `promotion_discount` int(2) NOT NULL,
  `promotion_url` varchar(255) NOT NULL,
  PRIMARY KEY (`promotion_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: customer
# ------------------------------------------------------------

INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (
    3,
    'ฺBuildty',
    'ธนภรณ์',
    'จอมจินดารัตน์',
    947510404,
    '742 ลาดพร้าว 101 แยก 22 คลองจั่น เขตบางกะปิ กรุงเทพมหานคร 10240',
    10700
  );
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (
    4,
    'bestpencowboy',
    'vg bg',
    ' bg bg',
    964545542,
    '67/09',
    12345
  );
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (5, 'admin', 'admin', 'admin', 1111, '1111', 12345);
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (
    6,
    'Coco_loco',
    'ธนนันท์',
    'จอมจินดารัตน์',
    957455777,
    '6/6',
    10700
  );
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (
    7,
    'Foxii',
    'สราวลี',
    'นิธิวรสกุล ',
    875443544,
    '455/44',
    10400
  );
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (
    8,
    'lonerwoof',
    'ทิษยา',
    'ปรีดาศิริกุล',
    875442345,
    '677/99',
    10600
  );
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (
    9,
    'Lucitabee',
    'สุชาดา ',
    'คำทอง',
    998887777,
    '56/88',
    10510
  );
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (
    10,
    'tiger.hoods',
    'กิตติ',
    'วีระกิตธนา',
    675334434,
    '34/1',
    10900
  );
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (
    11,
    'Patootie_Ru',
    'เจียมพจน์ ',
    'ชัยชนา ',
    875555777,
    '9/88',
    10140
  );
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (
    12,
    'Nothingxtoxsay',
    'บวรรัช',
    'วงศ์สวัสดิ์ ',
    876764444,
    '44/66',
    10170
  );
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (
    13,
    'Manga.ruu',
    'ภูริณัฐ',
    'ผดุงญาณ',
    987776543,
    '742 ลาดพร้าว 101 แยก 22 คลองจั่น เขตบางกะปิ กรุงเทพมหานคร 10240',
    10300
  );
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (
    14,
    'pooommm',
    'popoo',
    'popoo',
    1234567891,
    '12121212',
    12121
  );
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (
    15,
    'BowwyJaru',
    'จารุวรรณ',
    'โบววี่',
    900900090,
    '1/1 แยก 1 ซานฟราน ซานฟรานรีเวิลด์ อเมริกา โน่ ',
    11111
  );
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (16, 'aaaa', 'aaaa', 'aaa', 11111111, '1111', 11111);
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (17, 'poom', 'k', 'k', 124, '12', 13456);
INSERT INTO
  `customer` (
    `cus_id`,
    `username`,
    `cus_fname`,
    `cus_lname`,
    `cus_phone`,
    `cus_address`,
    `cus_zipcode`
  )
VALUES
  (18, 'ddddddd', 'k', 'k', 124, '12', 13456);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: login
# ------------------------------------------------------------

INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'aaaa',
    '2023-04-12 04:38:22',
    '$2a$10$Hk5LKK3Vi20log55sKvmie8Z1c8XDqqC0Y3lkmWTLUetRbOBCvrKq',
    'aaaa'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'admin',
    '2023-03-30 15:14:13',
    '$2a$10$LJ01xRqUn/1.CavERPdBkuJi6D3z5x6tEDZD.yw5xEOBjnqeWNzYK',
    'admin1234'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'bestpencowboy',
    '2023-03-28 13:39:50',
    '$2a$10$HA6ZBL09EWmRXAdt0TVo5OTT3g8RY.QJMgpOhguQt5FREJeleiouW',
    'gbthu'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'BowwyJaru',
    '2023-04-10 15:29:50',
    '$2a$10$IzPdpE1xI.o2BrrMsLsw4eKx1EbAT1MicZDOIKFfZTPW8KakLlAGq',
    'Bow'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'Coco_loco',
    '2023-03-10 01:26:52',
    'RCtpI3gT',
    'Coco_loco@email.com'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'ddddddd',
    '2023-04-12 11:48:03',
    '$2a$10$SDupzjkpoMSTaniNaLVcpeXDjtnjNBg5nind8HV1zQvfGQC6lReya',
    'd'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'Foxii',
    '2023-04-09 01:35:00',
    'fdgdgg',
    'Foxii@email.com'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'lonerwoof',
    '2023-04-09 01:35:00',
    'hyTKWlAD',
    'lonerwoof@email.com'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'Lucitabee',
    '2023-04-09 01:35:00',
    '8GMXnoxB',
    'Lucitabee@email.com'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'Mama Huh',
    '2023-03-10 01:26:52',
    'M8eNnJZk',
    'Mama Huh@email.com'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'Manga.ruu',
    '2023-03-10 01:26:52',
    '1amuuB4t',
    'Manga.ruu@email.com'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'Mesh_Fresh',
    '2023-03-10 01:26:52',
    'ZIOFjiuC',
    'MeshFresh@email.com'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'Nothingxtoxsay',
    '2023-04-09 01:35:00',
    'Hqnk550W',
    'Nothingxtoxsay@email.com'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'Patootie_Ru',
    '2023-04-09 01:35:00',
    'dgfdgf',
    'PatootieRu@emailcom'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'poom',
    '2023-04-10 14:25:10',
    '$2a$10$Jb5bDUPDqczkXaCWCJsPLua1i1M0V9MGHPS9o4dztkyPegyz5Gnie',
    'pooo'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'pooommm',
    '2023-04-10 14:25:40',
    '$2a$10$gfYzA135OM093JKclBoK6.sjH5siNgMMj1mZpNScZ8R85VaT6M.PK',
    'pooo'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'Sugar_Jeez',
    '2023-04-09 01:35:00',
    'yoMTnhKc',
    'SugarJeez@email.com'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'Sup_Diana',
    '2023-04-09 01:35:00',
    'qLRPcN7O',
    'Supiana@email.com'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'tiger.hoods',
    '2023-04-09 01:35:00',
    'Bklohs8Q',
    'tiger.hoods@email.com'
  );
INSERT INTO
  `login` (`username`, `dateCreate`, `password`, `email`)
VALUES
  (
    'ฺBuildty',
    '2023-03-11 17:25:01',
    '1234',
    'thanaphonjomjindarat@email.com'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: order
# ------------------------------------------------------------

INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    1,
    3,
    3,
    19500,
    '2023-01-30 15:12:26',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    2,
    3,
    1,
    4946,
    '2023-04-09 02:59:47',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    3,
    4,
    1,
    2000,
    '2023-01-09 02:40:20',
    'ส่งฟรี',
    'จัดส่งสำเร็จ'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    4,
    6,
    1,
    5200,
    '2023-01-09 02:38:44',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    5,
    13,
    1,
    7177,
    '2023-01-09 02:38:44',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    6,
    6,
    2,
    10800,
    '2023-01-09 02:38:44',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    7,
    7,
    2,
    3770,
    '2023-01-09 02:38:44',
    'ems',
    'จัดส่งสำเร็จ'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    8,
    7,
    1,
    6500,
    '2023-01-09 02:38:44',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    9,
    9,
    1,
    695,
    '2023-01-09 02:38:44',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    10,
    10,
    1,
    1349,
    '2023-01-09 02:38:44',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    11,
    10,
    1,
    1259,
    '2023-01-09 02:38:44',
    'ems',
    'จัดส่งสำเร็จ'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    12,
    3,
    1,
    6371,
    '2023-01-09 02:38:44',
    'ems',
    'จัดส่งสำเร็จ'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    13,
    13,
    3,
    2085,
    '2023-02-09 02:38:44',
    'ems',
    'จัดส่งสำเร็จ'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    14,
    7,
    1,
    1815,
    '2023-02-15 03:09:07',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    15,
    7,
    1,
    1815,
    '2023-02-15 03:09:07',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    16,
    3,
    1,
    1815,
    '2023-02-23 03:15:15',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    17,
    12,
    1,
    1815,
    '2023-02-09 03:15:24',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    18,
    9,
    1,
    1815,
    '2023-02-09 03:15:43',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    19,
    12,
    1,
    1815,
    '2023-02-09 03:15:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    20,
    4,
    1,
    1815,
    '2023-02-09 03:15:56',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    21,
    10,
    1,
    1815,
    '2023-02-09 03:16:04',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    22,
    7,
    1,
    6414,
    '2023-02-09 03:20:40',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    23,
    6,
    1,
    5200,
    '2023-03-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    24,
    6,
    1,
    3500,
    '2023-03-09 03:52:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    25,
    6,
    1,
    3450,
    '2023-03-09 03:52:57',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    26,
    6,
    1,
    1240,
    '2023-03-09 03:53:48',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    27,
    7,
    1,
    2560,
    '2023-03-09 03:54:00',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    28,
    8,
    1,
    5200,
    '2023-03-23 03:54:45',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    29,
    3,
    1,
    5200,
    '2023-03-25 03:54:52',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    30,
    6,
    1,
    5200,
    '2023-03-25 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    31,
    11,
    1,
    5200,
    '2023-03-25 03:54:59',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    32,
    6,
    1,
    8800,
    '2023-04-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    33,
    3,
    1,
    6500,
    '2023-04-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    34,
    7,
    1,
    2400,
    '2023-04-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    35,
    8,
    1,
    4500,
    '2023-04-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    36,
    3,
    1,
    2600,
    '2023-04-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    37,
    12,
    1,
    5200,
    '2023-04-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    38,
    10,
    1,
    5800,
    '2023-04-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    39,
    5,
    1,
    5200,
    '2023-04-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    40,
    3,
    1,
    5800,
    '2023-04-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    41,
    8,
    1,
    5200,
    '2023-04-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    42,
    6,
    1,
    8800,
    '2023-05-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    43,
    3,
    1,
    6500,
    '2023-05-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    44,
    7,
    1,
    2400,
    '2023-05-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    45,
    8,
    1,
    4500,
    '2023-05-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    46,
    3,
    1,
    2600,
    '2023-05-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    47,
    12,
    1,
    5200,
    '2023-05-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    48,
    10,
    1,
    5800,
    '2023-05-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    49,
    5,
    1,
    5200,
    '2023-05-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    50,
    3,
    1,
    5800,
    '2023-05-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    51,
    8,
    1,
    5200,
    '2023-05-15 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    52,
    6,
    1,
    8800,
    '2023-06-01 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    53,
    3,
    1,
    6500,
    '2023-06-03 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    54,
    7,
    1,
    2400,
    '2023-06-03 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    55,
    8,
    1,
    4500,
    '2023-06-04 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    56,
    3,
    1,
    2600,
    '2023-06-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    57,
    12,
    1,
    5200,
    '2023-06-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    58,
    10,
    1,
    5800,
    '2023-06-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    59,
    5,
    1,
    5200,
    '2023-06-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    60,
    3,
    1,
    5800,
    '2023-06-13 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    61,
    8,
    1,
    5200,
    '2023-06-13 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    62,
    6,
    1,
    8800,
    '2023-07-01 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    63,
    3,
    1,
    6500,
    '2023-07-03 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    64,
    7,
    1,
    2400,
    '2023-07-03 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    65,
    8,
    1,
    4500,
    '2023-07-04 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    66,
    3,
    1,
    2600,
    '2023-07-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    67,
    12,
    1,
    5200,
    '2023-07-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    68,
    10,
    1,
    5800,
    '2023-07-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    69,
    9,
    1,
    5200,
    '2023-07-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    70,
    3,
    1,
    5800,
    '2023-07-13 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    71,
    8,
    1,
    5200,
    '2023-07-13 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    72,
    6,
    1,
    8800,
    '2023-08-01 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    73,
    3,
    1,
    6500,
    '2023-08-03 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    74,
    7,
    1,
    2400,
    '2023-08-03 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    75,
    8,
    1,
    4500,
    '2023-08-04 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    76,
    3,
    1,
    2600,
    '2023-08-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    77,
    12,
    1,
    5200,
    '2023-08-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    78,
    10,
    1,
    5800,
    '2023-08-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    79,
    9,
    1,
    5200,
    '2023-08-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    80,
    3,
    1,
    5800,
    '2023-08-13 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    81,
    8,
    1,
    5200,
    '2023-08-13 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    82,
    6,
    1,
    8800,
    '2023-09-01 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    83,
    3,
    1,
    6500,
    '2023-09-03 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    84,
    7,
    1,
    2400,
    '2023-09-03 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    85,
    8,
    1,
    4500,
    '2023-09-04 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    86,
    3,
    1,
    2600,
    '2023-09-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    87,
    12,
    2,
    5200,
    '2023-09-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    88,
    10,
    1,
    5800,
    '2023-09-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    89,
    9,
    1,
    5200,
    '2023-09-09 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    90,
    3,
    1,
    5800,
    '2023-09-13 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    91,
    8,
    1,
    5200,
    '2023-09-13 03:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    92,
    6,
    1,
    8800,
    '2023-10-01 13:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    93,
    10,
    2,
    6500,
    '2023-10-03 13:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    94,
    9,
    1,
    2400,
    '2023-10-03 13:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    95,
    7,
    1,
    4500,
    '2023-10-04 13:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    96,
    5,
    2,
    2600,
    '2023-10-09 12:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    97,
    12,
    1,
    5200,
    '2023-10-09 16:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    98,
    10,
    1,
    5800,
    '2023-10-09 16:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    99,
    9,
    1,
    5200,
    '2023-10-09 17:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    100,
    3,
    1,
    5800,
    '2023-10-13 17:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    101,
    8,
    1,
    5200,
    '2023-10-13 17:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    102,
    6,
    1,
    8800,
    '2023-11-01 13:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    103,
    10,
    2,
    6500,
    '2023-11-03 13:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    104,
    9,
    1,
    2400,
    '2023-11-03 13:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    105,
    7,
    1,
    4500,
    '2023-11-04 13:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    106,
    5,
    2,
    2600,
    '2023-11-09 12:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    107,
    12,
    1,
    5200,
    '2023-11-09 16:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    108,
    10,
    1,
    5800,
    '2023-11-09 16:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    109,
    9,
    1,
    5200,
    '2023-11-09 17:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    110,
    3,
    1,
    5800,
    '2023-11-13 17:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    111,
    8,
    1,
    5200,
    '2023-11-13 17:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    112,
    6,
    1,
    8800,
    '2023-12-01 13:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    113,
    10,
    2,
    6500,
    '2023-12-03 13:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    114,
    9,
    1,
    2400,
    '2023-12-03 13:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    115,
    7,
    1,
    4500,
    '2023-12-04 13:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    116,
    5,
    2,
    2600,
    '2023-12-09 12:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    117,
    12,
    1,
    5200,
    '2023-12-09 16:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    118,
    10,
    1,
    5800,
    '2023-12-09 16:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    119,
    9,
    1,
    5200,
    '2023-12-09 17:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    120,
    3,
    1,
    5800,
    '2023-12-13 17:43:50',
    'ems',
    'กำลังจัดส่ง'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    121,
    8,
    1,
    5200,
    '2023-04-10 12:45:24',
    'ems',
    'จัดส่งแล้ว'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    122,
    5,
    2,
    14404,
    '2023-04-10 14:31:02',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    123,
    5,
    2,
    14404,
    '2023-04-10 14:32:58',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    124,
    5,
    2,
    14404,
    '2023-04-10 14:33:24',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    125,
    5,
    2,
    14404,
    '2023-04-10 14:33:35',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    126,
    5,
    2,
    14404,
    '2023-04-10 14:37:35',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    127,
    5,
    2,
    14404,
    '2023-04-10 14:40:05',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    128,
    5,
    2,
    14404,
    '2023-04-10 14:40:14',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    129,
    5,
    2,
    14404,
    '2023-04-10 14:40:29',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    130,
    5,
    2,
    14404,
    '2023-04-10 14:41:32',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    131,
    5,
    2,
    14404,
    '2023-04-10 14:42:50',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    132,
    5,
    2,
    14404,
    '2023-04-10 14:45:04',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    133,
    5,
    2,
    14404,
    '2023-04-10 14:46:54',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    134,
    5,
    2,
    14404,
    '2023-04-10 14:53:12',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    135,
    5,
    2,
    14404,
    '2023-04-10 14:53:53',
    'ems',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    136,
    15,
    5,
    25090,
    '2023-04-10 15:31:24',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    137,
    5,
    5,
    22880,
    '2023-04-10 17:41:04',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    138,
    16,
    3,
    13550,
    '2023-04-12 05:41:40',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    139,
    16,
    3,
    13550,
    '2023-04-12 05:43:21',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    140,
    16,
    3,
    13550,
    '2023-04-12 05:47:24',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    141,
    16,
    3,
    13550,
    '2023-04-12 05:52:25',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    142,
    16,
    3,
    13550,
    '2023-04-12 05:52:38',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    143,
    16,
    3,
    13550,
    '2023-04-12 05:54:31',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    144,
    16,
    3,
    13550,
    '2023-04-12 05:55:14',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    145,
    16,
    3,
    13550,
    '2023-04-12 05:56:05',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    146,
    16,
    3,
    13550,
    '2023-04-12 05:56:36',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    147,
    16,
    3,
    13550,
    '2023-04-12 06:02:07',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    148,
    16,
    3,
    13550,
    '2023-04-12 06:04:04',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    149,
    16,
    3,
    13550,
    '2023-04-12 06:06:27',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    150,
    16,
    3,
    13550,
    '2023-04-12 06:08:20',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    151,
    16,
    3,
    13550,
    '2023-04-12 06:08:55',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    152,
    16,
    3,
    13550,
    '2023-04-12 06:10:22',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    153,
    16,
    3,
    13550,
    '2023-04-12 06:11:39',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    154,
    16,
    3,
    13550,
    '2023-04-12 06:12:03',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    155,
    16,
    3,
    13550,
    '2023-04-12 06:12:47',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    156,
    16,
    3,
    13550,
    '2023-04-12 06:13:02',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    157,
    16,
    3,
    13550,
    '2023-04-12 06:15:20',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    158,
    16,
    3,
    13550,
    '2023-04-12 06:15:54',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    159,
    16,
    2,
    17650,
    '2023-04-12 11:37:15',
    'standard',
    'pending'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    160,
    18,
    2,
    17650,
    '2023-04-12 11:51:44',
    'standard',
    'จัดส่งแล้ว'
  );
INSERT INTO
  `order` (
    `order_id`,
    `cus_id`,
    `order_amount`,
    `order_price`,
    `order_date`,
    `order_ShipMethod`,
    `order_status`
  )
VALUES
  (
    161,
    5,
    1,
    100050,
    '2023-04-12 11:55:50',
    'standard',
    'จัดส่งแล้ว'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: payment
# ------------------------------------------------------------

INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (1, 1, 2000, 123, 'เงินสด', 'ชำระเสร็จสิ้น');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (2, 2, 1600, 122, 'เงินสด', 'รอชำระ');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (3, 23, 5210, 34457, 'promptpay', 'รอชำระ');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (4, 17, 1838, 34458, 'promptpay', 'ชำระเสร็จสิ้น');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (5, 31, 5210, 34459, 'promptpay', 'ชำระเสร็จสิ้น');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (6, 132, 14404, 234101445, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (7, 133, 14404, 234101446, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (8, 134, 14404, 234101453, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (9, 135, 14404, 234101453, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (10, 136, 25090, 234101531, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (11, 137, 22880, 234101741, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (12, 138, 13550, 23412541, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (13, 139, 13550, 23412543, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (14, 140, 13550, 23412547, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (15, 141, 13550, 23412552, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (16, 142, 13550, 23412552, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (17, 143, 13550, 23412554, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (18, 144, 13550, 23412555, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (19, 145, 13550, 23412556, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (20, 146, 13550, 23412556, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (21, 147, 13550, 2341262, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (22, 148, 13550, 2341264, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (23, 149, 13550, 2341266, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (24, 150, 13550, 2341268, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (25, 151, 13550, 2341268, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (26, 152, 13550, 23412610, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (27, 153, 13550, 23412611, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (28, 154, 13550, 23412612, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (29, 155, 13550, 23412612, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (30, 156, 13550, 23412613, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (31, 157, 13550, 23412615, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (32, 158, 13550, 23412615, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (33, 159, 17650, 234121137, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (34, 160, 17650, 234121149, 'Mastercard', 'paid');
INSERT INTO
  `payment` (
    `payment_id`,
    `order_id`,
    `payment_totalvat`,
    `payment_bill`,
    `payment_method`,
    `payment_status`
  )
VALUES
  (35, 161, 100050, 234121154, 'Mastercard', 'paid');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: product_detail
# ------------------------------------------------------------

INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    1,
    'shoes',
    'F',
    'Adidas',
    'NMDV2BoostClassicLow-Top',
    5200,
    1,
    '\\images\\shoes\\adidas\\1_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    2,
    'shoes',
    'F',
    'Adidas',
    'AdidasOriginals ',
    7177,
    1,
    '\\images\\shoes\\adidas\\2_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    3,
    'shoes',
    'F',
    'Adidas',
    'Adidas2022ใหม่Forum84',
    4566,
    1,
    '\\images\\shoes\\adidas\\3_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    4,
    'shoes',
    'F',
    'Adidas',
    'AdidasOriginalsOzweegoTraceCargoBreathable ',
    4600,
    1,
    '\\images\\shoes\\adidas\\4_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    5,
    'shoes',
    'F',
    'Adidas',
    'AdidasOriginalsForum84',
    5900,
    1,
    '\\images\\shoes\\adidas\\5_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    6,
    'shoes',
    'M',
    'Adidas',
    'AdidasSTRUTTER',
    4500,
    1,
    '\\images\\shoes\\adidas\\6_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    7,
    'shoes',
    'M',
    'Adidas',
    'AdidasCLIMACOOLVENTANIA',
    6414,
    1,
    '\\images\\shoes\\adidas\\7_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    8,
    'shoes',
    'M',
    'Adidas',
    'AdidasOriginalsSamba',
    5400,
    1,
    '\\images\\shoes\\adidas\\8_1.png\r\n'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    9,
    'shoes',
    'M',
    'Adidas',
    'AdidasStanSmith',
    4000,
    1,
    '\\images\\shoes\\adidas\\9_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    10,
    'shoes',
    'M',
    'Adidas',
    'AdidasOriginalsForum84ต่ำCL',
    4500,
    1,
    '\\images\\shoes\\adidas\\10_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    11,
    'shoes',
    'M',
    'Adidas',
    'AdidasOirginalsSambarose',
    4110,
    1,
    '\\images\\shoes\\adidas\\11_1.png'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    12,
    'shoes',
    'M',
    'Adidas',
    'AdidasULTRA20',
    8800,
    1,
    '\\images\\shoes\\adidas\\12_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    13,
    'shoes',
    'Unisex',
    'Converse',
    'ConverseOriginalAllStar1970S ',
    2950,
    1,
    '\\images\\shoes\\converse\\13_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    14,
    'shoes',
    'Unisex',
    'Converse',
    'ConverseOriginalChuckTaylorAllStar ',
    2920,
    1,
    '\\images\\shoes\\converse\\14_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    15,
    'shoes',
    'Unisex',
    'Converse',
    'ConverseAllStarCXSuedeClassic',
    3770,
    1,
    '\\images\\shoes\\converse\\15_1.png'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    16,
    'shoes',
    'Unisex',
    'Converse',
    'ConverseChuckTaylorTomJerry',
    3333,
    1,
    '\\images\\shoes\\converse\\16_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    17,
    'shoes',
    'Unisex',
    'Converse',
    'ConverseChuck70',
    6500,
    1,
    '\\images\\shoes\\converse\\17_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    18,
    'shoes',
    'Unisex',
    'Converse',
    'ConverseChuckTaylorAllStar1',
    4946,
    1,
    '\\images\\shoes\\converse\\18_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    19,
    'shoes',
    'Unisex',
    'Converse',
    'ConverseOriginalOneStarOX ',
    2600,
    1,
    '\\images\\shoes\\converse\\19_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    20,
    'shoes',
    'Unisex',
    'Converse',
    'Converse1970SChuckTaylor',
    4500,
    1,
    '\\images\\shoes\\converse\\20_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    21,
    'shoes',
    'Unisex',
    'Converse',
    'ConverseChuckTaylorAllStarCX',
    5800,
    1,
    '\\images\\shoes\\converse\\21_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    22,
    'shoes',
    'Unisex',
    'Newbalance',
    'FreshFoamX1080v12',
    5510,
    1,
    '\\images\\shoes\\newblance\\22_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    23,
    'shoes',
    'Unisex',
    'Newbalance',
    'MADEinUSA990v5Core',
    6371,
    1,
    '\\images\\shoes\\newblance\\23_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    24,
    'shoes',
    'Unisex',
    'Newbalance',
    'FreshFoam3000v6Turf-Trainer',
    3099,
    1,
    '\\images\\shoes\\newblance\\24_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    25,
    'shoes',
    'Unisex',
    'Newbalance',
    'FreshFoamArishiv4',
    2400,
    1,
    '\\images\\shoes\\newblance\\25_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    26,
    'shoes',
    'Unisex',
    'Newbalance',
    'FreshFoamXHierrov7',
    4821,
    1,
    '\\images\\shoes\\newblance\\26_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    31,
    'shoes',
    'F',
    'Nike',
    'NIKESBZOOMBLAZERMIDPRM',
    6553,
    2,
    '\\images\\shoes\\nike\\27_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    32,
    'shoes',
    'F',
    'Nike',
    'NikeAirForce1\'07LV8',
    5149,
    2,
    '\\images\\shoes\\nike\\28_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    33,
    'shoes',
    'F',
    'Nike',
    'NikeAirMax90Viotech2.0',
    4900,
    2,
    '\\images\\shoes\\nike\\29_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    34,
    'shoes',
    'M',
    'Nike',
    'NIKENIKESBFORCE58',
    5686,
    2,
    '\\images\\shoes\\nike\\30_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    35,
    'shoes',
    'M',
    'Nike',
    'NikeDunkHighSP',
    4466,
    2,
    '\\images\\shoes\\nike\\31_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    36,
    'shoes',
    'M',
    'Nike',
    'NikeAirJordanLegacy312HighRetro',
    5676,
    2,
    '\\images\\shoes\\nike\\32_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    37,
    'shoes',
    'M',
    'Nike',
    'NIKEAIRMAX97',
    9153,
    2,
    '\\images\\shoes\\nike\\33_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    38,
    'shoes',
    'F',
    'Nike',
    'NIKEBLAZERLOW77',
    6241,
    2,
    '\\images\\shoes\\nike\\34_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    39,
    'shoes',
    'F',
    'Nike',
    'NikeAirMax90',
    4980,
    2,
    '\\images\\shoes\\nike\\35_1.png'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    40,
    'shoes',
    'M',
    'Nike',
    'NikeAirJordan1',
    5200,
    2,
    '\\images\\shoes\\nike\\36_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    41,
    'shoes',
    'F',
    'Nike',
    'NIKEAIRMONARCHIV',
    5374,
    2,
    '\\images\\shoes\\nike\\37_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    42,
    'shoes',
    'F',
    'Nike',
    'NIKEWREACTPEGASUSTRAIL4',
    7800,
    2,
    '\\images\\shoes\\nike\\38_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    43,
    'clothes',
    'M',
    'Nike',
    'NIKEASMNPDFHPRDRYTOPSS',
    1815,
    2,
    '\\images\\cloth\\nike\\39_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    44,
    'clothes',
    'M',
    'Nike',
    'NIKEASMNKPACERTOPHZ',
    2424,
    2,
    '\\images\\cloth\\nike\\40_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    45,
    'clothes',
    'M',
    'Nike',
    'NIKEASDFSS',
    2213,
    2,
    '\\images\\cloth\\nike\\41_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    46,
    'clothes',
    'M',
    'Nike',
    'NIKEASWNSWESSNTLTEEBOXYLBR ',
    2663,
    2,
    '\\images\\cloth\\nike\\42_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    47,
    'clothes',
    'M',
    'Nike',
    'NIKEASMNSWSPEPOLOMATCHUPPQ',
    2594,
    2,
    '\\images\\cloth\\nike\\43_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    48,
    'clothes',
    'M',
    'Nike',
    'NIKEASMNKDFELMNTTOPHZ',
    2767,
    2,
    '\\images\\cloth\\nike\\44_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    49,
    'clothes',
    'M',
    'Nike',
    'LALMNKCTSJDNSTMTSSTE ',
    2836,
    2,
    '\\images\\cloth\\nike\\45_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    50,
    'clothes',
    'M',
    'Nike',
    'NIKEASMNKTFRPLELMNT ',
    4669,
    2,
    '\\images\\cloth\\nike\\46_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    52,
    'clothes',
    'M',
    'Nike',
    'NIKEASMNSWPRMESNTLSUSTSTRP ',
    2421,
    2,
    '\\images\\cloth\\nike\\48_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    53,
    'clothes',
    'F',
    'Nike',
    'NIKEASMNPDF',
    2594,
    2,
    '\\images\\cloth\\nike\\49_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    54,
    'clothes',
    'F',
    'Nike',
    'NIKEASWNSWRPLESSNTLWVNMRJGG',
    2663,
    2,
    '\\images\\cloth\\nike\\50_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    55,
    'clothes',
    'F',
    'Nike',
    'NIKEASESSSTMTFLCPANT',
    5119,
    2,
    '\\images\\cloth\\nike\\51_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    56,
    'clothes',
    'F',
    'Nike',
    'NIKEASWNSWESSNTLWVNHRPNT ',
    4669,
    2,
    '\\images\\cloth\\nike\\52_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    57,
    'clothes',
    'F',
    'Nike',
    'NIKEASKIMNK',
    5051,
    2,
    '\\images\\cloth\\nike\\53_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    58,
    'clothes',
    'M',
    'Adidas',
    'AdidasOriginalsQ1TEE',
    3043,
    1,
    '\\images\\cloth\\adidas\\54_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    59,
    'clothes',
    'Unisex',
    'Adidas',
    'AdidasUBPOLOLS',
    3804,
    1,
    '\\images\\cloth\\adidas\\55_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    60,
    'clothes',
    'Unisex',
    'Adidas',
    'AdidasSTLOGOGFXTEE',
    2325,
    1,
    '\\images\\cloth\\adidas\\56_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    61,
    'clothes',
    'Unisex',
    'Adidas',
    'AdidasOriginals3ลายทาง',
    2594,
    1,
    '\\images\\cloth\\adidas\\57_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    62,
    'clothes',
    'Unisex',
    'Adidas',
    'AdidasAIGFXSS',
    2035,
    1,
    '\\images\\cloth\\adidas\\58_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    63,
    'clothes',
    'Unisex',
    'Adidas',
    'AdidasTIRO19WOVPNT',
    3631,
    1,
    '\\images\\cloth\\adidas\\59_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    64,
    'clothes',
    'F',
    'Adidas',
    'AdidasSTผสมWVPNT',
    5707,
    1,
    '\\images\\cloth\\adidas\\60_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    65,
    'clothes',
    'F',
    'Adidas',
    'AdidasSTRPT',
    4323,
    1,
    '\\images\\cloth\\adidas\\61_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    66,
    'clothes',
    'F',
    'Adidas',
    'AdidasMโลโก้CETP1',
    2870,
    1,
    '\\images\\cloth\\adidas\\62_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    67,
    'clothes',
    'F',
    'Adidas',
    'AdidasFLE',
    4213,
    1,
    '\\images\\cloth\\adidas\\63_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    68,
    'clothes',
    'Unisex',
    'Converse',
    'CHAINSTITCHELEVATEDCARDIGANPULLOVERBLACK',
    2690,
    1,
    '\\images\\cloth\\converse\\93_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    69,
    'clothes',
    'Unisex',
    'Converse',
    'CRYSTALSGRAPHICTEEWHITE',
    790,
    1,
    '\\images\\cloth\\nike\\94_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    70,
    'clothes',
    'Unisex',
    'Converse',
    'CLASSICREMIXTEEWHITE',
    790,
    1,
    '\\images\\cloth\\nike\\95_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    71,
    'clothes',
    'Unisex',
    'Converse',
    'STARCHEVRONCLOUDSGRAPHICTEECREAM',
    890,
    1,
    '\\images\\cloth\\converse\\96_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    72,
    'clothes',
    'Unisex',
    'Converse',
    'CONVERSEGO-TOEMBROIDEREDSTARCHEVRONFLEECESHORT',
    1290,
    1,
    '\\images\\cloth\\converse\\97_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    73,
    'clothes',
    'M',
    'Newbalance',
    'NBAthleticsLunarNewYearFrenchTerryCrewneck',
    2783,
    1,
    '\\images\\cloth\\newblance\\82_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    74,
    'clothes',
    'F',
    'Newbalance',
    'WBaselayerShortSleeveTop',
    1322,
    1,
    '\\images\\cloth\\newblance\\83_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    75,
    'clothes',
    'F',
    'Newbalance',
    'ASRomaXAriesWomensRetailSSJersey',
    5220,
    1,
    '\\images\\cloth\\newblance\\84_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    76,
    'clothes',
    'F',
    'Newbalance',
    'NBShortSleeveTechTee(BostonCollege)',
    1113,
    1,
    '\\images\\cloth\\newblance\\85_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    77,
    'clothes',
    'F',
    'Newbalance',
    'WomensThermalHalfZip',
    1913,
    1,
    '\\images\\cloth\\newblance\\86_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    78,
    'clothes',
    'M',
    'Newbalance',
    'NBEssentialsFrenchTerrySweatpant',
    2083,
    1,
    '\\images\\cloth\\newblance\\87_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    79,
    'clothes',
    'F',
    'Newbalance',
    'RelentlessCrossoverHighRise7/8Tight',
    1913,
    1,
    '\\images\\cloth\\newblance\\88_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    80,
    'accessories',
    'Unisex',
    'Nike',
    'NIKEUNKDFAROBILLVISOR',
    1867,
    2,
    '\\images\\accessories\\hat\\64_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    81,
    'accessories',
    'Unisex',
    'Nike',
    'NIKENKDFL91',
    1259,
    2,
    '\\images\\accessories\\hat\\65_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    82,
    'accessories',
    'Unisex',
    'Nike',
    'NIKEUNSWBUCKETFUTURACORE ',
    2213,
    2,
    '\\images\\accessories\\hat\\66_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    83,
    'accessories',
    'Unisex',
    'Nike',
    'NIKEFEATHERLIGHT',
    1729,
    2,
    '\\images\\accessories\\hat\\67_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    84,
    'accessories',
    'Unisex',
    'Nike',
    'NIKEUNSWH86',
    1729,
    2,
    '\\images\\accessories\\hat\\68_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    85,
    'accessories',
    'Unisex',
    'Adidas',
    'AdidasOriginalsหมวกACUnisex ',
    2176,
    1,
    '\\images\\accessories\\hat\\69_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    86,
    'accessories',
    'Unisex',
    'Adidas',
    'AdidasCNY ',
    1694,
    1,
    '\\images\\accessories\\hat\\70_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    87,
    'accessories',
    'Unisex',
    'Adidas',
    'AdidasBBALLCAPLTEMB ',
    1314,
    1,
    '\\images\\accessories\\hat\\71_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    88,
    'accessories',
    'Unisex',
    'Adidas',
    'AdidasCNYREV',
    2075,
    1,
    '\\images\\accessories\\hat\\72_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    89,
    'accessories',
    'Unisex',
    'Converse',
    'ConverseTipoffCapHpsUnisex ',
    1349,
    1,
    '\\images\\accessories\\hat\\73_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    90,
    'accessories',
    'Unisex',
    'Converse',
    'ConverseLockUpUnisex ',
    1349,
    1,
    '\\images\\accessories\\hat\\74_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    91,
    'accessories',
    'Unisex',
    'Converse',
    'ConverseTipoffChuckPatchBaseballHPS',
    1418,
    1,
    '\\images\\accessories\\hat\\75_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    92,
    'accessories',
    'Unisex',
    'Newbalance',
    '6PanelClassicHat',
    695,
    1,
    '\\images\\accessories\\hat\\89_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    93,
    'accessories',
    'Unisex',
    'Newbalance',
    'PerformanceVisor',
    695,
    1,
    '\\images\\accessories\\hat\\90_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    94,
    'accessories',
    'Unisex',
    'Nike',
    'NIKEELITEกลางถุงเท้าผู้ชายกีฬา',
    1279,
    2,
    '\\images\\accessories\\sock\\76_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    95,
    'accessories',
    'Unisex',
    'Nike',
    'NIKENKSPARKLTWT',
    1314,
    2,
    '\\images\\accessories\\sock\\77_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    96,
    'accessories',
    'Unisex',
    'Nike',
    'NIKEUJEVERYDAYANKL3PR',
    882,
    2,
    '\\images\\accessories\\sock\\78_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    97,
    'accessories',
    'Unisex',
    'Nike',
    'NIKENKEVERYDAYPLUSCUSH',
    1003,
    2,
    '\\images\\accessories\\sock\\79_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    98,
    'accessories',
    'Unisex',
    'Nike',
    'NIKENikeEverydayLightweightMen\'sSportsSocks',
    1176,
    2,
    '\\images\\accessories\\sock\\80_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    99,
    'accessories',
    'Unisex',
    'Nike',
    'NIKEWNKEVRYPLUSLTWT ',
    1176,
    2,
    '\\images\\accessories\\sock\\81_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    100,
    'accessories',
    'Unisex',
    'Newbalance',
    'CoolmaxLowCutSocks2Pack',
    486,
    1,
    '\\images\\accessories\\sock\\91_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    101,
    'accessories',
    'Unisex',
    'Newbalance',
    'CoolmaxNoShowSocks2Pack',
    486,
    1,
    '\\images\\accessories\\sock\\92_1.jpg'
  );
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (106, 's', 's', 's', 's', 12, 1, 's');
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (107, 'fxdf', 'dsf', 'pdf', 'df', 3, 3, 'df');
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (108, 'dryu', 'kbkh', 'kjhk', 'kjhk', 1, 1, 'w');
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (109, 'w', 'w', 'w', 'w', 1, 1, 's');
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (110, 's', 's', 's', 's', 1, 1, 's');
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (111, 'a', 'a', 'a', 'a', 1, 1, 'a');
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (112, 'a', 'a', 'a', 'a', 1, 2, 'a');
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (114, 'a', 's', 's', 's', 1, 1, 's');
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (115, 'a', 'a', 'a', 'a', 1, 1, 'w');
INSERT INTO
  `product_detail` (
    `product_id`,
    `product_type`,
    `product_gender`,
    `product_brand`,
    `product_description`,
    `product_price`,
    `promotion_id`,
    `product_urlimg`
  )
VALUES
  (
    116,
    'shoes',
    'M',
    'Onisuka',
    'Onisuka tiger',
    100000,
    1,
    'pooo'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: product_inventory
# ------------------------------------------------------------

INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (1, '5.5', 20, '2023-04-09 01:05:16');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (1, '6.5', 20, '2023-04-09 01:05:16');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (2, '5.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (2, '6.5', 20, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (2, '7.5', 220, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (3, '5.5', 20, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (3, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (3, '7.5', 155, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (4, '5.5', 20, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (4, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (4, '7.5', 14, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (5, '5.5', 20, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (5, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (5, '7.5', 12, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (6, '5.5', 15, '2023-04-12 06:15:54');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (6, '6.5', 11, '2023-04-12 06:15:54');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (6, '7.5', 22, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (7, '5.5', 20, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (7, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (7, '7.5', 22, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (8, '5.5', 20, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (8, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (8, '7.5', 34, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (9, '5.5', 20, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (9, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (9, '7.5', 12, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (10, '5.5', 20, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (10, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (10, '7.5', 12, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (11, '5.5', 20, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (11, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (11, '7.5', 22, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (12, '5.5', 118, '2023-04-12 11:49:08');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (12, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (12, '7.5', 19, '2023-04-12 11:49:08');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (12, 'XXL', 20, '2023-04-11 22:10:31');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (13, '5.5', 120, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (13, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (13, '7.5', 27, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (14, '5.5', 120, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (14, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (14, '7.5', 25, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (15, '5.5', 210, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (15, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (15, '7.5', 24, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (16, '5.5', 120, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (16, '6.5', 20, '2023-04-09 01:07:48');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (16, '7.5', 25, '2023-04-09 01:10:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (17, '6.5', 20, '2023-03-11 19:09:47');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (17, '7.5', 12, '2023-03-11 19:27:53');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (18, '4.5', 20, '2023-03-11 19:52:00');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (18, '6.5', 20, '2023-03-11 19:38:37');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (22, '6.5', 50, '2023-04-10 15:26:43');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (22, '7.5', 50, '2023-04-10 15:26:58');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (24, 'xxl', 20, '2023-04-12 03:07:54');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (43, 'L', 20, '2023-04-09 01:03:39');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (43, 'M', 20, '2023-04-09 00:59:15');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (43, 'S', 20, '2023-04-09 00:59:15');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (43, 'XL', 20, '2023-04-09 01:03:39');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (44, 'M', 20, '2023-04-09 01:03:39');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (44, 'S', 20, '2023-04-09 01:03:39');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (45, 'M', 20, '2023-04-09 01:03:39');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (45, 'S', 20, '2023-04-09 01:03:39');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (46, 'L', 20, '2023-04-09 01:03:39');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (46, 'M', 20, '2023-04-09 01:03:39');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (46, 'S', 20, '2023-04-09 01:03:39');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (55, 'XL', 10, '2023-03-11 19:58:31');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (60, 'L', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (60, 'M', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (60, 'S', 200, '2023-04-09 01:13:22');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (61, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (61, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (62, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (62, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (63, 'L', 20, '2023-04-09 00:57:49');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (63, 'M', 20, '2023-04-09 00:57:49');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (63, 'S', 20, '2023-04-09 00:57:49');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (63, 'XL', 20, '2023-04-09 00:57:49');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (64, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (64, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (65, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (65, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (66, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (66, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (67, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (67, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (68, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (68, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (69, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (69, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (70, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (70, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (71, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (71, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (73, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (73, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (74, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (74, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (75, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (75, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (76, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (76, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (77, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (77, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (78, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (78, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (79, 'M', 200, '2023-04-09 01:19:27');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (79, 'S', 200, '2023-04-09 01:17:13');
INSERT INTO
  `product_inventory` (
    `product_id`,
    `product_size`,
    `product_quantity`,
    `product_dateadd`
  )
VALUES
  (116, 'xxxl', 199, '2023-04-12 11:54:15');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: product_order
# ------------------------------------------------------------

INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (1, 17, '5.5', 3);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (2, 18, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (3, 8, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (4, 8, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (5, 8, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (6, 8, '6.5', 2);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (7, 12, '6.5', 2);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (8, 3, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (9, 8, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (10, 7, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (11, 7, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (12, 5, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (13, 6, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (13, 8, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (13, 13, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (14, 68, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (16, 61, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (17, 62, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (18, 62, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (19, 63, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (20, 65, 'S', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (21, 9, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (22, 44, 'S', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (23, 15, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (23, 15, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (24, 13, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (25, 15, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (26, 17, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (27, 18, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (28, 15, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (29, 6, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (30, 14, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (31, 44, 'S', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (32, 46, 'S', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (33, 63, 'XL', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (34, 64, 'L', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (35, 73, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (36, 66, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (37, 7, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (38, 14, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (39, 14, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (40, 13, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (41, 4, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (42, 2, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (43, 2, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (44, 3, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (45, 6, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (46, 11, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (47, 12, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (48, 15, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (49, 17, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (50, 5, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (51, 6, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (52, 12, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (53, 8, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (54, 8, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (55, 9, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (56, 13, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (57, 13, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (58, 17, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (59, 3, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (60, 4, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (61, 15, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (62, 13, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (63, 15, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (64, 17, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (65, 18, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (66, 16, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (67, 6, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (68, 14, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (69, 44, 'S', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (70, 46, 'S', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (71, 63, 'XL', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (72, 64, 'L', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (73, 73, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (74, 66, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (75, 7, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (76, 14, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (77, 14, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (78, 13, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (79, 4, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (80, 2, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (81, 2, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (82, 3, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (83, 6, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (84, 11, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (85, 12, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (86, 15, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (87, 17, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (87, 79, 'S', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (88, 5, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (89, 6, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (90, 12, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (91, 8, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (92, 8, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (93, 12, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (93, 73, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (94, 13, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (95, 13, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (96, 17, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (96, 17, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (97, 3, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (98, 2, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (99, 15, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (100, 13, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (101, 15, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (102, 17, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (103, 11, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (103, 18, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (104, 9, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (105, 6, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (106, 14, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (106, 70, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (107, 44, 'S', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (108, 46, 'S', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (109, 63, 'XL', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (110, 64, 'L', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (111, 73, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (112, 66, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (113, 7, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (113, 16, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (114, 14, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (115, 14, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (116, 13, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (116, 67, 'M', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (117, 4, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (118, 2, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (119, 2, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (120, 3, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (121, 6, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (122, 2, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (122, 2, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (123, 2, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (123, 2, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (124, 2, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (124, 2, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (125, 2, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (125, 2, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (132, 2, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (132, 2, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (133, 2, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (133, 2, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (134, 2, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (134, 2, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (135, 2, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (135, 2, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (136, 1, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (136, 5, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (136, 14, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (136, 22, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (136, 22, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (137, 3, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (137, 3, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (138, 6, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (138, 6, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (139, 6, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (139, 6, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (148, 6, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (148, 6, '6.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (155, 6, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (155, 6, '6.5', 2);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (156, 6, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (156, 6, '6.5', 2);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (157, 6, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (157, 6, '6.5', 2);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (158, 6, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (158, 6, '6.5', 2);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (159, 12, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (159, 12, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (160, 12, '5.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (160, 12, '7.5', 1);
INSERT INTO
  `product_order` (
    `order_id`,
    `product_id`,
    `product_size`,
    `product_amount`
  )
VALUES
  (161, 116, 'xxxl', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: promotion
# ------------------------------------------------------------

INSERT INTO
  `promotion` (
    `promotion_id`,
    `promotion_name`,
    `promotion_description`,
    `promotion_discount`,
    `promotion_url`
  )
VALUES
  (1, 'SUMMER Sale', '', 20, 'pro20');
INSERT INTO
  `promotion` (
    `promotion_id`,
    `promotion_name`,
    `promotion_description`,
    `promotion_discount`,
    `promotion_url`
  )
VALUES
  (2, 'NIKE Sale ', '', 70, 'pro70');
INSERT INTO
  `promotion` (
    `promotion_id`,
    `promotion_name`,
    `promotion_description`,
    `promotion_discount`,
    `promotion_url`
  )
VALUES
  (
    3,
    'NEW YEAR Sale',
    'All product except Newbalance',
    70,
    ''
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
