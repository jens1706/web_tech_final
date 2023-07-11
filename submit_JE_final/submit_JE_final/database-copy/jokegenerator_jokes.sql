CREATE DATABASE  IF NOT EXISTS `jokegenerator` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `jokegenerator`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: joke-generator.c4fsqngvch7c.ap-southeast-2.rds.amazonaws.com    Database: jokegenerator
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `jokes`
--

DROP TABLE IF EXISTS `jokes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jokes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `joke` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jokes`
--

LOCK TABLES `jokes` WRITE;
/*!40000 ALTER TABLE `jokes` DISABLE KEYS */;
INSERT INTO `jokes` VALUES (27,'I told my wife she should embrace her mistakes. She gave me a hug.'),(28,'Why don’t skeletons fight each other? They don’t have the guts!'),(29,'I asked my French friend if she likes to play video games. She said, \"Wii.\"'),(30,'What did one wall say to the other wall? \"I\'ll meet you at the corner.\"'),(31,'I used to be a baker, but I couldn’t make enough dough.'),(32,'I\'m reading a book about anti-gravity. It\'s impossible to put down!'),(33,'What do you call a fish wearing a crown? King Neptune.'),(34,'Why don’t scientists trust atoms? Because they make up everything!'),(35,'I\'m friends with 25 letters of the alphabet. I don\'t know why.'),(36,'Why did the scarecrow win an award? Because he was outstanding in his field!'),(37,'Why did the bicycle fall over? Because it was two-tired!'),(38,'I\'m on a seafood diet. I see food, and I eat it!'),(39,'What do you call fake spaghetti? An impasta!'),(40,'I asked the librarian if she had any books on paranoia. She whispered, \"They\'re right behind you.\"'),(41,'Why don\'t oysters donate to charity? Because they are shellfish!'),(42,'What\'s brown and sticky? A stick!'),(43,'Why did the tomato turn red? Because it saw the salad dressing!'),(44,'Why did the golfer bring two pairs of pants? In case he got a hole in one!'),(45,'Why don\'t some couples go to the gym? Because some relationships don\'t work out.'),(46,'Why don’t scientists trust atoms? Because they make up everything!'),(47,'Why don\'t skeletons fight each other? They don\'t have the guts!'),(48,'Why don’t oysters donate to charity? Because they are shellfish!'),(49,'Why don\'t some couples go to the gym? Because some relationships don\'t work out.'),(50,'What do you get when you cross a snowman and a vampire? Frostbite!'),(51,'I used to play piano by ear, but now I use my hands.'),(52,'Why don\'t scientists trust atoms? Because they make up everything!'),(53,'Why did the scarecrow win an award? Because he was outstanding in his field!'),(54,'Why did the bicycle fall over? Because it was two-tired!'),(55,'I\'m on a seafood diet. I see food, and I eat it!'),(56,'What do you call fake spaghetti? An impasta!'),(57,'I asked the librarian if she had any books on paranoia. She whispered, \"They\'re right behind you.\"'),(58,'What\'s brown and sticky? A stick!'),(59,'Why did the tomato turn red? Because it saw the salad dressing!'),(60,'Why did the golfer bring two pairs of pants? In case he got a hole in one!'),(61,'Why don\'t some couples go to the gym? Because some relationships don\'t work out.'),(62,'Why don’t scientists trust atoms? Because they make up everything!'),(63,'Why don\'t skeletons fight each other? They don\'t have the guts!'),(64,'Why don’t oysters donate to charity? Because they are shellfish!'),(65,'Why don\'t some couples go to the gym? Because some relationships don\'t work out.'),(66,'What do you get when you cross a snowman and a vampire? Frostbite!'),(67,'I used to play piano by ear, but now I use my hands.'),(68,'Why don\'t scientists trust atoms? Because they make up everything!'),(69,'Why did the scarecrow win an award? Because he was outstanding in his field!'),(70,'Why did the bicycle fall over? Because it was two-tired!'),(71,'I\'m on a seafood diet. I see food, and I eat it!'),(72,'What do you call fake spaghetti? An impasta!'),(73,'I asked the librarian if she had any books on paranoia. She whispered, \"They\'re right behind you.\"'),(74,'What\'s brown and sticky? A stick!'),(75,'Why did the tomato turn red? Because it saw the salad dressing!'),(76,'Why did the golfer bring two pairs of pants? In case he got a hole in one!'),(77,'Why don\'t some couples go to the gym? Because some relationships don\'t work out.'),(78,'Why don’t scientists trust atoms? Because they make up everything!'),(79,'Why don\'t skeletons fight each other? They don\'t have the guts!'),(80,'Why don’t oysters donate to charity? Because they are shellfish!'),(81,'Why don\'t some couples go to the gym? Because some relationships don\'t work out.'),(82,'What do you get when you cross a snowman and a vampire? Frostbite!'),(83,'I used to play piano by ear, but now I use my hands.'),(84,'Why don\'t scientists trust atoms? Because they make up everything!'),(85,'Why did the scarecrow win an award? Because he was outstanding in his field!'),(86,'Why did the bicycle fall over? Because it was two-tired!'),(87,'I\'m on a seafood diet. I see food, and I eat it!'),(88,'What do you call fake spaghetti? An impasta!'),(89,'I asked the librarian if she had any books on paranoia. She whispered, \"They\'re right behind you.\"'),(90,'What\'s brown and sticky? A stick!'),(91,'Why did the tomato turn red? Because it saw the salad dressing!'),(92,'Why did the golfer bring two pairs of pants? In case he got a hole in one!'),(93,'Why don\'t some couples go to the gym? Because some relationships don\'t work out.'),(94,'What do you get when you cross a snowman and a vampire? Frostbite!'),(95,'I used to play piano by ear, but now I use my hands.'),(96,'Why don\'t scientists trust atoms? Because they make up everything!'),(97,'Why did the scarecrow win an award? Because he was outstanding in his field!'),(98,'Why did the bicycle fall over? Because it was two-tired!'),(99,'I\'m on a seafood diet. I see food, and I eat it!'),(100,'What do you call fake spaghetti? An impasta!'),(101,'I asked the librarian if she had any books on paranoia. She whispered, \"They\'re right behind you.\"'),(102,'What\'s brown and sticky? A stick!'),(103,'Why did the tomato turn red? Because it saw the salad dressing!'),(104,'Why did the golfer bring two pairs of pants? In case he got a hole in one!'),(105,'Why don\'t some couples go to the gym? Because some relationships don\'t work out.'),(106,'Why did the scarecrow win an award? Because he was outstanding in his field!'),(107,'Why did the bicycle fall over? Because it was two-tired!'),(108,'I\'m on a seafood diet. I see food, and I eat it!'),(109,'What do you call fake spaghetti? An impasta!'),(110,'I asked the librarian if she had any books on paranoia. She whispered, \"They\'re right behind you.\"'),(111,'What\'s brown and sticky? A stick!'),(112,'Why did the tomato turn red? Because it saw the salad dressing!'),(113,'Why did the golfer bring two pairs of pants? In case he got a hole in one!'),(114,'Why don\'t some couples go to the gym? Because some relationships don\'t work out.'),(115,'What do you get when you cross a snowman and a vampire? Frostbite!'),(116,'I used to play piano by ear, but now I use my hands.'),(117,'Why don\'t scientists trust atoms? Because they make up everything!'),(118,'Why did the scarecrow win an award? Because he was outstanding in his field!'),(119,'Why did the bicycle fall over? Because it was two-tired!'),(120,'I\'m on a seafood diet. I see food, and I eat it!'),(121,'What do you call fake spaghetti? An impasta!'),(122,'I asked the librarian if she had any books on paranoia. She whispered, \"They\'re right behind you.\"'),(123,'What\'s brown and sticky? A stick!'),(124,'Why did the tomato turn red? Because it saw the salad dressing!'),(125,'Why did the golfer bring two pairs of pants? In case he got a hole in one!'),(126,'Why don\'t some couples go to the gym? Because some relationships don\'t work out.'),(127,'What do you get when you cross a snowman and a vampire? Frostbite!'),(128,'I used to play piano by ear, but now I use my hands.'),(129,'Why don\'t scientists trust atoms? Because they make up everything!'),(130,'Why did the scarecrow win an award? Because he was outstanding in his field!'),(131,'Why did the bicycle fall over? Because it was two-tired!'),(132,'Why don\'t scientists trust atoms? Because they make up everything!'),(133,'Was ist unter der Erde und stinkt? Eine Furzel!');
/*!40000 ALTER TABLE `jokes` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-28 10:32:45
