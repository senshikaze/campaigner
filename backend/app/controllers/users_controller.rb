class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  before_action :authorize

end
