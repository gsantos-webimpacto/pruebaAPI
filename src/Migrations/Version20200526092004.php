<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200526092004 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');
        $this->addSql('CREATE TABLE `order` (id INT AUTO_INCREMENT NOT NULL, user INT DEFAULT NULL, price DOUBLE PRECISION NOT NULL, mailing_address VARCHAR(180) NOT NULL, billing_address VARCHAR(180) NOT NULL, paid TINYINT(1) NOT NULL, purchase_date DATE NOT NULL, shipping_date DATE NOT NULL, sent TINYINT(1) NOT NULL, tracking_number VARCHAR(50) DEFAULT NULL, INDEX user (user), UNIQUE INDEX tracking_number (tracking_number), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE order_detail1 (id INT AUTO_INCREMENT NOT NULL, product INT DEFAULT NULL, `order` INT DEFAULT NULL, quantity INT NOT NULL, price INT NOT NULL, INDEX product (product), INDEX IDX_1C8E827DF5299398 (`order`), UNIQUE INDEX `order` (`order`, product), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `order` ADD CONSTRAINT FK_F52993988D93D649 FOREIGN KEY (user) REFERENCES user (id)');
        $this->addSql('ALTER TABLE order_detail1 ADD CONSTRAINT FK_1C8E827DD34A04AD FOREIGN KEY (product) REFERENCES producto (id)');
        $this->addSql('ALTER TABLE order_detail1 ADD CONSTRAINT FK_1C8E827DF5299398 FOREIGN KEY (`order`) REFERENCES `order` (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6491DC85E0C');
        $this->addSql('ALTER TABLE order_detail1 DROP FOREIGN KEY FK_1C8E827DF5299398');
        $this->addSql('ALTER TABLE provincia DROP FOREIGN KEY FK_D39AF2137E5D2EFF');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6497E5D2EFF');
        $this->addSql('ALTER TABLE order_detail1 DROP FOREIGN KEY FK_1C8E827DD34A04AD');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649D39AF213');
        $this->addSql('ALTER TABLE `order` DROP FOREIGN KEY FK_F52993988D93D649');
        $this->addSql('DROP TABLE idioma');
        $this->addSql('DROP TABLE `order`');
        $this->addSql('DROP TABLE order_detail1');
        $this->addSql('DROP TABLE pais');
        $this->addSql('DROP TABLE producto');
        $this->addSql('DROP TABLE provincia');
        $this->addSql('DROP TABLE user');
    }
}
