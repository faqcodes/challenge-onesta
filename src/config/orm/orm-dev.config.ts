import { DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: './data/database.sqlite',
  synchronize: true,
  logging: true,
  entities: [
    'src/**/infrastructure/repositories/**/*.entity.ts'
  ],
  migrations: [
    'src/migrations/**/infrastructure/repositories/**/*.entity.ts'
  ]
};

export default dataSourceOptions;