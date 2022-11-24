import { CustomError, HTTPError } from './error';

describe('Given the class CustomError', () => {
    let error: CustomError;
    beforeEach(() => {
        error = new HTTPError(508, 'Loop Detected', 'loops');
    });
    test('When ', () => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('statusCode', 508);
        expect(error).toHaveProperty('statusMessage', 'Loop Detected');
        expect(error).toHaveProperty('message', 'loops');
        expect(error).toHaveProperty('name', 'HTTPError');
    });
    test('When ', () => {
        const errors = new HTTPError(404, 'not found', 'error');
        expect(errors).toHaveProperty('statusCode', 404);
    });
});
