class ApplicationController < ActionController::API
    include Auth

    protected
    def user
        @user
    end
end
