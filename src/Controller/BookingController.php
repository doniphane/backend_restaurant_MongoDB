<?php

namespace App\Controller;

use App\Repository\ReservationRepository;
use App\Repository\TableRestaurantRepository;
use JsonException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;



#[Route("/api/booking")]
final class BookingController extends AbstractController
{
    #[Route('/tables', name: 'app_booking_tables')]
    public function app_booking_tables(Request $request, TableRestaurantRepository $tableRestaurantRepository, ReservationRepository $reservationRepository): JsonResponse
    {
        $data = $request->getContent();
        $json = json_decode($data, true);
        $capacite = $json["capacite"] ?? null;
        $date = $json["date"] ?? null;
        if (!$capacite || !$date) {
            return new JsonResponse(["error" => "données manquantes"], 401);
        }
        $tables = $tableRestaurantRepository->findByCapacite($capacite);
        $reservations = $reservationRepository->findBy(["dateReservation" => new \DateTime($date)]);
        $tables_dispo = [];
        foreach ($tables as $t) {
            $dispo = true;
            foreach ($reservations as $r) {
                if ($r->getTableRestaurant()->getId() == $t->getId()) {
                    $dispo = false;
                }
            }
            if ($dispo) {
                $tables_dispo[] = $t;
            }
        }
        dd($tables_dispo);
        return $this->json(
            [
                'capacite' => $capacite,
                'date' => $date,
                'tables_dispo' => $tables_dispo,
            ]
        );
    }
}
