<?php

namespace App\Controller;



use App\Repository\UserRepository;
use App\Document\TableRestaurant;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    #[Route('/home', name: 'app_home')]
    public function index(DocumentManager $dm, UserRepository $userRepository): JsonResponse
    {
        $users = $userRepository->findAll();
        $tableRestaurant = new TableRestaurant();
        $tableRestaurant->setCapacite(3)
            ->setNumero(5);
        $dm->persist($tableRestaurant);
        $dm->flush();
        return $this->json([
            'nombre utilisateur' => sizeof($users),
            'table' => $tableRestaurant->getId(),
        ]);
    }
}
