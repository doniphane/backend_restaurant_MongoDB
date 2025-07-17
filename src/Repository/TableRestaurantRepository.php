<?php

namespace App\Repository;

use App\Document\TableRestaurant;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

/**
 * @extends DocumentRepository<TableRestaurant>
 *
 * @method TableRestaurant|null find($id, $lockMode = null, $lockVersion = null)
 * @method TableRestaurant|null findOneBy(array $criteria, array $orderBy = null)
 * @method TableRestaurant[]    findAll()
 * @method TableRestaurant[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TableRestaurantRepository extends DocumentRepository
{
    public function __construct(DocumentManager $dm)
    {
        $uow = $dm->getUnitOfWork();
        $classMetaData = $dm->getClassMetadata(TableRestaurant::class);
        parent::__construct($dm, $uow, $classMetaData);
    }

    /**
     * @return TableRestaurant[] Returns an array of TableRestaurant objects
     */
    public function findByCapacite($capacite)
    {
        return $this->createQueryBuilder()
            ->field('capacite')->gte($capacite)
            ->sort('capacite', 'ASC')
            ->getQuery()
            ->execute()
        ;
    }

    //    public function count(): int
    //    {
    //        $qb = $this->createQueryBuilder();
    //        return $qb->count()->getQuery()->execute();
    //    }
}
