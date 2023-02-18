exports.shorthands = undefined;

exports.up = (pgm: any): any => {
  pgm.createTable('users', {
    id: 'id',
    document: { type: 'integer(10)', notNull: true, unique: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: false,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm: any): any => {
  pgm.dropTable('users');
};
