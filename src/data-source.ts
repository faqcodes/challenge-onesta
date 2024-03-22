import 'reflect-metadata';
import { DataSource } from 'typeorm';
import DataSourceDev from './config/orm/orm-dev.config';
import DataSourcePro from './config/orm/orm-pro.config';

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'production' ? DataSourcePro : DataSourceDev
);