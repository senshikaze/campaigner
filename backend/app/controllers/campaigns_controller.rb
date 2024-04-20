class CampaignsController < ApplicationController
  before_action :authorize
  before_action :set_campaign, only: %i[ show update destroy sections ]

  # GET /campaigns
  def index
    @campaigns = Campaign.where({user: user})
      .map { |camp| { id: camp.id, name: camp.name, description: camp.description}}

    render json: @campaigns
  end

  # GET /campaigns/1
  def show
    render json: {id: @campaign.id, name: @campaign.name, description: @campaign.description}
  end

  # GET /campaigns/1/sections
  def sections
    render json: @campaign.sections
      .map {|section| {id: section.id, name: section.name, campaign_id: section.campaign.id}}
  end

  # POST /campaigns
  def create
    @campaign = Campaign.new(campaign_params.merge(user: user))

    if @campaign.save
      render json: {id: @campaign.id, name: @campaign.name, description: @campaign.description}, status: :created, location: @campaign
    else
      render json: @campaign.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /campaigns/1
  def update
    if @campaign.update(campaign_params.merge(user: user))
      render json: {id: @campaign.id, name: @campaign.name, description: @campaign.description}
    else
      render json: @campaign.errors, status: :unprocessable_entity
    end
  end

  # DELETE /campaigns/1
  def destroy
    @campaign.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_campaign
      @campaign = Campaign.find_by(id: params[:id], user: user)
    end

    # Only allow a list of trusted parameters through.
    def campaign_params
      params.require(:campaign).permit(:name, :description)
    end
end
