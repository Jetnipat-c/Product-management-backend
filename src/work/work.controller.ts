import { Controller, Get, Post, Delete, Patch, HttpStatus, Param, Res, Body } from '@nestjs/common';
import { WorkDto } from './dto/work.dto';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {
    constructor(private readonly workService: WorkService){}

    @Get('/showwork')
    async showWork(@Res() res){
        let status = HttpStatus.OK;
        let response = await this.workService.showwork()
        return res.status(status).json(response);
    }

    @Get('/showwork/:work_id')
    async showProductWithSize(@Res() res, @Param('work_id') work_id: number){
        let status = HttpStatus.OK;
        let response = await this.workService.showworkwithid(work_id)
        return res.status(status).json(response);
    }
    
    @Post('/creatework')
    async createWork(@Res() res, @Body() workDto: WorkDto){
        let status = HttpStatus.OK;
        let response = await this.workService.creatework(workDto)
        return res.status(status).json(response);
    }

    @Patch('/updatework/:work_id')
    async updateStatus(@Res() res, @Body() workDto: WorkDto, @Param('work_id') work_id: number){
        let status = HttpStatus.OK;
        let response = await this.workService.updatework(work_id,workDto)
        return res.status(status).json(response);
    }

    @Delete('/deletework/:work_id')
    async deleteWork(@Res() res,  @Param('work_id') work_id: number){
        let status = HttpStatus.OK;
        let response = await this.workService.deletework(work_id)
        return res.status(status).json(response);
    }
}
