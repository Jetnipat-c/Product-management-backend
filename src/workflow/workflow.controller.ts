import { Body, Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { WorkflowService } from './workflow.service';

@Controller('workflow')
export class WorkflowController {
    constructor(private readonly workflowService: WorkflowService){}

    // @Get('findbyid')
    // async findByid(@Res() res, @Body() product_id: number){
    //     let status = HttpStatus.OK;
    //     let response = await this.workflowService.findById(product_id)
    //     return res.status(status).json(response)
    // }
}
