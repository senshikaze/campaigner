class SectionsController < ApplicationController
  before_action :authorize
  before_action :set_section, only: %i[ show update destroy entries destroyEntries ]

  # GET /sections
  def index
    @sections = Section.select(:id, :name, :campaign_id)
      .where(user: user)

    render json: @sections
  end

  # GET /sections/1
  def show
    render json: @section
  end

  # GET /sections/1/entries
  def entries
    render json: @section.campaign_entries
      .map {|entry| {id: entry.id, title: entry.title, text: entry.text, section_id: entry.section.id}}
  end

  # DELETE /sections/1/entries
  def destroyEntries
    @section.campaign_entries.destroy_all
  end

  # POST /sections
  def create

    @section = Section.new(section_params.merge(user: user))

    if @section.save
      render json: {id: @section.id, name: @section.name, campaign_id: @section.campaign.id}, status: :created, location: @section
    else
      render json: @section.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /sections/1
  def update
    if @section.update(section_params)
      render json: {id: @section.id, name: @section.name, campaign_id: @section.campaign.id}
    else
      render json: @section.errors, status: :unprocessable_entity
    end
  end

  # DELETE /sections/1
  def destroy
    @section.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_section
      @section = Section.find_by(id: params[:id], user: user)
    end

    # Only allow a list of trusted parameters through.
    def section_params
      params.require(:section).permit(:campaign_id, :name)
    end
end
