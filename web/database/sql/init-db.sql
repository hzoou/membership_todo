-- MySQL Script generated by MySQL Workbench
-- Mon Sep 30 19:33:43 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema todo
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `todo` DEFAULT CHARACTER SET utf8 ;
USE `todo` ;

-- -----------------------------------------------------
-- Table `todo`.`USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS USER;
CREATE TABLE IF NOT EXISTS `todo`.`USER` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(45) NOT NULL,
  `pw` VARCHAR(150) NOT NULL,
  `admin` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idx`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`BOARD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS BOARD;
CREATE TABLE IF NOT EXISTS `todo`.`BOARD` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `USER_idx` INT NOT NULL,
  `private` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idx`),
  INDEX `fk_BOARD_USER_idx` (`USER_idx` ASC) VISIBLE,
  CONSTRAINT `fk_BOARD_USER`
    FOREIGN KEY (`USER_idx`)
    REFERENCES `todo`.`USER` (`idx`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`LIST`
-- -----------------------------------------------------
DROP TABLE IF EXISTS LIST;
CREATE TABLE IF NOT EXISTS `todo`.`LIST` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `BOARD_idx` INT NOT NULL,
  PRIMARY KEY (`idx`),
  INDEX `fk_LIST_BOARD1_idx` (`BOARD_idx` ASC) VISIBLE,
  CONSTRAINT `fk_LIST_BOARD1`
    FOREIGN KEY (`BOARD_idx`)
    REFERENCES `todo`.`BOARD` (`idx`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`ITEM`
-- -----------------------------------------------------
DROP TABLE IF EXISTS ITEM;
CREATE TABLE IF NOT EXISTS `todo`.`ITEM` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `title` TEXT NOT NULL,
  `LIST_idx` INT NOT NULL,
  `pos` DECIMAL(14,4),
  PRIMARY KEY (`idx`),
  INDEX `fk_ITEM_LIST1_idx` (`LIST_idx` ASC) VISIBLE,
  CONSTRAINT `fk_ITEM_LIST1`
    FOREIGN KEY (`LIST_idx`)
    REFERENCES `todo`.`LIST` (`idx`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`PERMISSION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS PERMISSION;
CREATE TABLE IF NOT EXISTS `todo`.`PERMISSION` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `USER_idx` INT NOT NULL,
  `BOARD_idx` INT NOT NULL,
  `authentic` TINYINT NOT NULL,
  PRIMARY KEY (`idx`),
  INDEX `fk_PERMISSION_USER1_idx` (`USER_idx` ASC) VISIBLE,
  INDEX `fk_PERMISSION_BOARD1_idx` (`BOARD_idx` ASC) VISIBLE,
  INDEX `USER_idx_UNIQUE` (`USER_idx` ASC) VISIBLE,
  CONSTRAINT `fk_PERMISSION_USER1`
    FOREIGN KEY (`USER_idx`)
    REFERENCES `todo`.`USER` (`idx`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_PERMISSION_BOARD1`
    FOREIGN KEY (`BOARD_idx`)
    REFERENCES `todo`.`BOARD` (`idx`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`LOG`
-- -----------------------------------------------------
DROP TABLE IF EXISTS LOG;
CREATE TABLE IF NOT EXISTS `todo`.`LOG` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) NOT NULL,
  `BOARD_idx` INT NOT NULL,
  `item_title` TEXT NOT NULL,
  `source` TEXT,
  `target` TEXT,
  `action` TINYINT NOT NULL,
  `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  INDEX `fk_LOG_BOARD1_idx` (`BOARD_idx` ASC) VISIBLE,
  CONSTRAINT `fk_LOG_BOARD1`
    FOREIGN KEY (`BOARD_idx`)
    REFERENCES `todo`.`BOARD` (`idx`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- 초기 데이터 삽입
-- -----------------------------------------------------
INSERT INTO USER (id, pw, admin) VALUES ('admin', 'x61Ey612Kl2gpFL56FT9weDnpSo4AV8j8+qx2AuTHdRyY036xxzTTrw10Wq3+4qQyB+XURPWx1ONxp3Y3pB37A==', 1);
INSERT INTO BOARD (USER_idx) VALUES (1);
INSERT INTO LIST (title, BOARD_idx) VALUES ('To Do', 1);
INSERT INTO LIST (title, BOARD_idx) VALUES ('In Progress', 1);
INSERT INTO LIST (title, BOARD_idx) VALUES ('Done', 1);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('프론트', 1, 5000000);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('api 설계', 2, 5000000);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('테이블 설계', 3, 5000000);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('admin', 1, '프론트', 'To Do', 0);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('admin', 1, 'api 설계', 'In Progress', 0);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('admin', 1, '테이블 설계', 'Done', 0);

INSERT INTO USER (id, pw, admin) VALUES ('hzoou', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', 0);
INSERT INTO BOARD (USER_idx) VALUES (2);
INSERT INTO LIST (title, BOARD_idx) VALUES ('To Do', 2);
INSERT INTO LIST (title, BOARD_idx) VALUES ('In Progress', 2);
INSERT INTO LIST (title, BOARD_idx) VALUES ('Done', 2);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('공부하기', 4, 5000000);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('밥먹기', 5, 5000000);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('놀기', 6, 5000000);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('hzoou', 2, '공부하기', 'To Do', 0);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('hzoou', 2, '밥먹기', 'In Progress', 0);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('hzoou', 2, '놀기', 'Done', 0);

INSERT INTO USER (id, pw, admin) VALUES ('lallaheee', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', 0);
INSERT INTO BOARD (USER_idx) VALUES (3);
INSERT INTO LIST (title, BOARD_idx) VALUES ('To Do', 3);
INSERT INTO LIST (title, BOARD_idx) VALUES ('In Progress', 3);
INSERT INTO LIST (title, BOARD_idx) VALUES ('Done', 3);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('수영하기', 7, 5000000);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('orm 만들기', 8, 5000000);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('마라탕 먹기', 9, 5000000);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('lallaheee', 3, '수영하기', 'To Do', 0);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('lallaheee', 3, 'orm 만들기', 'In Progress', 0);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('lallaheee', 3, '마라탕 먹기', 'Done', 0);

INSERT INTO USER (id, pw, admin) VALUES ('samrho', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', 0);
INSERT INTO BOARD (USER_idx) VALUES (4);
INSERT INTO LIST (title, BOARD_idx) VALUES ('To Do', 4);
INSERT INTO LIST (title, BOARD_idx) VALUES ('In Progress', 4);
INSERT INTO LIST (title, BOARD_idx) VALUES ('Done', 4);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('공부하기', 10, 5000000);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('팟타이 만들기', 11, 5000000);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('조커 보기', 12, 5000000);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('samrho', 4, '공부하기', 'To Do', 0);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('samrho', 4, '팟타이 만들기', 'In Progress', 0);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('samrho', 4, '조커 보기', 'Done', 0);


INSERT INTO USER (id, pw, admin) VALUES ('eastgerm', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', 0);
INSERT INTO BOARD (USER_idx) VALUES (5);
INSERT INTO LIST (title, BOARD_idx) VALUES ('To Do', 5);
INSERT INTO LIST (title, BOARD_idx) VALUES ('In Progress', 5);
INSERT INTO LIST (title, BOARD_idx) VALUES ('Done', 5);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('축구 보기', 13, 5000000);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('밥먹기', 14, 5000000);
INSERT INTO ITEM (title, LIST_idx, pos) VALUES ('풋살하기', 15, 5000000);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('eastgerm', 5, '축구 보기', 'To Do', 0);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('eastgerm', 5, '밥먹기', 'In Progress', 0);
INSERT INTO LOG (user_id, BOARD_idx, item_title, target, action) VALUES ('eastgerm', 5, '풋살하기', 'Done', 0);