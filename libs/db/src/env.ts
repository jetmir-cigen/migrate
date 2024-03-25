export const env = () => ({
  port: process.env['DB_PORT'],
  host: process.env['DB_HOST'],
  name: process.env['DB_NAME'],
  user: process.env['DB_USER'],
  password: process.env['DB_PASS'],
  ssl: process.env['DB_SSL'],
});
