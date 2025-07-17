<?php

namespace App\Command;

use App\Document\TableRestaurant;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:create-tables',
    description: 'Crée des tables de test pour le restaurant',
)]
class CreateTablesCommand extends Command
{
    public function __construct(
        private DocumentManager $documentManager
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        // Vérifier si des tables existent déjà
        $existingTables = $this->documentManager->getRepository(TableRestaurant::class)->findAll();

        if (!empty($existingTables)) {
            $io->warning('Des tables existent déjà dans la base de données.');
            if (!$io->confirm('Voulez-vous continuer et ajouter de nouvelles tables ?', false)) {
                return Command::SUCCESS;
            }
        }

        // Créer des tables de test
        $tablesData = [
            ['numero' => 1, 'capacite' => 2],
            ['numero' => 2, 'capacite' => 4],
            ['numero' => 3, 'capacite' => 4],
            ['numero' => 4, 'capacite' => 6],
            ['numero' => 5, 'capacite' => 6],
            ['numero' => 6, 'capacite' => 8],
            ['numero' => 7, 'capacite' => 8],
            ['numero' => 8, 'capacite' => 10],
        ];

        $createdCount = 0;
        foreach ($tablesData as $tableData) {
            $table = new TableRestaurant();
            $table->setNumero($tableData['numero']);
            $table->setCapacite($tableData['capacite']);

            $this->documentManager->persist($table);
            $createdCount++;
        }

        $this->documentManager->flush();

        $io->success(sprintf('%d tables ont été créées avec succès !', $createdCount));

        return Command::SUCCESS;
    }
}
