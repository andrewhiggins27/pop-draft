Rails.application.routes.draw do
  root 'homes#index'
  get '/pools/:id', to: 'homes#index'
  get '/games/:id', to: 'homes#index'
  get '/chats', to: 'homes#index'
  get '/chats/:id', to: 'homes#index'


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
    end
  end
end
