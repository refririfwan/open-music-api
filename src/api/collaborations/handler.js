/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class CollaborationsHandler {
  constructor(collaborationsService, playlistService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistService = playlistService;
    this._validator = validator;

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
    this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
  }

  async postCollaborationHandler(request, h) {
    try {
      this._validator.validateCollaborationPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { playlistId, userId } = request.payload;

      await this._playlistService.verifyPlaylistOwner(playlistId, credentialId);
      // eslint-disable-next-line max-len
      const collaborationId = await this._collaborationsService.addCollaboration(playlistId, userId);
      const response = h.response({
        status: 'success',
        message: 'Collaboration success added',
        data: {
          collaborationId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Sorry, Internal server error.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteCollaborationHandler(request, h) {
    try {
      this._validator.validateCollaborationPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { playlistId, userId } = request.payload;

      await this._playlistService.verifyPlaylistOwner(playlistId, credentialId);
      await this._collaborationsService.deleteCollaboration(playlistId, userId);

      return {
        status: 'success',
        message: 'Collaborations success deleted',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Sorry, Internal server error.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = CollaborationsHandler;
