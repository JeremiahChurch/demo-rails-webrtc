Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "pages#root"
  get 'room', to: "pages#room"
  resources :video_search, only: :index
end
