class CampaignsController < ApplicationController
  before_action :authorize
  before_action :set_campaign, only: %i[ show update destroy ]

  # GET /campaigns
  def index
    @campaigns = Campaign.where({user: user})

    render json: @campaigns
  end

  # GET /campaigns/1
  def show
    render json: @campaign
  end

  # POST /campaigns
  def create
    @campaign = Campaign.new(campaign_params.merge(user: user.id))

    if @campaign.save
      render json: @campaign, status: :created, location: @campaign
    else
      render json: @campaign.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /campaigns/1
  def update
    if @campaign.update(campaign_params.merge(user: user.id))
      render json: @campaign
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
      @campaign = Campaign.find_by(id: params[:id], user: user.id)
    end

    # Only allow a list of trusted parameters through.
    def campaign_params
      params.require(:campaign).permit(:name, :description)
    end
end
