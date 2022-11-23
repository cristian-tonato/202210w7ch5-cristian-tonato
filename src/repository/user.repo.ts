import createDebug from 'debug';
import { model } from 'mongoose';
import { User, UserI, userSchema } from '../entities/users.js';
import { passwdEncrypt } from '../services/auth.js';
import { BasicRepo, id } from './data.js';
const debug = createDebug('W8:repositories:user');
export class UserRepository implements BasicRepo<UserI> {
    static instance: UserRepository;

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    #Model = model('User', userSchema, 'users');
    private constructor() {
        debug('instance');
    }

    async get(id: id): Promise<UserI> {
        debug('get', id);
        const result = await this.#Model.findById(id); //as User;
        if (!result) throw new Error('Not found id');
        return result as UserI;
    }

    async post(data: Partial<UserI>): Promise<UserI> {
        // ESTO HACE REGISTER
        debug('post', data);
        if (typeof data.passwd !== 'string') throw new Error('');
        data.passwd = await passwdEncrypt(data.passwd);
        const result = await this.#Model.create(data);
        return result as UserI;
    }

    async find(search: { [key: string]: string }): Promise<UserI> {
        debug('find', { search });
        const result = await this.#Model.findOne(search); //as User;
        if (!result) throw new Error('Not found id');
        return result as unknown as UserI;
    }
}
