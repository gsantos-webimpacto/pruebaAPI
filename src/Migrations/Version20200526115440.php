<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200526115440 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');
<<<<<<< HEAD:src/Migrations/Version20200526092004.php
        $this->addSql('CREATE TABLE `order` (id INT AUTO_INCREMENT NOT NULL, user INT DEFAULT NULL, price DOUBLE PRECISION NOT NULL, mailing_address VARCHAR(180) NOT NULL, billing_address VARCHAR(180) NOT NULL, paid TINYINT(1) NOT NULL, purchase_date DATE NOT NULL, shipping_date DATE NOT NULL, sent TINYINT(1) NOT NULL, tracking_number VARCHAR(50) DEFAULT NULL, INDEX user (user), UNIQUE INDEX tracking_number (tracking_number), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE order_detail1 (id INT AUTO_INCREMENT NOT NULL, product INT DEFAULT NULL, `order` INT DEFAULT NULL, quantity INT NOT NULL, price INT NOT NULL, INDEX product (product), INDEX IDX_1C8E827DF5299398 (`order`), UNIQUE INDEX `order` (`order`, product), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F52993988D93D649 FOREIGN KEY (user) REFERENCES user (id)');
        $this->addSql('ALTER TABLE order_detail1 ADD CONSTRAINT FK_1C8E827DD34A04AD FOREIGN KEY (product) REFERENCES producto (id)');
        $this->addSql('ALTER TABLE order_detail1 ADD CONSTRAINT FK_1C8E827DF5299398 FOREIGN KEY (`order`) REFERENCES `order` (id)');
=======

        $this->addSql('CREATE TABLE idioma (ididioma INT AUTO_INCREMENT NOT NULL, descripcion VARCHAR(100) NOT NULL, PRIMARY KEY(ididioma)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE orders (id INT AUTO_INCREMENT NOT NULL, user INT DEFAULT NULL, price DOUBLE PRECISION NOT NULL, mailing_address VARCHAR(180) NOT NULL, billing_address VARCHAR(180) NOT NULL, paid TINYINT(1) NOT NULL, purchase_date DATE NOT NULL, shipping_date DATE NOT NULL, sent TINYINT(1) NOT NULL, tracking_number VARCHAR(50) DEFAULT NULL, INDEX user (user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE orders_detail (id INT AUTO_INCREMENT NOT NULL, product INT DEFAULT NULL, `order` INT DEFAULT NULL, quantity INT NOT NULL, price INT NOT NULL, INDEX product (product), INDEX IDX_8F964642F5299398 (`order`), UNIQUE INDEX `order` (`order`, product), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE pais (idpais INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(100) NOT NULL, PRIMARY KEY(idpais)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE producto (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, urlimagen VARCHAR(255) NOT NULL, fabricante VARCHAR(255) NOT NULL, precio INT NOT NULL, tags LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', descripcion VARCHAR(1000) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE provincia (idprovincia INT AUTO_INCREMENT NOT NULL, pais INT DEFAULT NULL, nombre VARCHAR(100) NOT NULL, INDEX fk_provincia_pais (pais), PRIMARY KEY(idprovincia)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, idioma INT DEFAULT NULL, pais INT DEFAULT NULL, provincia INT DEFAULT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, nombre VARCHAR(50) NOT NULL, apellidos VARCHAR(100) NOT NULL, fechadenacimiento DATE NOT NULL, sexo VARCHAR(20) NOT NULL, telefono VARCHAR(10) NOT NULL, datosadicionales VARCHAR(500) NOT NULL, ciudad VARCHAR(100) NOT NULL, direccion VARCHAR(300) NOT NULL, codigopostal INT NOT NULL, INDEX fk_user_pais (pais), INDEX fk_user_provincia (provincia), INDEX fk_user_idioma (idioma), UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE orders ADD CONSTRAINT FK_E52FFDEE8D93D649 FOREIGN KEY (user) REFERENCES user (id)');
        $this->addSql('ALTER TABLE orders_detail ADD CONSTRAINT FK_8F964642D34A04AD FOREIGN KEY (product) REFERENCES producto (id)');
        $this->addSql('ALTER TABLE orders_detail ADD CONSTRAINT FK_8F964642F5299398 FOREIGN KEY (`order`) REFERENCES orders (id)');
        $this->addSql('ALTER TABLE provincia ADD CONSTRAINT FK_D39AF2137E5D2EFF FOREIGN KEY (pais) REFERENCES pais (idpais)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6491DC85E0C FOREIGN KEY (idioma) REFERENCES idioma (ididioma)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6497E5D2EFF FOREIGN KEY (pais) REFERENCES pais (idpais)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649D39AF213 FOREIGN KEY (provincia) REFERENCES provincia (idprovincia)');
>>>>>>> devel:src/Migrations/Version20200526115440.php
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6491DC85E0C');
        $this->addSql('ALTER TABLE orders_detail DROP FOREIGN KEY FK_8F964642F5299398');
        $this->addSql('ALTER TABLE provincia DROP FOREIGN KEY FK_D39AF2137E5D2EFF');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6497E5D2EFF');
        $this->addSql('ALTER TABLE orders_detail DROP FOREIGN KEY FK_8F964642D34A04AD');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649D39AF213');
        $this->addSql('ALTER TABLE orders DROP FOREIGN KEY FK_E52FFDEE8D93D649');
        $this->addSql('DROP TABLE idioma');
        $this->addSql('DROP TABLE orders');
        $this->addSql('DROP TABLE orders_detail');
        $this->addSql('DROP TABLE pais');
        $this->addSql('DROP TABLE producto');
        $this->addSql('DROP TABLE provincia');
        $this->addSql('DROP TABLE user');
    }
}
