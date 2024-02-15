-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: react_database
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `success` tinyint(1) NOT NULL,
  `message_context` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,'Sajeel','LOGIN','2024-01-23 05:34:03',1,'userSignIn'),(2,'Sajeel','OTP','2024-01-23 05:34:06',1,'OTPlogin'),(3,'Sajeel','OTP','2024-01-23 05:34:58',1,'OTPverified'),(4,'Sajeel','LOGIN','2024-01-23 05:37:11',1,'userSignIn'),(5,'Sajeel','OTP','2024-01-23 05:37:14',1,'OTPlogin'),(6,'Sajeel','OTP','2024-01-23 05:37:19',0,'OTPverified'),(7,'Sajeel','OTP','2024-01-23 05:37:44',1,'OTPverified'),(8,'Sajeel','LOGIN','2024-01-23 06:11:35',1,'userSignIn'),(9,'Sajeel','OTP','2024-01-23 06:11:37',1,'OTPlogin'),(10,'Sajeel','OTP','2024-01-23 06:11:58',1,'OTPverified'),(11,'Sajeel','LOGIN','2024-01-23 06:15:25',0,'userSignIn'),(12,'Sajeel','LOGIN','2024-01-23 06:15:28',1,'userSignIn'),(13,'Sajeel','OTP','2024-01-23 06:15:30',1,'OTPlogin'),(14,'Sajeel','OTP','2024-01-23 06:15:47',1,'OTPverified'),(15,'Sajeel','LOGIN','2024-01-23 06:20:03',1,'userSignIn'),(16,'Sajeel','OTP','2024-01-23 06:20:04',1,'OTPlogin'),(17,'Sajeel','OTP','2024-01-23 06:20:16',1,'OTPverified'),(18,'Sajeel','LOGIN','2024-01-23 06:34:32',0,'userSignIn'),(19,'Sajeel','LOGIN','2024-01-23 06:34:35',1,'userSignIn'),(20,'Sajeel','OTP','2024-01-23 06:34:36',1,'OTPlogin'),(21,'Sajeel','OTP','2024-01-23 06:34:53',1,'OTPverified'),(22,'Sajeel','LOGIN','2024-01-23 06:49:28',1,'userSignIn'),(23,'Sajeel','OTP','2024-01-23 06:49:49',1,'OTPlogin'),(24,'Sajeel','OTP','2024-01-23 06:50:04',1,'OTPverified'),(25,'Sajeel','LOGIN','2024-01-23 07:00:00',1,'userSignIn'),(26,'Sajeel','OTP','2024-01-23 07:00:02',1,'OTPlogin'),(27,'Sajeel','OTP','2024-01-23 07:00:17',1,'OTPverified'),(28,'Sajeel','LOGIN','2024-01-23 07:06:23',1,'userSignIn'),(29,'Sajeel','OTP','2024-01-23 07:06:25',1,'OTPlogin'),(30,'Sajeel','OTP','2024-01-23 07:06:41',1,'OTPverified'),(31,'Sajeel','LOGIN','2024-01-23 07:11:25',1,'userSignIn'),(32,'Sajeel','OTP','2024-01-23 07:11:26',1,'OTPlogin'),(33,'Sajeel','OTP','2024-01-23 07:11:39',1,'OTPverified'),(34,'Sajeel','LOGIN','2024-01-23 07:14:06',1,'userSignIn'),(35,'Sajeel','OTP','2024-01-23 07:14:08',1,'OTPlogin'),(36,'Sajeel','OTP','2024-01-23 07:14:18',1,'OTPverified'),(37,'Sajeel','LOGIN','2024-01-23 07:15:46',1,'userSignIn'),(38,'Sajeel','OTP','2024-01-23 07:15:47',1,'OTPlogin'),(39,'Sajeel','OTP','2024-01-23 07:16:02',1,'OTPverified'),(40,'Sajeel','LOGIN','2024-01-23 07:24:18',0,'userSignIn'),(41,'Sajeel','LOGIN','2024-01-23 07:24:22',1,'userSignIn'),(42,'Sajeel','OTP','2024-01-23 07:24:24',1,'OTPlogin'),(43,'Sajeel','OTP','2024-01-23 07:24:41',1,'OTPverified'),(44,'Sajeel','LOGIN','2024-01-23 07:28:25',1,'userSignIn'),(45,'Sajeel','OTP','2024-01-23 07:28:26',1,'OTPlogin'),(46,'Sajeel','OTP','2024-01-23 07:28:38',1,'OTPverified'),(47,'Sajeel','LOGIN','2024-01-23 07:38:33',1,'userSignIn'),(48,'Sajeel','OTP','2024-01-23 07:38:34',1,'OTPlogin'),(49,'Sajeel','OTP','2024-01-23 07:38:45',1,'OTPverified'),(50,'Sajeel','LOGIN','2024-01-23 07:39:03',1,'userSignIn'),(51,'Sajeel','OTP','2024-01-23 07:39:13',1,'OTPlogin'),(52,'Sajeel','OTP','2024-01-23 07:39:23',1,'OTPverified'),(53,'Sajeel','LOGIN','2024-01-23 12:17:51',1,'userSignIn'),(54,'Sajeel','OTP','2024-01-23 12:17:53',1,'OTPlogin'),(55,'Sajeel','OTP','2024-01-23 12:18:07',1,'OTPverified'),(56,'Sajeel','LOGIN','2024-01-23 20:22:06',1,'userSignIn'),(57,'Sajeel','OTP','2024-01-23 20:22:07',1,'OTPlogin'),(58,'Sajeel','OTP','2024-01-23 20:22:21',1,'OTPverified'),(59,'Sajeel','LOGIN','2024-01-24 10:34:28',0,'userSignIn'),(60,'Sajeel','LOGIN','2024-01-24 10:34:31',1,'userSignIn'),(61,'Sajeel','OTP','2024-01-24 10:34:43',1,'OTPlogin'),(62,'Sajeel','OTP','2024-01-24 10:34:54',1,'OTPverified'),(63,'Sajeel','LOGIN','2024-01-24 11:01:12',0,'userSignIn'),(64,'Sajeel','LOGIN','2024-01-24 11:01:18',1,'userSignIn'),(65,'Sajeel','OTP','2024-01-24 11:01:20',1,'OTPlogin'),(66,'Sajeel','OTP','2024-01-24 11:01:31',1,'OTPverified'),(67,'Sajeel','BillProcessing','2024-01-24 11:40:56',1,'billUpload'),(68,'Sajeel','BillProcessing','2024-01-24 11:53:51',0,'billUpload'),(69,'Sajeel','Partner','2024-01-24 12:13:10',1,'dataAdd'),(70,'Sajeel','Partner','2024-01-24 12:13:53',1,'dataAdd'),(71,'Sajeel','Partner','2024-01-24 12:15:51',1,'dataAdd'),(72,'Sajeel','Partner','2024-01-24 12:22:20',1,'dataAdd'),(73,'Sajeel','Partner','2024-01-24 12:25:51',1,'dataAdd'),(74,'Sajeel','Partner','2024-01-24 12:42:16',1,'dataAdd'),(75,'Sajeel','Partner','2024-01-24 13:00:13',0,'dataAdd'),(76,'Sajeel','BillProcessing','2024-01-24 13:12:23',1,'billUpload'),(77,'Sajeel','Partner','2024-01-24 13:35:05',1,'dataAdd'),(78,'Sajeel','BillProcessing','2024-01-24 13:44:47',0,'billUpload'),(79,'Sajeel','BillProcessing','2024-01-24 13:44:52',0,'billUpload'),(80,'Sajeel','BillProcessing','2024-01-24 13:44:56',1,'billUpload'),(81,'Sajeel','Partner','2024-01-24 13:51:46',1,'dataUpdated'),(82,'Sajeel','Partner','2024-01-24 13:52:00',1,'dataDelete'),(83,'Sajeel','LOGIN','2024-01-25 11:54:20',1,'userSignIn'),(84,'Sajeel','OTP','2024-01-25 11:54:21',1,'OTPlogin'),(85,'Sajeel','OTP','2024-01-25 11:54:39',1,'OTPverified'),(86,'Sajeel','LOGIN','2024-01-25 12:06:27',0,'userSignIn'),(87,'Sajeel','LOGIN','2024-01-25 12:06:30',1,'userSignIn'),(88,'Sajeel','OTP','2024-01-25 12:06:48',1,'OTPlogin'),(89,'Sajeel','OTP','2024-01-25 12:07:19',1,'OTPverified'),(90,'Sajeel','BillProcessing','2024-01-25 12:09:28',1,'billUpload'),(91,'Sajeel','BillProcessing','2024-01-25 12:14:48',1,'billUpload'),(92,'Sajeel','Partner','2024-01-25 12:26:55',1,'dataAdd'),(93,'Sajeel','Partner','2024-01-25 12:27:26',1,'dataUpdated'),(94,'Sajeel','BillProcessing','2024-01-25 12:35:21',1,'billDownload'),(95,'Sajeel','BillProcessing','2024-01-25 12:38:21',0,'billUpload'),(96,'Sajeel','Partner','2024-01-25 12:39:31',1,'dataUpdated'),(97,'faizan','LOGIN','2024-01-25 12:44:42',1,'userSignIn'),(98,'faizan','OTP','2024-01-25 12:44:45',1,'OTPlogin'),(99,'faizan','OTP','2024-01-25 12:44:59',1,'OTPverified'),(100,'Sajeel','LOGIN','2024-01-25 12:47:05',0,'userSignIn'),(101,'Sajeel','LOGIN','2024-01-25 12:47:08',1,'userSignIn'),(102,'Sajeel','OTP','2024-01-25 12:47:09',1,'OTPlogin'),(103,'Sajeel','OTP','2024-01-25 12:47:22',1,'OTPverified'),(104,'Sajeel','BillProcessing','2024-01-27 15:20:21',1,'billUpload'),(105,'Sajeel','Partner','2024-01-27 15:32:39',1,'dataUpdated'),(106,'Sajeel','Partner','2024-01-27 15:50:39',1,'dataUpdated'),(107,'Sajeel','LOGIN','2024-01-27 16:47:59',0,'userSignIn'),(108,'Sajeel','LOGIN','2024-01-27 16:48:01',1,'userSignIn'),(109,'Sajeel','OTP','2024-01-27 16:48:21',1,'OTPlogin'),(110,'Sajeel','OTP','2024-01-27 16:48:33',1,'OTPverified'),(111,'Sajeel','BillProcessing','2024-01-27 20:30:14',1,'billUpload'),(112,'Sajeel','BillProcessing','2024-01-27 20:40:07',1,'billUpload'),(113,'Sajeel','BillProcessing','2024-01-27 20:41:30',1,'billUpload'),(114,'Sajeel','BillProcessing','2024-01-27 20:42:24',1,'billUpload'),(115,'Sajeel','BillProcessing','2024-01-27 20:42:52',1,'billUpload'),(116,'Sajeel','BillProcessing','2024-01-27 20:46:58',1,'billUpload'),(117,'Sajeel','BillProcessing','2024-01-27 20:57:26',1,'billUpload'),(118,'Sajeel','BillProcessing','2024-01-27 21:10:36',1,'billUpload'),(119,'Sajeel','LOGIN','2024-01-28 13:02:16',1,'userSignIn'),(120,'Sajeel','OTP','2024-01-28 13:02:17',1,'OTPlogin'),(121,'Sajeel','OTP','2024-01-28 13:02:50',1,'OTPverified'),(122,'Sajeel','BillProcessing','2024-01-28 23:15:39',1,'billUpload');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_processing_import`
--

DROP TABLE IF EXISTS `bill_processing_import`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_processing_import` (
  `id` int NOT NULL AUTO_INCREMENT,
  `CONSUMER_NO` varchar(24) DEFAULT NULL,
  `NAME_OF_CONSUMER` varchar(30) DEFAULT NULL,
  `BILLING_MONTH` varchar(6) DEFAULT NULL,
  `AMOUNT_BEFORE_DUE_DATE` decimal(13,2) DEFAULT NULL,
  `AMOUNT_AFTER_DUE_DATE` decimal(13,2) DEFAULT NULL,
  `DUE_DATE` date DEFAULT NULL,
  `COMPANY_CODE` int DEFAULT NULL,
  `COMPANY_NAME` varchar(100) DEFAULT NULL,
  `STATUS` char(1) NOT NULL DEFAULT 'U',
  PRIMARY KEY (`id`),
  CONSTRAINT `bill_processing_import_chk_1` CHECK ((`STATUS` in (_cp850'U',_cp850'P')))
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_processing_import`
--

LOCK TABLES `bill_processing_import` WRITE;
/*!40000 ALTER TABLE `bill_processing_import` DISABLE KEYS */;
INSERT INTO `bill_processing_import` VALUES (1,'A99SG0094','DIAMOND TEXTILE','202308',24170400.00,24196100.00,'2023-08-23',1,'ABCD Corp','U'),(2,'A99SG0029','SAJID REHMAN DYING','202308',1825900.00,1971800.00,'2023-08-23',1,'ABCD Corp','U'),(3,'A99SD0044','SAEED FABRICS','202308',6568100.00,7093400.00,'2023-08-23',1,'ABCD Corp','U'),(4,'A99SG0124','NEW MASTER INDUSTRIES','202308',3285000.00,3547600.00,'2023-08-23',1,'ABCD Corp','U'),(5,'A99S00204','AL-MUMTAZ DYING','202308',14454600.00,14454600.00,'2023-08-23',1,'ABCD Corp','U'),(6,'A99SH0107','CRESCENT TEXTILE MILLS','202308',40419800.00,43653200.00,'2023-08-23',1,'ABCD Corp','U'),(7,'A99SD0041','HABIB FABRICS TABLE PRINT','202308',315300.00,343400.00,'2023-08-23',1,'ABCD Corp','U'),(8,'A99SH0319','M/S SULEMAN FABRICS','202308',36470400.00,36470400.00,'2023-08-23',1,'ABCD Corp','U'),(9,'A99SH0106','NISHAT TEXTILE MILLS','202308',20940500.00,22615600.00,'2023-08-23',1,'ABCD Corp','U'),(10,'A99SG0097','INSAF TEXTILE PRINTING','202308',6568100.00,7093400.00,'2023-08-23',1,'ABCD Corp','U'),(11,'A99SG0031','GOLDEN FACILITIES CENTRE','202308',4963000.00,5359900.00,'2023-08-23',1,'ABCD Corp','U'),(12,'A99SG0025','AL-HAMERA TEXTILE INDUSTRIES','202308',2930000.00,3128200.00,'2023-08-23',1,'ABCD Corp','U'),(13,'A99SG0077','A.R.INDUSTRIES','202308',308400.00,332900.00,'2023-08-23',1,'ABCD Corp','U'),(14,'A99SG0001','HILAL CORPORATION','202308',63474000.00,64057700.00,'2023-08-23',1,'ABCD Corp','U'),(15,'A99SD0039','GHOUSIA BLEACHING PLANT','202308',804500.00,868700.00,'2023-08-23',1,'ABCD Corp','U'),(16,'A99SF0075','AL-KAREEM TEXTILE IND.(PVT)LTD','202308',7297600.00,7881300.00,'2023-08-23',1,'ABCD Corp','U'),(17,'A99SF0195','FAZAL DYING','202308',1825900.00,1971800.00,'2023-08-23',1,'ABCD Corp','U'),(18,'AQFS00056','ITTEFAQ FLOUR MILLS','202308',1297200.00,1297200.00,'2023-08-23',1,'ABCD Corp','U'),(19,'A99SG0100','AL-HABIB DYING','202308',3285000.00,3547600.00,'2023-08-23',1,'ABCD Corp','U'),(20,'A99SF0191','IMRAN DYING','202308',1825900.00,1971800.00,'2023-08-23',1,'ABCD Corp','U'),(21,'A99SG0095','ZAM ZAM TEXTILE INDUSTRIES','202308',3394500.00,3665900.00,'2023-08-23',1,'ABCD Corp','U'),(22,'A99SF0189','AKRAM JALLAL DYING','202308',1607000.00,1735400.00,'2023-08-23',1,'ABCD Corp','U'),(23,'A99S00023','AL-NOOR FABRICS','202308',6174200.00,6582800.00,'2023-08-23',1,'ABCD Corp','U'),(24,'A99SD0045','M.A TEXTILE PRIVAITE LTD','202308',4963000.00,5359900.00,'2023-08-23',1,'ABCD Corp','U'),(25,'A99SG0049','AL-FARDOUS PROCESSING','202308',889500.00,924500.00,'2023-08-23',1,'ABCD Corp','U'),(26,'A99SG0032','SAYYED DYING','202308',8246000.00,8905500.00,'2023-08-23',1,'ABCD Corp','U'),(27,'A99SG0028','NEW IQBAL FABRICS','202308',62166600.00,62429200.00,'2023-08-23',1,'ABCD Corp','U'),(28,'A99SG0200','REHMAN FARID FABRICS PVT. LTD.','202308',5984400.00,6130300.00,'2023-08-23',1,'ABCD Corp','U'),(29,'A99SF0317','AHMED TEXTILE PROCESSING','202308',1825900.00,1971800.00,'2023-08-23',1,'ABCD Corp','U'),(30,'A99S00074','MUHAMMAD JAVED (GODAM)','202308',339500.00,369500.00,'2023-08-23',1,'ABCD Corp','U'),(31,'A99SH0320','AISA TEXTILE PROCESSING','202308',4963000.00,5359900.00,'2023-08-23',1,'ABCD Corp','U'),(32,'A99SF0193','MUZAMMAL DYING','202308',804500.00,868700.00,'2023-08-23',1,'ABCD Corp','U'),(33,'A99SD0087','M.S. RAFIQUE PROCESSING','202308',76106500.00,76369100.00,'2023-08-23',1,'ABCD Corp','U'),(34,'A99SG0047','NEW-AL-GHAFOOR TEXTILE INDUS.','202308',914000.00,987000.00,'2023-08-23',1,'ABCD Corp','U'),(35,'A99SG0010','ZAM ZAM TEXTILE INDUSTRIES','202308',1825900.00,1971800.00,'2023-08-23',1,'ABCD Corp','U'),(36,'A99SD0040','HABIB FABRICS','202308',833800.00,842600.00,'2023-08-23',1,'ABCD Corp','U'),(37,'A99S00071','AL-FARID DYING','202308',16543200.00,16543200.00,'2023-08-23',1,'ABCD Corp','U'),(38,'A99SG0123','BISMILLAH DYING WORKS','202308',8246000.00,8905500.00,'2023-08-23',1,'ABCD Corp','U'),(39,'A99S00108','M/S ALI PROSECESSING WORKS','202308',32120700.00,32120700.00,'2023-08-23',1,'ABCD Corp','U'),(40,'A99SG0093','AMIR BILAL TEXTILE INDUSTRIES','202308',3285000.00,3547600.00,'2023-08-23',1,'ABCD Corp','U'),(41,'A99SG0199','M/S MIAN FABRCIS PVT. LIMITED','202308',3769400.00,3778200.00,'2023-08-23',1,'ABCD Corp','U'),(42,'A99SD0212','ZAFAR FABRICS PVT(LTD)','202308',3285000.00,3547600.00,'2023-08-23',1,'ABCD Corp','U'),(43,'A99SD0076','NOOR FATIMA TEXTILE PROCS. IND','202308',89861600.00,90521100.00,'2023-08-23',1,'ABCD Corp','U'),(44,'A99SG0120','AALA PROCESSING INDUSTRIES','202308',7516500.00,8117700.00,'2023-08-23',1,'ABCD Corp','U'),(45,'A99SD0038','JUBBLY LAWN','202308',1825900.00,1971800.00,'2023-08-23',1,'ABCD Corp','U'),(46,'A99SG0110','MUHAMMADI DYING','202308',5109000.00,5517600.00,'2023-08-23',1,'ABCD Corp','U'),(47,'A99SG0119','JEHLUM FABRICS','202308',5291400.00,5714600.00,'2023-08-23',1,'ABCD Corp','U'),(48,'A99SH0080','CHENAB STITCHING UNIT','202308',4989500.00,5388500.00,'2023-08-23',1,'ABCD Corp','U'),(49,'A99S00130','AL RIAZ DYING','202308',82557100.00,82557100.00,'2023-08-23',1,'ABCD Corp','U'),(50,'A99SD0035','NATIONAL SILK & RAYON MILLS','202308',20065000.00,21670000.00,'2023-08-23',1,'ABCD Corp','U'),(51,'A99SG0282','SAKHAWAT INDUSTRIES','202308',3649900.00,3941700.00,'2023-08-23',1,'ABCD Corp','U'),(52,'A99SG0002','KHAIBAR TEXTILE INDUSTRIES','202308',3285000.00,3547600.00,'2023-08-23',1,'ABCD Corp','U'),(53,'A99SG0135','CHAUDHRY PROCESSING','202308',6568100.00,7093400.00,'2023-08-23',1,'ABCD Corp','U'),(54,'A99SG0216','AL-HABIB FABRICS/MUJAHID TXTLE','202308',1825900.00,1971800.00,'2023-08-23',1,'ABCD Corp','U'),(55,'A99SF0210','SHUAIB USMAN TEXTILE','202308',752000.00,812000.00,'2023-08-23',1,'ABCD Corp','U'),(56,'A99SD0037','AL-JILLANI BLEACHING PLANT','202308',8100100.00,8748000.00,'2023-08-23',1,'ABCD Corp','U'),(57,'A99SG0009','SAKHI PROCESSING MILLS','202308',804500.00,868700.00,'2023-08-23',1,'ABCD Corp','U');
/*!40000 ALTER TABLE `bill_processing_import` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fileuploaddetail`
--

DROP TABLE IF EXISTS `fileuploaddetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fileuploaddetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `size_bytes` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `upload_dateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fileuploaddetail`
--

LOCK TABLES `fileuploaddetail` WRITE;
/*!40000 ALTER TABLE `fileuploaddetail` DISABLE KEYS */;
INSERT INTO `fileuploaddetail` VALUES (1,'Biller Sample File.csv','text/csv',4663,NULL,NULL,'2024-01-04 16:15:17'),(2,'Biller Sample File.csv','text/csv',4663,3,'Sajeel','2024-01-04 16:18:17'),(3,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-04 16:40:49'),(4,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-15 10:52:23'),(5,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 11:29:39'),(6,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:06:56'),(7,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:25:08'),(8,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:25:35'),(9,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:33:21'),(10,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:38:12'),(11,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:39:28'),(12,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:40:37'),(13,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:41:37'),(14,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:51:11'),(15,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:52:28'),(16,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:54:31'),(17,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:55:03'),(18,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 15:56:06'),(19,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 16:07:11'),(20,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 16:10:51'),(21,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 16:35:18'),(22,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 16:39:22'),(23,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 16:41:15'),(24,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 16:45:39'),(25,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 16:46:07'),(26,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 16:46:36'),(27,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 16:48:33'),(28,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-18 17:09:35'),(29,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-24 06:40:56'),(30,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-24 08:12:23'),(31,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-24 08:44:56'),(32,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-25 07:09:28'),(33,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-25 07:14:48'),(34,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-27 10:20:21'),(35,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-27 15:30:14'),(36,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-27 15:40:07'),(37,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-27 15:41:30'),(38,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-27 15:42:24'),(39,'Biller Sample File.csv','text/csv',3862,3,'Sajeel','2024-01-27 15:42:52'),(40,'Biller Sample File.csv','text/csv',3911,3,'Sajeel','2024-01-27 15:46:58'),(41,'Biller Sample File.csv','text/csv',3911,3,'Sajeel','2024-01-27 15:57:26'),(42,'Biller Sample File.csv','text/csv',3911,3,'Sajeel','2024-01-27 16:10:36'),(43,'Biller Sample File.csv','text/csv',3911,3,'Sajeel','2024-01-28 18:15:39');
/*!40000 ALTER TABLE `fileuploaddetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otps`
--

DROP TABLE IF EXISTS `otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sms_otp` varchar(6) NOT NULL,
  `email_otp` varchar(6) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `expiration_time` datetime DEFAULT NULL,
  `verified` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otps`
--

LOCK TABLES `otps` WRITE;
/*!40000 ALTER TABLE `otps` DISABLE KEYS */;
INSERT INTO `otps` VALUES (1,'njo9oj','eh4es5','2023-12-18 11:44:54','2023-12-18 11:46:54',0),(2,'pv7g1r','y91tea','2024-01-02 16:44:29','2024-01-02 16:46:30',0),(3,'xdu2rk','6ta1li','2024-01-03 11:23:39','2024-01-03 11:25:39',1),(4,'br6try','ccev42','2024-01-03 11:28:43','2024-01-03 11:30:44',1),(5,'4tr94x','8zpqww','2024-01-03 11:34:07','2024-01-03 11:36:07',1),(6,'d6ggus','iv25tl','2024-01-03 11:51:04','2024-01-03 11:53:04',1),(7,'ql4817','i6ixpz','2024-01-03 11:56:37','2024-01-03 11:58:38',1),(8,'aeys9k','q0c33k','2024-01-03 12:05:52','2024-01-03 12:07:53',1),(9,'kjeyno','yrf6vm','2024-01-03 12:14:58','2024-01-03 12:16:58',1),(10,'ruoi01','6lnckc','2024-01-03 12:22:12','2024-01-03 12:24:13',1),(11,'rzncb5','xdx1bp','2024-01-03 16:21:34','2024-01-03 16:23:35',1),(12,'jfu7ee','sx8uw3','2024-01-03 16:27:59','2024-01-03 16:30:00',1),(13,'kfsla2','cx2b7t','2024-01-03 16:50:00','2024-01-03 16:52:01',1),(14,'yqi9ft','gvk68a','2024-01-03 17:26:31','2024-01-03 17:28:31',1),(15,'eswyww','b28wb4','2024-01-03 17:27:38','2024-01-03 17:29:38',1),(16,'ndykom','e99sc9','2024-01-03 17:56:08','2024-01-03 17:58:08',1),(17,'r4nlwg','byr712','2024-01-03 18:08:56','2024-01-03 18:10:56',1),(18,'rdq6kg','my71mo','2024-01-03 18:13:55','2024-01-03 18:15:55',1),(19,'hes46y','mq1vxq','2024-01-03 18:30:59','2024-01-03 18:32:59',1),(20,'n9eytl','q1c9vy','2024-01-03 18:35:16','2024-01-03 18:37:16',1),(21,'3sff4q','quutbz','2024-01-03 19:30:19','2024-01-03 19:32:20',1),(22,'w38sql','jj1h2c','2024-01-03 20:56:36','2024-01-03 20:58:36',1),(23,'wfdt4s','l9nd4j','2024-01-04 11:06:48','2024-01-04 11:08:49',1),(24,'r3k8fk','epkxdz','2024-01-04 11:47:42','2024-01-04 11:49:42',1),(25,'fvs764','azfzo2','2024-01-04 14:29:40','2024-01-04 14:31:41',1),(26,'r99nym','4x4zjn','2024-01-04 21:12:39','2024-01-04 21:14:40',1),(27,'v3cnd2','bidi9p','2024-01-11 11:07:22','2024-01-11 11:09:22',1),(28,'8fcotz','boafak','2024-01-15 15:50:41','2024-01-15 15:52:41',1),(29,'qlnqns','5oqu9c','2024-01-16 12:44:05','2024-01-16 12:46:06',1),(30,'u303es','9qrmia','2024-01-16 14:31:27','2024-01-16 14:33:28',1),(31,'y6uyka','fqkyaf','2024-01-16 16:10:45','2024-01-16 16:12:46',1),(32,'fhmi38','3kzeqc','2024-01-16 16:15:33','2024-01-16 16:17:33',1),(33,'dl5r2k','cki2mc','2024-01-16 16:21:39','2024-01-16 16:23:39',1),(34,'f4fc1w','z9ycis','2024-01-16 16:30:42','2024-01-16 16:32:43',1),(35,'qnflzw','fs4293','2024-01-16 16:32:33','2024-01-16 16:34:34',1),(36,'439uss','uhrgd9','2024-01-16 16:40:04','2024-01-16 16:42:05',1),(37,'wop801','cybvep','2024-01-16 21:18:04','2024-01-16 21:20:04',1),(38,'d0esqc','eo5ckk','2024-01-16 21:38:00','2024-01-16 21:40:01',1),(39,'t64r20','1a4kgk','2024-01-16 21:44:33','2024-01-16 21:46:34',1),(40,'78yplb','b1n2nq','2024-01-16 21:47:59','2024-01-16 21:50:00',1),(41,'mv79yp','1ihj2t','2024-01-16 21:48:48','2024-01-16 21:50:49',1),(42,'5c1ws5','6m6yid','2024-01-18 15:12:52','2024-01-18 15:14:52',1),(43,'qh8p0z','ac3x8t','2024-01-18 15:32:54','2024-01-18 15:34:54',1),(44,'j4pcof','1tgzyx','2024-01-18 15:36:55','2024-01-18 15:38:55',1),(45,'tjuqmi','ni27al','2024-01-18 22:09:02','2024-01-18 22:11:02',1),(46,'odg5yi','ld1t4w','2024-01-18 22:15:21','2024-01-18 22:17:22',1),(47,'r7h0b9','60f0e0','2024-01-22 20:42:26','2024-01-22 20:44:27',1),(48,'7p0m4b','f6m608','2024-01-23 05:13:06','2024-01-23 05:15:06',0),(49,'dy15yt','bcuzz4','2024-01-23 05:28:59','2024-01-23 05:31:00',0),(50,'1qt216','hquzb2','2024-01-23 05:34:06','2024-01-23 05:36:06',1),(51,'6slfqg','fgj0pi','2024-01-23 05:37:14','2024-01-23 05:39:15',1),(52,'cmn7fq','f1hmsk','2024-01-23 06:11:37','2024-01-23 06:13:37',1),(53,'8kp456','nkfhfu','2024-01-23 06:15:30','2024-01-23 06:17:30',1),(54,'ifhx79','9gzc3u','2024-01-23 06:20:04','2024-01-23 06:22:04',1),(55,'hu449c','9mltwr','2024-01-23 06:34:36','2024-01-23 06:36:37',1),(56,'4v1iqi','ulqg1v','2024-01-23 06:49:48','2024-01-23 06:51:49',1),(57,'4axeqh','5dx716','2024-01-23 07:00:01','2024-01-23 07:02:02',1),(58,'6i1pur','i4wwcc','2024-01-23 07:06:25','2024-01-23 07:08:25',1),(59,'591vqb','vdgodt','2024-01-23 07:11:26','2024-01-23 07:13:26',1),(60,'sftd17','65h1ly','2024-01-23 07:14:08','2024-01-23 07:16:09',1),(61,'lkn8gt','tdrm3l','2024-01-23 07:15:47','2024-01-23 07:17:48',1),(62,'b59b00','7ixhrg','2024-01-23 07:24:24','2024-01-23 07:26:24',1),(63,'myb7w7','jlg3eq','2024-01-23 07:28:26','2024-01-23 07:30:27',1),(64,'uanmks','9izvjq','2024-01-23 07:38:34','2024-01-23 07:40:34',1),(65,'fjnyh9','9k5gid','2024-01-23 07:39:13','2024-01-23 07:41:13',1),(66,'v31hrp','1ai8ay','2024-01-23 12:17:53','2024-01-23 12:19:53',1),(67,'50n0lo','y1gdpi','2024-01-23 20:22:07','2024-01-23 20:24:08',1),(68,'bospg0','2del34','2024-01-24 10:34:43','2024-01-24 10:36:44',1),(69,'mxvncu','wqdln6','2024-01-24 11:01:19','2024-01-24 11:03:20',1),(70,'m7m5z7','kud272','2024-01-25 11:54:21','2024-01-25 11:56:22',1),(71,'nsx0k0','wlxbco','2024-01-25 12:06:48','2024-01-25 12:08:49',1),(72,'o96wff','ytajf2','2024-01-25 12:44:45','2024-01-25 12:46:45',1),(73,'otchkv','i20f2v','2024-01-25 12:47:09','2024-01-25 12:49:10',1),(74,'y31287','9pck5f','2024-01-27 16:48:21','2024-01-27 16:50:21',1),(75,'vic6hh','gel2es','2024-01-28 13:02:17','2024-01-28 13:04:18',1);
/*!40000 ALTER TABLE `otps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner_detail`
--

DROP TABLE IF EXISTS `partner_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partner_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_code` int DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `partial_payment` int DEFAULT NULL,
  `min_amount` int DEFAULT NULL,
  `max_amount` int DEFAULT NULL,
  `pool_account` varchar(30) DEFAULT NULL,
  `notification_template` varchar(30) DEFAULT NULL,
  `company_type` enum('Generic','NonGeneric','Offline') NOT NULL DEFAULT 'Generic',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_detail`
--

LOCK TABLES `partner_detail` WRITE;
/*!40000 ALTER TABLE `partner_detail` DISABLE KEYS */;
INSERT INTO `partner_detail` VALUES (1,1,'ABCD Corp',1,1000,50000,'Pool123','Template18','Offline'),(2,2,'XYZ Inc',0,50,200,'Pool456','Template2','Offline'),(3,3,'LMN Ltd',1,200,1000,'Pool789','Template3','Offline'),(4,4,'PQR Industries',0,150,800,'Pool987','Template4','Offline'),(5,5,'EFG Enterprises',1,300,1200,'Pool654','Template5','NonGeneric'),(8,123,'Haroon',12312,20000,50000,'ABC','ABC','Offline'),(11,3214,'feware',500,100,10000,'fdsa','fdsa','Offline');
/*!40000 ALTER TABLE `partner_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `role_datetime` datetime DEFAULT NULL,
  `createdby` varchar(255) NOT NULL,
  `permissions` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'BasicNew','2023-10-01 02:10:28','Sajeel','[\"HOME\"]'),(3,'Superadmin','2023-10-01 01:50:28','Sajeel','[\"BILL_PROCESSING\", \"PARTNER_MANAGE\", \"PERMISSION_MANAGE\", \"PROFILE\", \"HOME\", \"USER_MANAGEMENT\", \"ROLE_ASSIGNMENT\", \"AUDIT_LOGS\"]'),(5,'Basic','2024-01-25 07:44:29','Sajeel','[\"AUDIT_LOGS\", \"PARTNER_MANAGE\", \"PERMISSION_MANAGE\", \"PROFILE\", \"USER_MANAGEMENT\", \"HOME\"]');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` decimal(10,0) NOT NULL,
  `user_datetime` datetime DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Test','123123','asdf@fdsa.com',321324,'2023-12-18 06:45:12',2),(3,'Sajeel','123abc','sajeelzafar1995@gmail.com',3135918374,'2023-09-30 10:35:54',3),(4,'faizan','123456','faizan@gmail.com',3213456785,'2024-01-02 11:44:51',5);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-29 11:54:42
