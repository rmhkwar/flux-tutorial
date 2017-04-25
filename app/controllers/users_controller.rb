class UsersController < ApplicationController
  def show
    puts '-----------------'
    @user = User.find_by(id: params[:id])
  end

  def index
  end

  def search
  end

end
