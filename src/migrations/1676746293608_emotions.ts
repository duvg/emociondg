exports.shorthands = undefined;

exports.up = (pgm: any): any => {
  pgm.createTable('emotions', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    description: { type: 'text(300)', notNull: true },
    type: { type: 'integer(1)', notNull: true },
    bodyPart: { type: 'varchar(100)', notNull: true },
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
