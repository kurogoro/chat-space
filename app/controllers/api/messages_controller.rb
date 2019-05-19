class Api::MessagesController < ApplicationController
  before_action :set_group

  def index
    @messages = @group.messages.includes(:user).where("id > ?", index_params[:last_message_id])
  end

  private

  def index_params
    params.permit(:last_message_id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end