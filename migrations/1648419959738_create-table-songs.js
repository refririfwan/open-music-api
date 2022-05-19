/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    albumid: {
      type: 'VARCHAR(50)',
      foreignKey: true,
    },
    title: {
      type: 'TEXT',
    },
    year: {
      type: 'SMALLINT',
    },
    genre: {
      type: 'TEXT',
    },
    performer: {
      type: 'TEXT',
    },
    duration: {
      type: 'INTEGER',
    },
    created_at: {
      type: 'TEXT',
    },
    updated_at: {
      type: 'TEXT',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
