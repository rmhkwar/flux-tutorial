module Api
  class FriendshipsController < ApplicationController

  def create
    friendship = Friendship.new(
    	to_user_id: params[:to_user_id],
    	from_user_id: current_user.id
    )
    friendship.save
    @friendships = Friendship.all
    render json: @friendships

  end

  def destroy
    destroy_user = current_user.friend_by_id(params[:to_user_id])
    destroy_user.destroy
    friendships = Friendship.where(from_user_id: current_user.id)
  	@friends = friendships.map do |friendship|
  		User.find(friendship.to_user_id)
  	end
    render json: {user: @friends}
  end

  def index
  	friendships = Friendship.where(from_user_id: current_user.id)
  	friends = friendships.map do |friendship|
  		User.find(friendship.to_user_id)
  	end

    ffriendships = Friendship.where(to_user_id: current_user.id)
    ffriends = ffriendships.map do |friendship|
      User.find(friendship.from_user_id)
    end

    friends.push(ffriends)
    @friends = friends.flatten!
    render json: {user: @friends}
  end


  private

  def friendship_params
    params.require(:friendship).permit(:to_user_id)
  end

  # def destroy_user_params
  #   ActionController::Parameters.new(params).permit(:to_user_id)
  # end
end
end
