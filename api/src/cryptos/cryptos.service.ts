import { Injectable } from '@nestjs/common';
import { Crypto, CryptoDocument } from './schemas/crypto.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCryptoDto } from './dto/createCrypto.dto';

import { CoinGeckoClient } from 'coingecko-api-v3';
const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
});

@Injectable()
export class CryptosService {
    constructor(
        @InjectModel(Crypto.name)
        private cryptoModel: Model<CryptoDocument>,
    ) {}

    // Update cryptos in our platform from Coin-Gecko-API.
    async updateCryptos(): Promise<any> {
        let cryptos = await this.findCryptos();
        let cryptosToStore = await CryptosService.getCryptosFromCoinGecko();

        if (cryptos.length == 0) {
            return await this.storeCoinGeckoCryptos(cryptosToStore);
        } else {
            cryptos.forEach(async(value, index) => {
                await this.updateCryptosDb(
                    cryptosToStore[index].id,
                    cryptosToStore[index].current_price,
                    cryptosToStore[index].high_24h,
                    cryptosToStore[index].low_24h,
                    cryptosToStore[index].price_change_24h,
                    cryptosToStore[index].market_cap_rank
                );
            }, this);
        }
    }

    // Get all cryptos from Coin-Gecko-API.
    private static async getCryptosFromCoinGecko(): Promise<any> {
        return await client.coinMarket({
            per_page: 300,
            vs_currency: 'eur',
            ids: ""
        }).then((result) => {
            return result;
        });
    }

    // Update one crypto in our platform.
    private async updateCryptosDb(
        id: string, cp: number, h: number, l: number, pc: number, mcr: number
    ): Promise<any> {
        return this.cryptoModel.updateOne(
            { id: id },
            { $set: {
                current_price: cp,
                high_24h: h,
                low_24h: l,
                price_change_24h: pc,
                Open: (cp - pc),
                market_cap_rank: mcr
            }}
        );
    }

    // Get all cryptos from our platform.
    private async findCryptos(): Promise<CryptoDocument[]> {
        return this.cryptoModel.find({ _key: { $eq: 'coin-gecko' } }).exec();
    }

    // Store cryptos from Coin-Gecko-API in our database.
    private async storeCoinGeckoCryptos(cryptos): Promise<any> {
        return this.cryptoModel.insertMany(cryptos);
    }

    // Route: GET /cryptos[?cmids={cm}] : Get cryptos where cmid in cmids.
    async listCryptosByCmids(cmids?: [], skip = 0, limit = 300): Promise<any> {
        const count = await this.cryptoModel.count().then((result) => {
            return result;
        });
        const result = await this.cryptoModel
            .find(
                typeof cmids === 'undefined' ? {} : { id: { $in: cmids } },
                {},
                { skip: parseInt(String(skip)), limit: parseInt(String(limit)) },
            )
            .then((result) => {
                return result;
            });

        return { count, result };
    }

    // Route: GET /cryptos/:cmid : Get one crypto.
    async showCrypto(cmid: string): Promise<CryptoDocument[]> {
        return await this.cryptoModel
            .find({ id: { $eq: cmid } })
            .then((result) => {
                return result;
            });
    }

    // Route: POST /cryptos : Add one crypto to our platform.
    async createCrypto(createCryptoDto: CreateCryptoDto): Promise<CryptoDocument[]> {
        createCryptoDto._key = 'the-count-of-money';
        (typeof createCryptoDto.Open === 'undefined') ?
            createCryptoDto.Open = null :
            createCryptoDto.Open = createCryptoDto.current_price - createCryptoDto.price_change_24h;

        await this.cryptoModel.insertMany(createCryptoDto);
        return await this.showCrypto(createCryptoDto.id);
    }

    // Route: DELETE /cryptos/:cmid : remove one crypto from our platform.
    async deleteCrypto(cmid: string): Promise<any> {
        return await this.cryptoModel
            .deleteOne({ id: { $eq: cmid } })
            .then((result) => {
                return result;
            });
    }


}