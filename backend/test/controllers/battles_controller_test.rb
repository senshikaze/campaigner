require "test_helper"
require "mocha/minitest"

class BattlesControllerTest < ActionDispatch::IntegrationTest
  setup do
    user = users(:one)
    BattlesController.any_instance.stubs(:authorize).returns
    BattlesController.any_instance.stubs(:user).returns(user)
    @battle = battles(:one)
  end

  test "should get index" do
    get battles_url, as: :json
    assert_response :success
    batt = @response.parsed_body
    assert_equal @battle.id, batt[0]["id"]
    assert_not_includes batt[0], :user_id
  end

  test "should create battle" do
    assert_difference("Battle.count") do
      post battles_url, params: { battle: { name: @battle.name } }, as: :json
    end

    assert_response :created
  end

  test "should show battle" do
    get battle_url(@battle), as: :json
    assert_response :success
  end

  test "should update battle" do
    patch battle_url(@battle), params: { battle: { name: @battle.name } }, as: :json
    assert_response :success
  end

  test "should destroy battle" do
    assert_difference("Battle.count", -1) do
      delete battle_url(@battle), as: :json
    end

    assert_response :no_content
  end
end
