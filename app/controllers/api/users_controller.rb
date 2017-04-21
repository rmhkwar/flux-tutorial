class Api::UsersController < ApplicationController

  def search
    query = params[:search_query]
    if query.present?
      @users = User.search(:name_cont => params[:search_query]).result
      render json: { users: @users }
    else
      render json: {  errors: '検索したいユーザ名を入力してください' }
    end
  end
end