Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :tasks, only: [:index, :create, :show, :update, :destroy]
  resources :users, only: %i[create index]
  resource :session, only: [:create, :destroy]
  resources :comments, only: [:create]

  root "home#index"
  get "*path", to: "home#index", via: :all
end
