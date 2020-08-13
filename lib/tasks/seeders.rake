require_relative "../../app/seeders/pokemon_seeder.rb"
require_relative "../../app/seeders/miyazaki_seeder.rb"
require_relative "../../app/seeders/morty_seeder.rb"
require_relative "../../app/seeders/superhero_seeder.rb"
require_relative "../../app/seeders/tmdb_seeder.rb"

task :pokemon do
  PokemonSeeder.seed!
end

task :miyazaki do
  MiyazakiSeeder.seed!
end

task :superhero do
  SuperheroSeeder.seed!
end

task :pixar do
  TMDBSeeder.pixar_seed!
end

task :denzel do
  TMDBSeeder.denzel_seed!
end

task :morty do
  MortySeeder.seed!
end

task :clearpools do
  Selection.destroy_all
  Pool.destroy_all
  Game.destroy_all
end
