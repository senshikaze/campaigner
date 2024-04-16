# frozen_string_literal: true

module Auth
    extend ActiveSupport::Concern

    BAD_CREDENTIALS = {
        message: 'Bad Credentials'
    }.freeze

    INSUFFICENT_PERMISSIONS = {
        error: 'insufficient_permissions',
        error_description: 'The access token does not contain the required permissions',
        message: 'Permission denied'
    }.freeze

    MALFORMED_AUTHORIZATION_HEADER = {
        error: 'invalid_request',
        error_description: 'The access token does not contain the required elements',
        message: 'Permission Denied'
    }.freeze

    REQUIRES_AUTHORIZATION = {
        message: "Requires Authorization"
    }.freeze

    def authorize
        token = token_from_request

        return if performed?

        validation_response = Auth0Client.validate_token(token)

        @decoded_token = validation_response.decoded_token

        @user = User.find_or_create_by!(name: @decoded_token.token[0]['sub'])

        return unless (error = validation_response.error)

        render json: {message: error.message }, status: error.status
    rescue NoMethodError => e
        Rails.logger.debug e
        render json: {message: "Internal Server Error" }, status: :internal_server_error
    end

    def validate_permissions(permissions)
        raise 'validate_permissions needs to be called  with a block' unless block_given?
        return yield if @decoded_token.validate_permissions(permissions)

        render json: INSUFFICENT_PERMISSIONS, status: :forbidden
    end

    def token_from_request
        authorization_header_elements = request.headers['Authorization']&.split
        render json: REQUIRES_AUTHORIZATION, status: :unauthorized and return unless authorization_header_elements
        unless authorization_header_elements.length == 2
            render json: MALFORMED_AUTHORIZATION_HEADER, status: :unauthorized and return
        end
        scheme, token = authorization_header_elements

        render json: BAD_CREDENTIALS, status: :unauthorized and return unless scheme.downcase == 'bearer'

        token
    end
end
