Rails.application.routes.draw do
  resources :battle_entities
  resources :battles
  resources :entries, controller: :campaign_entries
  resources :sections do
    member do
      get 'entries', as: :entries
      delete 'entries', to: 'sections#destroyEntries'
    end
  end
  resources :campaigns do 
    get 'sections', on: :member
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
