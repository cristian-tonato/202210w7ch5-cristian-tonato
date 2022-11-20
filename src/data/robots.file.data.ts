import fs from 'fs/promises';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Robot } from '..//interfaces/robot';
import { Data, id } from './data.js';

export class RobotFileData implements Data<Robot> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = process.env.DATA_FILE || '';
    }

    async getAll(): Promise<Array<Robot>> {
        return fs
            .readFile(this.dataFileURL, 'utf-8')
            .then((data) => JSON.parse(data) as Array<Robot>);
    }

    async get(id: id): Promise<Robot> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data) as Array<Robot>;
            const item = aData.find((item) => item.id === id);
            if (!item) throw new Error();
            return item;
        });
    }

    async post(newRobot: Partial<Robot>): Promise<Robot> {
        const aData = await this.getAll();
        const finalRobot = { ...(newRobot as Robot), id: this.#createID() };
        aData.push(finalRobot);
        await this.#saveData(aData);
        return finalRobot;
    }

    async patch(id: id, updateRobot: Partial<Robot>): Promise<Robot> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData[index] = {
            ...aData[index],
            ...updateRobot,
        };
        await this.#saveData(aData);
        return aData[index];
    }

    async delete(id: id): Promise<void> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('Not found id');
        aData.filter((item) => item.id !== id);
        await this.#saveData(aData);
    }

    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }

    #saveData(data: Array<Robot>) {
        return fs.writeFile(this.dataFileURL, JSON.stringify(data));
    }
}
