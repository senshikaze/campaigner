class CampaignEntriesController < ApplicationController
  before_action :authorize
  before_action :set_campaign_entry, only: %i[ show update destroy ]

  # GET /campaign_entries
  def index
    @campaign_entries = CampaignEntry.select(
      :id, :title, :text, :section_id
      ).where(user: user)

    render json: @campaign_entries
  end

  # GET /campaign_entries/1
  def show
    render json: {id: @campaign_entry.id, title: @campaign_entry.title, text: @campaign_entry.text, section_id: @campaign_entry.section.id}
  end

  # POST /campaign_entries
  def create
    @campaign_entry = CampaignEntry.new(campaign_entry_params.merge(user: user))

    if @campaign_entry.save
      render json: {id: @campaign_entry.id, title: @campaign_entry.title, text: @campaign_entry.text, section_id: @campaign_entry.section.id}, status: :created, location: 'entries'
    else
      render json: @campaign_entry.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /campaign_entries/1
  def update
    if @campaign_entry.update(campaign_entry_params)
      render json: {id: @campaign_entry.id, title: @campaign_entry.title, text: @campaign_entry.text, section_id: @campaign_entry.section.id}
    else
      render json: @campaign_entry.errors, status: :unprocessable_entity
    end
  end

  # DELETE /campaign_entries/1
  def destroy
    @campaign_entry.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_campaign_entry
      @campaign_entry = CampaignEntry.find_by(id: params[:id], user: user)
    end

    # Only allow a list of trusted parameters through.
    def campaign_entry_params
      params.require(:campaign_entry).permit(:section_id, :title, :text)
    end
end
