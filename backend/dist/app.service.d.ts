import { Repository } from 'typeorm';
import { User } from './typeorm/User';
export declare class AppService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getHello(): string;
}
