-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: todolist
-- ------------------------------------------------------
-- Server version	8.0.21

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

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'teeeeext','2000-05-06','12:12:00','default.png'),(2,'teeeeext','2000-05-06','12:12:00','default.png'),(3,'teeeeext','2000-05-06','12:12:00','default.png'),(4,'teeeeext','2000-05-06','12:12:00','default.png'),(5,'teeeeext','2000-05-06','12:12:00','default.png'),(6,'teeeeext','2000-05-06','12:12:00','default.png'),(7,'teeeeext','2000-05-06','12:12:00','default.png'),(8,'teeeeext','2000-05-06','12:12:00','default.png'),(9,'teeeeext','2000-05-06','12:12:00','default.png'),(10,'teeeeext','2000-05-06','12:12:00','default.png'),(11,'teeeeext','2000-05-06','12:12:00','default.png'),(12,'teeeeext','2000-05-06','12:12:00','default.png'),(13,'teeeeext','2000-05-06','12:12:00','default.png'),(14,'teeeeext','2000-05-06','12:12:00','default.png'),(15,'teeeeext','2000-05-06','12:12:00','default.png'),(16,'teeeeext','2000-05-06','12:12:00','default.png'),(17,'teeeeext','2000-05-06','12:12:00','default.png');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_has_tag`
--

DROP TABLE IF EXISTS `article_has_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_has_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int NOT NULL,
  `tagId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_article_has_tag_tag1_idx` (`tagId`),
  KEY `fk_article_has_tag_article1_idx` (`article_id`),
  CONSTRAINT `fk_article_has_tag_article1` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`),
  CONSTRAINT `fk_article_has_tag_tag1` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_has_tag`
--

LOCK TABLES `article_has_tag` WRITE;
/*!40000 ALTER TABLE `article_has_tag` DISABLE KEYS */;
INSERT INTO `article_has_tag` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,2,1),(7,2,2),(8,2,3),(9,3,1),(10,4,1),(11,5,1),(12,6,1),(13,7,1),(14,8,2),(15,9,3),(16,9,1),(17,9,11),(18,9,9),(19,10,2),(20,10,3),(21,10,8),(22,10,6),(23,11,3),(24,11,4),(25,11,5),(26,12,5),(27,12,4),(28,12,6),(29,13,1),(30,14,2),(31,15,3),(32,16,8),(33,17,7);
/*!40000 ALTER TABLE `article_has_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'tag1'),(2,'tag2'),(3,'tag3'),(4,'tag4'),(5,'tag5'),(6,'tag6'),(7,'tag7'),(8,'tag8'),(9,'tag8'),(10,'tag10'),(11,'tag11');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `text` varchar(300) NOT NULL,
  `taskTypeId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_task_taskType_idx` (`taskTypeId`),
  CONSTRAINT `fk_task_taskType` FOREIGN KEY (`taskTypeId`) REFERENCES `tasktype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (28,'2022-01-08','01:22:00','Teeeext',1),(38,'2022-02-14','05:51:31','Teeeext',2),(44,'2022-04-21','12:08:46','Teeeext (111)',4),(48,'2022-02-15','12:28:28','test text (2000 test)',3),(56,'2022-02-16','12:45:08','HMMM',1),(57,'2022-02-15','12:24:17','highload test',4),(59,'2022-02-15','01:17:03','highload test 5!!!!!',1),(83,'2022-02-15','06:49:34','for scroll',1),(84,'2022-02-15','06:49:38','for scroll',1),(86,'2022-02-15','06:49:43','for scroll',1),(88,'2022-02-15','08:06:50','Text..',1),(98,'2022-02-17','08:42:32','Text..',1),(99,'2022-02-17','08:42:34','Text..',1),(100,'2022-02-17','08:42:36','Text..',1),(101,'2022-02-17','08:42:38','Text..',1),(102,'2022-02-17','08:43:03','Text..',1),(103,'2022-02-17','08:43:12','Text..',1),(104,'2022-02-17','08:43:20','Text..',1),(105,'2022-02-17','08:49:36','Text..',1),(106,'2022-02-17','08:50:51','Text..',1),(112,'2020-02-29','08:50:51','Text..',1),(113,'2022-03-14','17:28:05','text',1),(114,'2022-04-21','12:49:55','NEW TEXT',1),(115,'2022-04-21','12:09:02','Teeeext (111)',3);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasktype`
--

DROP TABLE IF EXISTS `tasktype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasktype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasktype`
--

LOCK TABLES `tasktype` WRITE;
/*!40000 ALTER TABLE `tasktype` DISABLE KEYS */;
INSERT INTO `tasktype` VALUES (1,'Important'),(2,'Urgent'),(3,'Not-Important'),(4,'Not-Urgent');
/*!40000 ALTER TABLE `tasktype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-22  0:59:22
