const {
  addAlbumHandler,
  getAlbumByIdHandler,
  editAlbumByIdHandler,
  deleteAlbumByIdHandler,
  addSongHandler,
  getAllSongs,
  getSongByIdHandler,
  editSongByIdHandler,
  deleteSongByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/albums',
    handler: addAlbumHandler,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: getAlbumByIdHandler,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: editAlbumByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: deleteAlbumByIdHandler,
  },
  {
    method: 'POST',
    path: '/songs',
    handler: addSongHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: getAllSongs,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: getSongByIdHandler,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: editSongByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: deleteSongByIdHandler,
  },
];

module.exports = routes;
