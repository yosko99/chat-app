import { AppService } from './app.service';
import { CreateConversationDto } from './dto/CreateConversationDto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    createUser(createUserDto: CreateConversationDto): void;
}
