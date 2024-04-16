require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should not get index" do
    get users_url, as: :json
    assert_response :not_found
  end

  test "should not create user" do
    assert_no_difference("User.count") do
      post users_url, params: { user: { email: @user.email, id: @user.id, name: @user.name } }, as: :json
    end

    assert_response :not_found
  end

  test "should not show user" do
    get user_url(@user), as: :json
    assert_response :not_found
  end

  test "should not update user" do
    patch user_url(@user), params: { user: { email: @user.email, id: @user.id, name: @user.name} }, as: :json
    assert_response :not_found
  end

  test "should not destroy user" do
    assert_no_difference("User.count", -1) do
      delete user_url(@user), as: :json
    end

    assert_response :not_found
  end
end
