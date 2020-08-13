require 'faraday'
require 'faraday_middleware'

# Selection.destroy_all
# Pool.destroy_all
# Game.destroy_all

## - First 150 pokemon - ##
# PokemonSeeder.seed!

## - Miyazaki Characters - ##
# MiyazakiSeeder.seed!

## - Comic Book Superheros - ##
# SuperheroSeeder.seed!

## - Pixar Movies - ##
TMDBSeeder.pixar_seed!

## - Denzel Movies - ##
TMDBSeeder.denzel_seed!

MortySeeder.seed!