<?php

namespace App\Repository;

use App\Document\Client;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

/**
 * @extends DocumentRepository<Client>
 *
 * @method Client|null find($id, $lockMode = null, $lockVersion = null)
 * @method Client|null findOneBy(array $criteria, array $orderBy = null)
 * @method Client[]    findAll()
 * @method Client[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClientRepository extends DocumentRepository
{
    public function __construct(DocumentManager $dm)
    {
        $uow = $dm->getUnitOfWork();
        $classMetaData = $dm->getClassMetadata(Client::class);
        parent::__construct($dm, $uow, $classMetaData);
    }

//    /**
//     * @return Client[] Returns an array of Client objects
//     */
//    public function findByExampleField($value)
//    {
//        return $this->createQueryBuilder()
//            ->addAnd(['exampleField' => ['$regex' => $value, '$options' => 'i']])
//            ->sort('exampleField', 'ASC')
//            ->limit(10)
//            ->getQuery()
//            ->execute()
//        ;
//    }

//    public function count(): int
//    {
//        $qb = $this->createQueryBuilder();
//        return $qb->count()->getQuery()->execute();
//    }
}
