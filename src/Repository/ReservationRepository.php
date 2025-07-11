<?php

namespace App\Repository;

use App\Document\Reservation;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

/**
 * @extends DocumentRepository<Reservation>
 *
 * @method Reservation|null find($id, $lockMode = null, $lockVersion = null)
 * @method Reservation|null findOneBy(array $criteria, array $orderBy = null)
 * @method Reservation[]    findAll()
 * @method Reservation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReservationRepository extends DocumentRepository
{
    public function __construct(DocumentManager $dm)
    {
        $uow = $dm->getUnitOfWork();
        $classMetaData = $dm->getClassMetadata(Reservation::class);
        parent::__construct($dm, $uow, $classMetaData);
    }

//    /**
//     * @return Reservation[] Returns an array of Reservation objects
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
