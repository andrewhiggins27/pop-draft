require 'faraday'
require 'faraday_middleware'

pokemon_pool = Pool.create(name: "First 150 Pokemon")

num = 1
while num <= 150 do
  pokemon_conn = Faraday.new(url: "https://pokeapi.co/api/v2/pokemon/#{num}") do |faraday|
    faraday.adapter Faraday.default_adapter
    faraday.response :json
  end
  species_conn = Faraday.new(url: "https://pokeapi.co/api/v2/pokemon-species/#{num}") do |faraday|
    faraday.adapter Faraday.default_adapter
    faraday.response :json
  end

  pokemon_name = pokemon_conn.get.body["name"].capitalize()

  pokemon_description = species_conn.get.body["flavor_text_entries"][0]["flavor_text"]
  pokemon_description = pokemon_description.gsub("\n", " ")
  pokemon_description = pokemon_description.gsub("\f", " ")
  pokemon_image = pokemon_conn.get.body["sprites"]["front_default"]

  Selection.create(name: pokemon_name, description: pokemon_description, image: pokemon_image, pool: pokemon_pool)

  num = num + 1
end