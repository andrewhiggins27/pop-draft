Rails.application.routes.draw do
  root 'homes#index'
  get '/pools/:id/games/new', to: 'homes#index'
  get '/games/:id', to: 'homes#index'
  get '/chats', to: 'homes#index'
  get '/chats/:id', to: 'homes#index'
  get '/games/:id/results', to: "homes#index"
  get '/games/:id/:status', to: "homes#index"

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :pools, only: [:index, :update]
      resources :games, only: [:show, :update, :create]
      resources :messages, only: [:create]
      resources :users, only: [:show]
      resources :teams, only: [:update]
      get "users/current" => "users#current_user"
      get "pools/:id/games" => "pools#waiting_games"
    end
  end
end
