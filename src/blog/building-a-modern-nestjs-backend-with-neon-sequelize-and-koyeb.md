---
layout: blog
title: "Building a Modern NestJS Backend with Neon, Sequelize, and Koyeb"
description: "Step-by-step guide to building a production-ready NestJS API using Neon (Postgres), Sequelize ORM, and deploying to Koyeb — covers SSL-safe Sequelize config, model wiring, local testing, and deployment."
date: 2025-12-31
tags: ["NestJS", "Neon", "Koyeb", "Postgress", "Sequelize"]
excerpt: "A practical walkthrough for building and deploying a production-ready NestJS backend with Neon Postgres, Sequelize, and Koyeb—includes setup, configuration, and verification steps."
featureImage: "/images/blog/building-modern-backend-nestjs.webp"
featureImageAlt: "Building a modern NestJS backend"
---

# Building a Modern NestJS Backend with Neon, Sequelize, and Koyeb

When building a backend today, the goal is to move fast without cutting corners. In this guide, we’ll set up a clean, production-ready NestJS API using PostgreSQL hosted on Neon, Sequelize as the ORM, and deploy it to Koyeb. By the end, you’ll have a working API, a real database, and a simple way to verify everything end to end.

This stack is cloud-native, simple to reason about, and scales well without heavy infrastructure.
[GitHub Repo Link](https://github.com/SajanMG/Nestjs-Neon-Koyeb.git)

## 1. Create a new NestJS project

Start by installing the NestJS CLI and creating a new project:

```bash
npm install --global @nestjs/cli
nest new nest-neon-koyeb
cd nest-neon-koyeb
```

Update `src/main.ts` so the app respects the `PORT` environment variable:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
```
## 2. Create a PostgreSQL database on Neon
Create a new project in the Neon dashboard. Once it’s ready, copy the pooled connection string from the Connect panel.

It will look similar to this:

```env
postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require
```
Create a `.env` file for local development:
```bash
touch .env
```

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require
```

Neon requires SSL, which we’ll handle safely in the Sequelize configuration. 

## 3. Install dependencies
Install Sequelize, its NestJS integration, and the Postgres driver:
```bash
npm install @nestjs/sequelize sequelize sequelize-typescript pg pg-hstore
npm install @nestjs/config
```
## 4. Configure Sequelize with Neon (SSL-safe)
Create a database module:
```bash
mkdir -p src/database
touch src/database/database.module.ts
```
Add the following configuration. This setup:
* Uses Neon's connection string correctly (`uri`)
* Enables SSL only when required
* Works for both local and hosted Postgres

Add following to your `src/database/database.module.ts`
```ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('DATABASE_URL') || '';

        return {
          dialect: 'postgres',
          uri,
          autoLoadModels: true,
          synchronize: true,
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          },
          logging: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
```

## 5. Define and register the User model
Create a simple Sequelize model with proper typing for creation:
```bash
mkdir -p src/users
touch src/users/user.model.ts
```
```ts
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize';

type UserAttributes = {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

@Table({ tableName: 'users' })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
```
Register the model using `SequelizeModule.forFeature()`:
```bash
touch src/users/users.module.ts
```
```ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
```
This registers the `User` model with the Sequelize connection so it can be injected via `@InjectModel(User)` inside the module.
Import everything in `AppModule`:
```ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
})
export class AppModule {}
```

## 6. Add a simple API endpoint
Create a service to interact with the database:
```bash
touch src/users/users.service.ts
```
```ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  create(name: string) {
    return this.userModel.create({ name });
  }

  findAll() {
    return this.userModel.findAll();
  }
}
```
Create a controller to expose HTTP endpoints:
```bash
touch src/users/users.controller.ts
```
```ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.usersService.create(name);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```
Start the app locally:
```bash
npm run start
```
At this point, Sequelize will create the `users` table automatically in Neon. You can check by clicking on the `Table` tab on the menu.

## 7. Insert test data directly in Neon (SQL)
For this demo, we will directly insert the data using the Neon SQL editor. Run the following query to insert a user:
```sql
INSERT INTO users (name, "createdAt", "updatedAt")
VALUES ('User1', NOW(), NOW());
```
Verify the data exists by manually checking the table or running the following query.
```sql
SELECT * FROM users;
```
## 8. Verify the API endpoint
Fetch users via the API:
```bash
curl http://localhost:3000/users
```
or copy paste this into your browser `http://localhost:3000/users`
You should see the row you inserted in Neon returned by the API, confirming:
* Database connectivity
* Sequelize configuration
* Model registration
* API wiring

This is the response i got in my browser:
`[{"id":2,"name":"User1","createdAt":"2025-12-31T04:39:55.205Z","updatedAt":"2025-12-31T04:39:55.205Z"}]`

## 9. Deploy to koyeb
Push your code to GitHub:
```bash
git init
git add .
git commit -m "NestJS + Neon + Sequelize setup"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```
In the Koyeb dashboard:
* Create a new **Web Service**
* Select your GitHub repository
* Set environment variables:
1. `DATABASE_URL` -> Neon production connection string not the development you used for local.
* Follow the prompt and deploy

Once deployed, your API will be live on `.koyeb.app` domain.

## 10. Once your app is live
Repeat the same sql to insert the data to the `users` table in porduction from Neon's `SQL Editor`, and this time copy your koyeb's live url and append `/users`, it will return the data from your database.

## Final thoughts
You now have a complete, production-ready NestJS backend running on Koyeb, backed by PostgreSQL on Neon, with Sequelize handling persistence and real API endpoints exposing data. This setup is simple, scalable, and easy to extend with authentication, migrations, and validation as your application grows.

From here, you’re building features—not fighting infrastructure.