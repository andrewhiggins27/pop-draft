require 'faraday'

class SuperheroSeeder
  def self.seed!
    superhero_pool = Pool.create(name: "Superheros")

    num = 1
    while num <= 731 do
      key = ENV["SUPERHERO_KEY"]
      url = "https://www.superheroapi.com/api.php/#{key}/#{num}"
    
      superhero_conn = Faraday.get("#{url}")
      superhero_object = JSON.parse(superhero_conn.body)
    
      name = superhero_object["name"]
      biography = superhero_object["biography"]
      first_appearance = biography["first-appearance"]
      publisher = biography["publisher"]
      description = "First Appearance:\n#{first_appearance}\n\nPublisher:\n#{publisher}"
      image = superhero_object["image"]["url"]
    
      image_404_check = Faraday.get("#{image}")
      image_status = image_404_check.status

      if image_status == 200 && publisher != "George Lucas"
        Selection.create(
          name: name,
          description: description,
          image: image,
          pool: superhero_pool
        )
      end

      num = num + 1
    end
  end
end

