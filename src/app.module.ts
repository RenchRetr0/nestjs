import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';

import { configModule } from './configure.root';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    configModule,
    MongooseModule.forRoot(
      process.env.MONGODB_WRITE_CONNECTION_STRING,
    ),
    TokenModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [
    JwtStrategy,
  ],
})
export class AppModule {}
