import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import {CryptosHistory, CryptosHistoryDocument} from "./schemas/cryptos-history.schema";
import { Model } from "mongoose";

import { CoinGeckoClient } from 'coingecko-api-v3';
import {CreateCryptosHistoryDto} from "./dto/create-cryptos-history.dto";
const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
});

@Injectable()
export class CryptosHistoryService {
    constructor(
        @InjectModel(CryptosHistory.name)
        private cryptosHistoryModel: Model<CryptosHistoryDocument>,
    ) {}

    // Service responsible for processing the route: GET /cryptos/{cmid}/history/{period}
    // (Get cryptos histories a days ago).
    async showCryptosHistory(cmid: string, period: number): Promise<CryptosHistoryDocument[]> {
        return await this.findCryptosHistoryByInternalKey(cmid, period).then((result) => {
            if (result.length == 0) {
                return this.storeHistoryData(new CreateCryptosHistoryDto(), cmid, period);
            } else {
                return result;
            }
        }).catch((error) => { console.log(error) });
    }

    // Store histories in our platform with a key to can process an update later.
    private async storeHistoryData(createCryptosHistoryDto: CreateCryptosHistoryDto, cmid, period): Promise<any>
    {
        let OHLC_data = await CryptosHistoryService.getHistoryDataFromCoinGecko(cmid, period);

        if (typeof OHLC_data.length === 'undefined') {
            return 'Could not found crypto with the id given';
        } else {
            createCryptosHistoryDto._key = '' + cmid + '_' + period;
            createCryptosHistoryDto._cmid = cmid;
            createCryptosHistoryDto._period = period;
            createCryptosHistoryDto.OHLC_data = OHLC_data;

            console.log(createCryptosHistoryDto);

            await this.cryptosHistoryModel.insertMany(createCryptosHistoryDto);

            return await this.findCryptosHistoryByInternalKey(createCryptosHistoryDto._cmid, createCryptosHistoryDto._period)
                .then((result) => {
                    return result;
                });
        }
    }

    // Find one crypto histories from our platform.
    private async findCryptosHistoryByInternalKey(cmid: string, period: number): Promise<CryptosHistoryDocument[]>
    {
        return await this.cryptosHistoryModel.find(
            { _key: { $eq: '' + cmid + '_' + period } }
        ).then((result) => {
            return result;
        });
    }

    // Get a crypto histories from Coin-Gecko-API.
    private static async getHistoryDataFromCoinGecko(cmid, period): Promise<any> {
        return await client.coinIdOHLC({
            days: period,
            id: cmid,
            vs_currency: 'eur'
        }).then((result) => {
            return result;
        })
    }

    // Update a crypto histories from Coin-Gecko-API.
    private async updateOneCryptoHistory(key: string, OHLC_data: object): Promise<any> {
        return this.cryptosHistoryModel.updateOne(
            { _key: key },
            { $set: { OHLC_data: OHLC_data } }
        );
    }

    // Update  cryptos histories in our platform from Coin-Gecko-API.
    async updateCryptosHistories(): Promise<void> {
        let historyData = await this.cryptosHistoryModel.find().then((result) => {
           return result;
        });

        historyData.forEach(async(value) => {
            let updatedOHLC_data = await CryptosHistoryService.getHistoryDataFromCoinGecko(value._cmid, value._period);
            await this.updateOneCryptoHistory(value._key, updatedOHLC_data);
        }, this);
    }
}
