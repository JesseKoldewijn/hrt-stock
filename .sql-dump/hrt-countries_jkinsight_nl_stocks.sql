-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2024 at 10:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrt-countries`
--

-- --------------------------------------------------------

--
-- Table structure for table `hrt-countries.jkinsight.nl_stocks`
--

CREATE TABLE `hrt-countries.jkinsight.nl_stocks` (
  `id` bigint(20) NOT NULL,
  `country` varchar(1500) DEFAULT NULL,
  `brand` varchar(1500) DEFAULT NULL,
  `type` varchar(1500) DEFAULT NULL,
  `description` varchar(1500) DEFAULT NULL,
  `stock` bigint(20) DEFAULT NULL,
  `location` varchar(1500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hrt-countries.jkinsight.nl_stocks`
--

INSERT INTO `hrt-countries.jkinsight.nl_stocks` (`id`, `country`, `brand`, `type`, `description`, `stock`, `location`) VALUES
(1, 'nl', 'Google', 'SMARTPHONE', 'Lorum ipsum', 5, 'Amsterdam'),
(2, 'nl', 'LG', 'PROJECTOR', 'Lorum ipsum', 2, 'Amsterdam'),
(3, 'nl', 'Apple', 'PROJECTOR', 'Lorum ipsum', 0, 'Leiden'),
(4, 'nl', 'Samsung', 'MONITOR', 'Lorum ipsum', 7, NULL),
(5, 'nl', 'Samsung', 'TV', 'Lorum ipsum', 3, NULL),
(6, 'nl', 'Samsung', 'SMARTPHONE', 'Lorum ipsum', 4, NULL),
(7, 'nedereland', 'Samsung', 'SMARTPHONE', 'Lorum ipsum', 2, NULL),
(8, 'nedereland', 'Samsung', 'SMARTPHONE', 'Lorum ipsum', 0, NULL),
(9, 'nedereland', 'Samsung', 'TV', 'Lorum ipsum', 0, 'Far far away'),
(10, 'nedereland', 'Samsung', 'SMARTPHONE', 'Lorum ipsum', 3, 'Langsluf'),
(11, 'nedereland', 'Samsung', 'SMARTPHONE', 'Lorum ipsum', 2, NULL),
(12, 'nedereland', 'LG', 'SMARTPHONE', 'Lorum ipsum', 3, NULL),
(13, 'nedereland', 'Samsung', 'SMARTPHONE', 'Lorum ipsum', 3, 'Langsluf'),
(14, 'nedereland', 'Samsung', 'TV', 'Lorum ipsum', 6, 'Langsluf'),
(15, 'en', 'Samsung', 'MONITOR', 'Lorum ipsum', 7, NULL),
(16, 'en', 'Apple', 'MONITOR', 'Lorum ipsum', 0, 'New York'),
(17, 'en', 'Google', 'TV', 'Lorum ipsum', -1, NULL),
(18, 'en', 'Google', 'MONITOR', 'Lorum ipsum', 8, NULL),
(19, 'en', 'Google', 'SMARTPHONE', 'Lorum ipsum', 4, 'Springfield'),
(20, 'en', 'Apple', 'SMARTPHONE', 'Lorum ipsum', 0, NULL),
(21, 'en', 'Samsung', 'SMARTPHONE', 'Lorum ipsum', 2, 'Chicago'),
(22, 'duitsland', 'Samsung', 'TV', 'Lorum ipsum', 1, 'Berlin'),
(23, 'duitsland', 'Apple', 'TV', 'Lorum ipsum', 1, 'Koln'),
(24, 'duitsland', 'Apple', 'PROJECTOR', 'Lorum ipsum', 7, 'Frankfurt'),
(25, 'duitsland', 'LG', 'PROJECTOR', 'Lorum ipsum', 2, NULL),
(26, 'duitsland', 'Google', 'PROJECTOR', 'Lorum ipsum', 1, NULL),
(27, 'duitsland', 'LG', 'MONITOR', 'Lorum ipsum', 9, 'Berlin'),
(28, 'duitsland', 'Apple', 'MONITOR', 'Lorum ipsum', 6, 'Koln'),
(29, 'duitsland', 'Samsung', 'SMARTPHONE', 'Lorum ipsum', 0, 'Koln'),
(30, 'unknown', 'Google', 'MONITOR', 'Lorum ipsum', 3, NULL),
(31, 'unknown', 'LG', 'MONITOR', 'Lorum ipsum', 2, NULL),
(32, 'unknown', 'Apple', 'MONITOR', 'Lorum ipsum', 1, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hrt-countries.jkinsight.nl_stocks`
--
ALTER TABLE `hrt-countries.jkinsight.nl_stocks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hrt-countries.jkinsight.nl_stocks`
--
ALTER TABLE `hrt-countries.jkinsight.nl_stocks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
