-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 23, 2016 at 12:21 PM
-- Server version: 5.5.52-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `Bookings`
--

CREATE TABLE IF NOT EXISTS `Bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerId` int(11) NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateBooking` datetime NOT NULL,
  `numberReserved` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE IF NOT EXISTS `Customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `dayDateOfYear` date NOT NULL,
  `adress` varchar(255) NOT NULL,
  `city` varchar(150) NOT NULL,
  `zipCode` int(10) NOT NULL,
  `country` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int(15) NOT NULL,
  `dateCustomerCreation` datetime NOT NULL,
  `password` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `lastConnexion` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `OrderDetails`
--

CREATE TABLE IF NOT EXISTS `OrderDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantityOrdered` int(3) NOT NULL,
  `productId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `orderId` (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE IF NOT EXISTS `Orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerId` int(11) NOT NULL,
  `dateOrdered` datetime NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE IF NOT EXISTS `Payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerId` int(11) NOT NULL,
  `totalPaid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE IF NOT EXISTS `Products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `quantityInStock` int(11) NOT NULL,
  `buyPrice` int(11) NOT NULL,
  `salePrice` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`id`, `name`, `photo`, `description`, `quantityInStock`, `buyPrice`, `salePrice`) VALUES
(1, 'Coca-Cola', 'coca.jpg', 'Mmmm, le Coca-Cola avec 10 morceaux de sucres et tout plein de caféine !', 72, 1, 3),
(2, 'Bagel Thon', 'bagel_thon.jpg', 'Notre bagel est constitué d''un pain moelleux avec des grains de sésame et du thon albacore, accompagné de feuilles de salade fraîche du jour  et d''une sauce renversante :-)', 18, 3, 6),
(3, 'Bacon Cheeseburger', 'bacon_cheeseburger.jpg', 'Ce délicieux cheeseburger contient un steak haché viande française de 150g ainsi que d''un buns grillé juste comme il faut, le tout accompagné de frites fraîches maison !', 14, 6, 13),
(4, 'Carrot Cake', 'carrot_cake.jpg', 'Le carrot cake maison ravira les plus gourmands et les puristes : tous les ingrédients sont naturels !\r\nÀ consommer sans modération', 9, 3, 7),
(5, 'Donut Chocolat', 'chocolate_donut.jpg', 'Les donuts sont fabriqués le matin même et sont recouvert d''une délicieuse sauce au chocolat !', 16, 3, 6),
(6, 'Dr. Pepper', 'drpepper.jpg', 'Son goût sucré avec de l''amande vous ravira !', 53, 1, 3),
(7, 'Milkshake', 'milkshake.jpg', 'Notre milkshake bien crémeux contient des morceaux d''Oréos et est accompagné de crème chantilly et de smarties en guise de topping. Il éblouira vos papilles !', 12, 2, 5),
(8, 'Frites', 'frites.jpg', 'Aaaaaah ces merveilleux bâtonnets de pomme de terre qui nous régalent depuis qu''on est petit. Venez déguster les notres, elles sont faites maison !', 127, 1, 3),
(9, 'Hot-dog', 'hotdog.jpeg', 'Le typique sandwitch américain avec sa saucisse cuite accompagnée de ketchup, moutarde, oignons ou encore une bonne mayonnaise dont nous avons le secret.', 55, 1, 4);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Bookings`
--
ALTER TABLE `Bookings`
  ADD CONSTRAINT `Bookings_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`id`);

--
-- Constraints for table `OrderDetails`
--
ALTER TABLE `OrderDetails`
  ADD CONSTRAINT `OrderDetails_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`),
  ADD CONSTRAINT `OrderDetails_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`);

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`id`);

--
-- Constraints for table `Payments`
--
ALTER TABLE `Payments`
  ADD CONSTRAINT `Payments_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
