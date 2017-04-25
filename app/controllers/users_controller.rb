class UsersController < ApplicationController
  def show
    # 消す
    puts '-----------------'
    @user = User.find_by(id: params[:id])
  end

  def index
  end

  def search
  end

end
