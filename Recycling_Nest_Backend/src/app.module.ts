import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { CompaniesModule } from "./companies/companies.module";
import { WasteTypeModule } from "./waste-type/waste-type.module";
import { CompanyWasteTypeModule } from "./company-waste-type/company-waste-type.module";
import { TrashBinModule } from "./trash-bin/trash-bin.module";
import { BinWasteTypeModule } from "./bin-waste-type/bin-waste-type.module";
import { CollectionModule } from "./collection/collection.module";
import { ConfigModule } from "@nestjs/config";
import { TreatmentPointModule } from './treatment-point/treatment-point.module';
import { AuthModule } from './auth/auth.module';
import { Feedback } from "./feedback/entities/feedback.entity";
import { FeedbackModule } from "./feedback/feedback.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    UsersModule,
    CompaniesModule,
    WasteTypeModule,
    CompanyWasteTypeModule,
    TrashBinModule,
    BinWasteTypeModule,
    CollectionModule,
    TreatmentPointModule,
    AuthModule,
    FeedbackModule
  ],
})
export class AppModule {}
