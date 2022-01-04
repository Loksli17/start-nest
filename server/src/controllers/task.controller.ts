import { Controller, Get } from "@nestjs/common";


@Controller('task')
export class TaskController {

    @Get('get-all')
    public getAll(): Array<Record<string, any>>{
        return [{id: 1, text: 'text', date: '2022-04-01'}];
    }
}