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
  end

  def index
  	friendships = Friendship.where(from_user_id: current_user.id)
  	@friends = friendships.map do |friendship|
  		User.find(friendship.to_user_id)
  	end
    render json: {user: @friends}
  end


  private

  def friendship_params
    params.require(:friendship).permit(:to_user_id)
  end

end
end
