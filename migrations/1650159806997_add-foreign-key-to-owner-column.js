/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES ('old_albums', 'old_albums', 'old_albums', 'old_albums')");
  pgm.sql("UPDATE albums SET owner = 'old_albums' WHERE owner = NULL");
  pgm.addConstraint('albums', 'fk_albums.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');

  pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES ('old_songs', 'old_songs', 'old_songs', 'old_songs')");
  pgm.sql("UPDATE songs SET owner = 'old_songs' WHERE owner = NULL");
  pgm.addConstraint('songs', 'fk_songs.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('albums', 'fk_albums.owner_users.id');
  pgm.sql("UPDATE albums SET owner = NULL WHERE owner = 'old_albums'");
  pgm.sql("DELETE FROM users WHERE id = 'old_albums'");

  pgm.dropConstraint('songs', 'fk_songs.owner_users.id');
  pgm.sql("UPDATE songs SET owner = NULL WHERE owner = 'old_songs'");
  pgm.sql("DELETE FROM users WHERE id = 'old_songs'");
};
