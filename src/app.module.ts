import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`, '.env.example', '.env']
    }),
    TasksModule,
    BlogsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.PSQL_HOST,
      // port: Number(process.env.PSQL_PORT),
      // username: process.env.PSQL_USERNAME,
      // password: process.env.PSQL_PASSWORD,
      // database: process.env.PSQL_DB,
      host: 'localhost',
      port: 5500,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true
    }),
    // BlogsModule
  ]
})
export class AppModule {}
