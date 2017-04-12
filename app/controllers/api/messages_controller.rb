module Api
  class MessagesController < ApplicationController

    def index
      @messages = Messages.all
      render json: @messages
    end
  end

end