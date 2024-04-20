require "test_helper"
require "mocha/minitest"

class CampaignEntriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    user = users(:one)
    CampaignEntriesController.any_instance.stubs(:authorize).returns
    CampaignEntriesController.any_instance.stubs(:user).returns(user)
    @campaign_entry = campaign_entries(:one)
  end

  test "should get index" do
    get entries_url, as: :json
    assert_response :success
  end

  test "should create campaign_entry" do
    assert_difference("CampaignEntry.count") do
      post entries_url, params: { campaign_entry: { section_id: @campaign_entry.section.id, text: @campaign_entry.text, title: @campaign_entry.title, user: @campaign_entry.user } }, as: :json
    end

    assert_response :created
  end

  test "should show campaign_entry" do
    get entry_url(@campaign_entry), as: :json
    assert_response :success
  end

  test "should update campaign_entry" do
    patch entry_url(@campaign_entry), params: { campaign_entry: { section_id: @campaign_entry.section.id, text: @campaign_entry.text, title: @campaign_entry.title, user: @campaign_entry.user } }, as: :json
    assert_response :success
  end

  test "should destroy campaign_entry" do
    assert_difference("CampaignEntry.count", -1) do
      delete entry_url(@campaign_entry), as: :json
    end

    assert_response :no_content
  end
end
