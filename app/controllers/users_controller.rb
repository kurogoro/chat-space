class UsersController < ApplicationController
  def index
    @users = User.where.not(id: search_params[:member_ids]).where('name LIKE(?)', "#{search_params[:keyword]}%")
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def search_params
    params.permit(:keyword, { member_ids: [] })
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
