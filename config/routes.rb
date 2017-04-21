Rails.application.routes.draw do
  get 'users/show'

  # devise_for :users
  namespace :api,{format:'json'} do
  	resources :users do
  		collection do
  			get 'search'
  		end
  	end
  	resources :messages, only: [:index, :create] 
  	resources :friendships,only: [:index,:create, :destroy]
  end

  root to: 'messages#index'
  devise_for :users
  resources :users, only: [:show] do
  	collection do
  		get 'search'
  	end
  end
end
