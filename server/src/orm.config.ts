import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function ormConfig(): TypeOrmModuleOptions {
    const commonConf = {
        SYNCRONIZE: false,
        ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
        MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
        CLI: {
            migrationsDir: 'src/migrations',
        },
        MIGRATIONS_RUN: true,
    };

    let ormconfig: TypeOrmModuleOptions = {
        name: 'default',
        type: 'sqlite',
        database: '../target/db/sqlite-dev-db.sql',
        logging: true,
        synchronize: true,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };

    if (
        process.env.BACKEND_ENV     === 'prod' &&
        typeof process.env.HOST     !== 'undefined' &&
        typeof process.env.DATABASE !== 'undefined' &&
        typeof process.env.DB_PORT     !== 'undefined' &&
        typeof process.env.DB_USERNAME !== 'undefined' &&
        typeof process.env.DB_PASSWORD !== 'undefined'
    ) {
        console.log("Connected to DB!!!")
        ormconfig = {
            name: 'default',
            type: 'mysql',
            database: process.env.DATABASE,
            host: process.env.HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            logging: false,
            synchronize: commonConf.SYNCRONIZE,
            entities: commonConf.ENTITIES,
            migrations: commonConf.MIGRATIONS,
            cli: commonConf.CLI,
            migrationsRun: commonConf.MIGRATIONS_RUN,
        };
    } else {
        console.log("Not connected to DB!!!")
    }

    if (process.env.BACKEND_ENV === 'test') {
        ormconfig = {
            name: 'default',
            type: 'sqlite',
            database: ':memory:',
            keepConnectionAlive: true,
            logging: true,
            synchronize: true,
            entities: commonConf.ENTITIES,
            migrations: commonConf.MIGRATIONS,
            cli: commonConf.CLI,
            migrationsRun: commonConf.MIGRATIONS_RUN,
        };
    }
    return ormconfig;
}

export { ormConfig };
