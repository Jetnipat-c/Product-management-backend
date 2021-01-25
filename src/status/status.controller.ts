import { Controller, Get, Post, Delete, Patch, HttpStatus, Param, Res, Body  } from '@nestjs/common';
import { StatusDto } from './dto/status.dto';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService){}

    @Get('/showstatus')
    async showStatus(@Res() res){
        let status = HttpStatus.OK;
        let response = await this.statusService.showstatus()
        return res.status(status).json(response);
    }
    
    @Post('/createstatus')
    async createStatus(@Res() res, @Body() statusDto: StatusDto){
        let status = HttpStatus.OK;
        let response = await this.statusService.createstatus(statusDto)
        return res.status(status).json(response);
    }

    @Patch('/updatestatus/:status_id')
    async updateStatus(@Res() res, @Body() statusDto: StatusDto, @Param('status_id') status_id: number){
        let status = HttpStatus.OK;
        let response = await this.statusService.updatestatus(status_id,statusDto)
        return res.status(status).json(response);
    }

    @Delete('/deletestatus/:status_id')
    async deleteStatus(@Res() res, @Param('status_id') status_id: number){
        let status = HttpStatus.OK;
        let response = await this.statusService.deletestatus(status_id)
        return res.status(status).json(response);
    }
}
