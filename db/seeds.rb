require 'faraday'
require 'csv'

Selection.destroy_all
Pool.destroy_all
Game.destroy_all

## The following methods run faraday requests to 3rd party APIs to seed database. Buggy on Heroku, but works in development
# PokemonSeeder.seed!
# MiyazakiSeeder.seed!
# SuperheroSeeder.seed!
# TMDBSeeder.pixar_seed!
# TMDBSeeder.denzel_seed!
# MortySeeder.seed!

## Create pools using CSV file
selections = CSV.readlines('selections.csv', headers: true)

pokemon_pool = Pool.create(name: "First 150 Pokemon")
miyazaki_pool = Pool.create(name: "Hayao Miyazaki Characters")
superhero_pool = Pool.create(name: "Superheroes and Supervillians")
pixar_pool = Pool.create(name: "Pixar Features and Shorts")
denzel_pool = Pool.create(name: "Denzel Washington Movies")
morty_pool = Pool.create(name: "Rick and Morty Characters")

selections.each do |selection|
  case selection["pool_id"]
  when "28"
    pool = pokemon_pool
  when "29"
    pool = miyazaki_pool
  when "30"
    pool = superhero_pool
  when "31"
    pool = pixar_pool
  when "32"
    pool = denzel_pool
  when "33"
    pool = morty_pool
  end

  Selection.create(
    name: selection["name"],
    description: selection["description"],
    image: selection["image"],
    pool: pool
  )
end
