<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200526091126 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE `order` CHANGE paid paid TINYINT(1) NOT NULL, CHANGE sent sent TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE order_detail1 CHANGE `order` `order` INT DEFAULT NULL, CHANGE product product INT DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE `order` CHANGE paid paid TINYINT(1) DEFAULT \'0\' NOT NULL, CHANGE sent sent TINYINT(1) DEFAULT \'0\' NOT NULL');
        $this->addSql('ALTER TABLE order_detail1 CHANGE product product INT NOT NULL, CHANGE `order` `order` INT NOT NULL');
    }
}
