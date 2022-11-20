import { Robot } from './../interfaces/robot.js';
import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { HTTPError } from '../interfaces/error.js';

export class RobotController {
    constructor(public dataModel: Data<Robot>) {}
    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.getAll();
            resp.json(data).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }
    get(req: Request, resp: Response) {
        //
    }

    async post(req: Request, resp: Response, next: NextFunction) {
        if (!req.body.title) {
            const httpError = new HTTPError(
                406,
                'Not Acceptable',
                'Title not included in the data'
            );
            next(httpError);
            return;
        }
        try {
            const newRobot = await this.dataModel.post(req.body);
            resp.json(newRobot).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }

    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const updateRobot = await this.dataModel.patch(
                +req.params.id,
                req.body
            );
            resp.json(updateRobot).end();
        } catch (error) {
            if ((error as Error).message === 'Not found id') {
                const httpError = new HTTPError(
                    404,
                    'Not Found',
                    (error as Error).message
                );
                next(httpError);
                return;
            }
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.dataModel.delete(+req.params.id);
            resp.json({}).end();
        } catch (error) {
            if ((error as Error).message === 'Not found id') {
                const httpError = new HTTPError(
                    404,
                    'Not Found',
                    (error as Error).message
                );
                next(httpError);
                return;
            }
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }
}
