/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("repositories", {
    name: { type: "varchar(255)", primaryKey: true },
    last_seen_tag: { type: "varchar(255)", notNull: false },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("subscriptions", {
    id: "id",
    email: { type: "varchar(255)", notNull: true },
    token: { type: "varchar(64)", notNull: false },
    is_confirmed: { type: "boolean", notNull: true, default: false },
    repo_name: {
      type: "varchar(255)",
      notNull: true,
      references: '"repositories"',
      onDelete: "CASCADE",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("subscriptions", ["email", "repo_name"], { unique: true });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("subscriptions");
  pgm.dropTable("repositories");
};
