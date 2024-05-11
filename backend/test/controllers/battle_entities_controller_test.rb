require "test_helper"
require "mocha/minitest"

class BattleEntitiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    user = users(:one)
    BattleEntitiesController.any_instance.stubs(:authorize).returns
    BattleEntitiesController.any_instance.stubs(:user).returns(user)
    @battle_entity = battle_entities(:one)
  end

  test "should get index" do
    get battle_entities_url, as: :json
    assert_response :success
    entity = @response.parsed_body
    assert_equal @battle_entity.id, entity[0]["id"]
    assert_not_includes entity[0], :user_id
  end

  test "should create battle_entity" do
    assert_difference("BattleEntity.count") do
      post battle_entities_url, params: { battle_entity: { battle_id: @battle_entity.battle_id, current_health: @battle_entity.current_health, initiative: @battle_entity.initiative, name: @battle_entity.name, total_health: @battle_entity.total_health, user_id: @battle_entity.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show battle_entity" do
    get battle_entity_url(@battle_entity), as: :json
    assert_response :success
  end

  test "should update battle_entity" do
    patch battle_entity_url(@battle_entity), params: { battle_entity: { battle_id: @battle_entity.battle_id, current_health: @battle_entity.current_health, initiative: @battle_entity.initiative, name: @battle_entity.name, total_health: @battle_entity.total_health, user_id: @battle_entity.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy battle_entity" do
    assert_difference("BattleEntity.count", -1) do
      delete battle_entity_url(@battle_entity), as: :json
    end

    assert_response :no_content
  end
end
