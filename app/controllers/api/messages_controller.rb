class Api::MessagesController < ApplicationController

  def index
    messages = Message.both_message(
      params[:from_user_id],
      current_user.id
    )
    render json: {
      messages: messages,
    }
  end

  def create
    message = Message.new(
    	to_user_id: params[:to_user_id],
    	from_user_id: current_user.id,
      content: params[:text]
    )
    message.save
    # @messages = Message.all
    render json: message

  end

  private

  def message_params
    params.require(:message).map do |message|
       ActionController::Parameters.new(message.to_hash).permit(:to_user_id, :text)
     end
  end

  def image_params
    ActionController::Parameters.new(params).permit(:to_user_id, :image)
  end
end
