<?php

namespace App\Repository;

use App\Entity\Provincia;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Provincia|null find($id, $lockMode = null, $lockVersion = null)
 * @method Provincia|null findOneBy(array $criteria, array $orderBy = null)
 * @method Provincia[]    findAll()
 * @method Provincia[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProvinciaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Provincia::class);
    }
    public function findByPais($idpais): array
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery('
            SELECT p FROM App\Entity\Provincia p 
            WHERE p.pais = :idpais
            ORDER BY p.nombre ASC')->setParameter('idpais', $idpais);
        return $query->getResult();
    }
        // public function findProvinciasByIdPais($idpais): array
    // {
    //     $conn = $this->getEntityManager()->getConnection();

    //     $sql = '
    //         SELECT * FROM provincia p ,pais pa
    //         WHERE p.pais.idpais = :idpais
    //         ORDER BY p.price ASC
    //         ';
            
    //     $stmt = $conn->prepare($sql);
    //     $stmt->execute(['price' => $price]);

    //     return $stmt->fetchAll();
    // }
    // /**
    //  * @return Provincia[] Returns an array of Provincia objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Provincia
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
