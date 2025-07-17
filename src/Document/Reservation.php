<?php

namespace App\Document;

use App\Repository\ReservationRepository;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use ApiPlatform\Metadata\ApiResource;

#[ODM\Document(repositoryClass: ReservationRepository::class)]
#[ApiResource]
class Reservation
{
    #[ODM\Id]
    private ?string $id = null;

    #[ODM\Field]
    private ?\DateTimeImmutable $createdAt = null;

    #[ODM\Field]
    private ?string $creneau = null;

    #[ODM\Field]
    private ?int $nombrePersonne = null;

    #[ODM\ReferenceOne(targetDocument: Client::class, inversedBy: 'reservations')]
    private ?Client $client = null;

    #[ODM\ReferenceOne(targetDocument: TableRestaurant::class)]
    private ?TableRestaurant $tableRestaurant = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCreneau(): ?string
    {
        return $this->creneau;
    }

    public function setCreneau(string $creneau): static
    {
        $this->creneau = $creneau;

        return $this;
    }

    public function getNombrePersonne(): ?int
    {
        return $this->nombrePersonne;
    }

    public function setNombrePersonne(int $nombrePersonne): static
    {
        $this->nombrePersonne = $nombrePersonne;

        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): static
    {
        $this->client = $client;

        return $this;
    }

    public function getTableRestaurant(): ?TableRestaurant
    {
        return $this->tableRestaurant;
    }

    public function setTableRestaurant(?TableRestaurant $tableRestaurant): static
    {
        $this->tableRestaurant = $tableRestaurant;

        return $this;
    }
}
