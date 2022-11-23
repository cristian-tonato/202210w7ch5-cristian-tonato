import createDebug from 'debug';
import mongoose, { model, Types } from 'mongoose';
import { RobotI, ProtoRobotI } from '../entities/robots.js';
import { robotSchema } from '../entities/robots.js';
import { Repo, id } from './data.js';
const debug = createDebug('W8:repositories:robot');

export class RobotRepository implements Repo<RobotI> {
    static instance: RobotRepository;

    public static getInstance(): RobotRepository {
        if (!RobotRepository.instance) {
            RobotRepository.instance = new RobotRepository();
        }
        return RobotRepository.instance;
    }

    #Model = model('Robot', robotSchema, 'robots');
    //
    private constructor() {
        debug('instance');
    }

    async getAll(): Promise<Array<RobotI>> {
        debug('getAll');
        return this.#Model.find().populate('owner', {
            robots: 0,
        });
    }
    async get(id: id): Promise<RobotI> {
        debug('get', id);
        const result = await this.#Model
            .findById(id)
            .populate<{ _id: Types.ObjectId }>('owner', {
                robots: 0,
            });
        if (!result) throw new Error('Not found id');
        return result as RobotI;
    }

    async find(search: {
        [key: string]: string | number | Date;
    }): Promise<RobotI> {
        debug('find', { search });
        const result = await this.#Model.findOne(search).populate('owner', {
            robots: 0,
        }); //as Robot;
        if (!result) throw new Error('Not found id');
        return result as unknown as RobotI;
    }

    async post(data: ProtoRobotI): Promise<RobotI> {
        debug('post', data);
        data.date = this.#generateDate(data.date as string);
        const result = await (
            await this.#Model.create(data)
        ).populate('owner', {
            robots: 0,
        });
        return result as RobotI;
    }
    async patch(id: id, data: Partial<RobotI>): Promise<RobotI> {
        debug('patch', id);
        const result = await this.#Model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .populate('owner', {
                robots: 0,
            });
        if (!result) throw new Error('Not found id');
        return result as RobotI;
    }

    async delete(id: id): Promise<{ id: id }> {
        debug('delete', id);
        const result = await this.#Model
            .findByIdAndDelete(id)
            .populate('owner', {
                robots: 0,
            });
        if (result === null) throw new Error('Not found id');
        return { id: id };
    }

    #disconnect() {
        mongoose.disconnect();
        debug(mongoose.connection.readyState);
    }

    #generateDate(date: string | undefined) {
        if (!date) return new Date();
        const validDate =
            new Date(date) === new Date('') ? new Date() : new Date(date);
        return validDate;
    }

    getModel() {
        return this.#Model;
    }
}
