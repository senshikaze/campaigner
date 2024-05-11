require "test_helper"
require "mocha/minitest"

class SectionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    user = users(:one)
    SectionsController.any_instance.stubs(:authorize).returns
    SectionsController.any_instance.stubs(:user).returns(user)
    @section = sections(:one)
  end

  test "should get index" do
    get sections_url, as: :json
    assert_response :success
    sec = @response.parsed_body
    assert_equal @section.id, sec[0]["id"]
    assert_not_includes sec[0], :user_id
  end

  test "should create section" do
    assert_difference("Section.count") do
      post sections_url, params: { section: { campaign_id: @section.campaign.id, name: @section.name } }, as: :json
    end

    assert_response :created
  end

  test "should show section" do
    get section_url(@section), as: :json
    assert_response :success
  end

  test "should update section" do
    @section.name = "newstring"
    patch section_url(@section), params: { section: { name: @section.name } }, as: :json
    assert_response :success
  end

  test "should destroy section" do
    assert_difference("Section.count", -1) do
      delete section_url(@section), as: :json
    end

    assert_response :no_content
  end

  test "should show entries" do
    get entries_section_url(@section), as: :json
    assert_response :success
    assert_equal CampaignEntry.where(section: @section).count, response.parsed_body.count
  end

  test "should destroy entries" do
    assert_difference("CampaignEntry.where(section: @section).count", -2) do
      delete entries_section_url(@section), as: :json
    end
  end
end
