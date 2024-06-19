class BattlesController < ApplicationController
  before_action :authorize
  before_action :set_battle, only: %i[ show update destroy ]

  # GET /battles
  def index
    @battles = Battle.select(:id, :name, :current_entity_id).where(user: user)

    render json: @battles
  end

  # GET /battles/1
  def show
    render json: {id: @battle.id, name: @battle.name, current_entity_id: @battle.current_entity_id}
  end

  # GET /battles/1/entities
  def showEntities
    render json: @battle.entities
  end

  # POST /battles
  def create
    @battle = Battle.new(battle_params.merge(user: user))

    if @battle.save
      render json: {id: @battle.id, name: @battle.name, current_entity_id: @battle.current_entity_id}, status: :created, location: @battle
    else
      render json: @battle.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /battles/1
  def update
    if @battle.update(battle_params)
      render json: {id: @battle.id, name: @battle.name, current_entity_id: @battle.current_entity_id}
    else
      render json: @battle.errors, status: :unprocessable_entity
    end
  end

  # DELETE /battles/1
  def destroy
    @battle.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_battle
      @battle = Battle.find_by(id: params[:id], user: user)
    end

    # Only allow a list of trusted parameters through.
    def battle_params
      params.require(:battle).permit(:name)
    end
end
