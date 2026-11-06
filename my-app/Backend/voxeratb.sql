-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2026 at 03:38 PM
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
-- Database: `voxeratb`
--

-- --------------------------------------------------------

--
-- Table structure for table `ranks`
--

CREATE TABLE `ranks` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_popular` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ranks`
--

INSERT INTO `ranks` (`id`, `name`, `slug`, `price`, `image`, `description`, `is_popular`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Sword', 'sword', 49000, '/ranks/sword.jpg', 'شروع خوب برای بازیکنایی که می‌خوان یه قدم جلوتر باشن.', 0, 1, 1, '2026-09-29 10:49:54', '2026-09-29 10:49:54'),
(2, 'Knight', 'knight', 99000, '/ranks/knight.jpg', 'دسترسی به کیت‌های اختصاصی و امکانات ویژه‌ی بیشتر.', 0, 1, 2, '2026-09-29 10:49:54', '2026-09-29 10:49:54'),
(3, 'King', 'king', 199000, '/ranks/king.jpg', 'تجربه کامل ووکسرا با بیشترین امکانات و اولویت‌ها.', 1, 1, 3, '2026-09-29 10:49:54', '2026-09-29 10:49:54'),
(4, 'Legend', 'legend', 349000, '/ranks/legend.jpg', 'بالاترین سطح دسترسی برای بازیکنای حرفه‌ای ووکسرا.', 0, 1, 4, '2026-09-29 10:49:54', '2026-09-29 10:49:54');

-- --------------------------------------------------------

--
-- Table structure for table `rank_tags`
--

CREATE TABLE `rank_tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `rank_id` int(10) UNSIGNED NOT NULL,
  `tag` varchar(100) NOT NULL,
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rank_tags`
--

INSERT INTO `rank_tags` (`id`, `rank_id`, `tag`, `sort_order`) VALUES
(1, 1, 'کیت روزانه', 1),
(2, 1, 'تگ رنکی', 2),
(3, 1, 'خانه', 3),
(4, 2, 'کیت هفتگی', 1),
(5, 2, 'رنگ نام اختصاصی', 2),
(6, 2, '/fly محدود', 3),
(7, 2, 'خانه 2', 4),
(8, 3, 'کیت روزانه ویژه', 1),
(9, 3, '/fly نامحدود', 2),
(10, 3, 'صندوقچه اختصاصی', 3),
(11, 3, 'اولویت ورود', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ranks`
--
ALTER TABLE `ranks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `rank_tags`
--
ALTER TABLE `rank_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rank_id` (`rank_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ranks`
--
ALTER TABLE `ranks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rank_tags`
--
ALTER TABLE `rank_tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rank_tags`
--
ALTER TABLE `rank_tags`
  ADD CONSTRAINT `rank_tags_ibfk_1` FOREIGN KEY (`rank_id`) REFERENCES `ranks` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
