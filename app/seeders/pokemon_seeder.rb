require 'faraday'

class PokemonSeeder
  def self.seed!
    pokemon_pool = Pool.create(name: "First 150 Pokemon")
    num = 1
    while num <= 150 do
      pokemon_conn = Faraday.get("https://pokeapi.co/api/v2/pokemon/#{num}")
      pokemon_conn_response = JSON.parse(pokemon_conn.body)

      species_conn = Faraday.get("https://pokeapi.co/api/v2/pokemon-species/#{num}")
      species_conn_response = JSON.parse(species_conn.body)

      pokemon_name = pokemon_conn_response["name"].capitalize()

      pokemon_descriptions = species_conn_response["flavor_text_entries"]
      pokemon_descriptions = pokemon_descriptions.select { |x| x["language"]["name"] == "en" }
      pokemon_description = pokemon_descriptions[0]["flavor_text"]
      pokemon_description = pokemon_description.gsub("\n", " ")
      pokemon_description = pokemon_description.gsub("\f", " ")
      pokemon_image = pokemon_conn_response["sprites"]["front_default"]

      Selection.create(
        name: pokemon_name, 
        description: pokemon_description, 
        image: pokemon_image, 
        pool: pokemon_pool
    )

      num = num + 1
    end
  end
end