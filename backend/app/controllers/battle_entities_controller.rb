class BattleEntitiesController < ApplicationController
  before_action :authorize
  before_action :set_battle_entity, only: %i[ show update destroy ]

  # GET /battle_entities
  def index
    @battle_entities = BattleEntity.select(
      :id, :battle_id, :name, :total_health, :current_health, :description, :notes, :initiative
    ).where(user: user)

    render json: @battle_entities
  end

  # GET /battle_entities/1
  def show
    render json: {
      id: @battle_entity.id,
      battle_id: @battle_entity.battle_id,
      name: @battle_entity.name,
      total_health: @battle_entity.total_health,
      current_health: @battle_entity.current_health,
      description: @battle_entity.description,
      notes: @battle_entity.notes,
      initiative: @battle_entity.initiative
    }
  end

  # POST /battle_entities
  def create
    @battle_entity = BattleEntity.new(battle_entity_params.merge(user: user))

    if @battle_entity.save
      render json: {
        id: @battle_entity.id,
        battle_id: @battle_entity.battle_id,
        name: @battle_entity.name,
        total_health: @battle_entity.total_health,
        current_health: @battle_entity.current_health,
        description: @battle_entity.description,
        notes: @battle_entity.notes,
        initiative: @battle_entity.initiative
      }, status: :created, location: @battle_entity
    else
      render json: @battle_entity.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /battle_entities/1
  def update
    if @battle_entity.update(battle_entity_params)
      render json: {
        id: @battle_entity.id,
        battle_id: @battle_entity.battle_id,
        name: @battle_entity.name,
        total_health: @battle_entity.total_health,
        current_health: @battle_entity.current_health,
        description: @battle_entity.description,
        notes: @battle_entity.notes,
        initiative: @battle_entity.initiative
      }
    else
      render json: @battle_entity.errors, status: :unprocessable_entity
    end
  end

  # DELETE /battle_entities/1
  def destroy
    @battle_entity.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_battle_entity
      @battle_entity = BattleEntity.find_by(id: params[:id], user: user)
    end

    # Only allow a list of trusted parameters through.
    def battle_entity_params
      params.require(:battle_entity).permit(:battle_id, :name, :total_health, :current_health, :initiative, :description, :notes)
    end
end
