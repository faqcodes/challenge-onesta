import { DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'dist/data/database.sqlite',
  synchronize: true,
  logging: true,
  entities: [
    'dist/**/infrastructure/repositories/**/*.entity.js'
  ],
  migrations: [
    'dist/migrations/**/infrastructure/repositories/**/*.entity.js'
  ]
};

export default dataSourceOptions;