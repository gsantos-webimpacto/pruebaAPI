<?php
namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

final class UserDataPersister implements DataPersisterInterface
{
  private $entityManager;
  private $userPasswordEncoder;
  
  public function __construct(EntityManagerInterface $entityManager, UserPasswordEncoderInterface $userPasswordEncoder)
  {
    $this->userPasswordEncoder = $userPasswordEncoder;
    $this->entityManager = $entityManager;
  }
  // public function __construct(EntityManagerInterface $entityManager)
  // {
  // }
  public function supports($data): bool
  {
    return $data instanceof User;
  }
  /**
   * @param User $data
   */
  public function persist($data){
    // $dump($data->getPlainPassword());
    if ($data->getPlainPassword()) {
      $data->setPassword($this->userPasswordEncoder->encodePassword($data, $data->getPlainPassword()) );
      $data->eraseCredentials();
    }
    // $data->setPassword($this->userPasswordEncoder->encodePassword($data, $data->getPassword()));
    $this->entityManager->persist($data);
    $this->entityManager->flush();
  }
  public function remove($data)
  {
      $this->entityManager->remove($data);
      $this->entityManager->flush();
  }
}