<?php

namespace App\Document;

use App\Repository\TableRestaurantRepository;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Doctrine\ODM\MongoDB\Types\Type;
use ApiPlatform\Metadata\ApiResource;

#[ODM\Document(repositoryClass: TableRestaurantRepository::class)]
#[ApiResource]
class TableRestaurant

{
    #[ODM\Id]
    private ?string $id = null;

    #[ODM\Field(type: Type::INT)]
    private ?int $capacite = null;

    #[ODM\Field(type: Type::INT)]
    private ?int $numero = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getCapacite(): ?int
    {
        return $this->capacite;
    }

    public function setCapacite(int $capacite): static
    {
        $this->capacite = $capacite;

        return $this;
    }

    public function getNumero(): ?int
    {
        return $this->numero;
    }

    public function setNumero(int $numero): static
    {
        $this->numero = $numero;

        return $this;
    }
}
