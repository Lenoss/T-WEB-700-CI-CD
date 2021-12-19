import { Module } from '@nestjs/common';
import { CryptosController } from './cryptos.controller';
import { CryptosService } from './cryptos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Crypto, CryptoSchema } from './schemas/crypto.schema';
import { CryptosHistory, CryptosHistorySchema } from './cryptos-history/schemas/cryptos-history.schema';
import { CryptosHistoryService } from './cryptos-history/cryptos-history.service';
import { ErrorViews } from './views/error.views';
const CronJob = require('cron').CronJob;

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Crypto.name, schema: CryptoSchema },
            { name: CryptosHistory.name, schema: CryptosHistorySchema },
        ]),
    ],
    controllers: [CryptosController],
    providers: [CryptosService, CryptosHistoryService, ErrorViews],
    exports: [CryptosService, CryptosHistoryService],
})
export class CryptosModule {
    constructor(
        private cryptosService: CryptosService,
        private cryptosHistoryService: CryptosHistoryService,
    )
    {
        // Cron job responsible for the histories and cryptos collection update.
        let updateCryptosHistoriesJob = new CronJob('* * * * *', function() {
            cryptosHistoryService.updateCryptosHistories().then(() => {
                console.log('Cryptos histories successfully updated')
            });
            cryptosService.updateCryptos().then(() => {
                console.log('Cryptos successfully updated')
            });
        }, null, true, 'Europe/Paris');
        updateCryptosHistoriesJob.start();
    }
}