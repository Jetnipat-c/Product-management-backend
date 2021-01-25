import { Inject, Injectable } from '@nestjs/common';
import { values } from 'sequelize/types/lib/operators';
import { Workflow } from './entity/workflow.entity';

@Injectable()
export class WorkflowService {
    constructor(@Inject('WORKFLOW_REPOSITORY') private workflow: typeof Workflow){}
    async create_timestamp_product (product_id: number,work_id: number) {
        var current = new Date()
        let payload = {
            workflow_start: current.toLocaleString(),
            work_id: work_id,
            product_id: product_id
        }
        await this.workflow.create(payload)
    }

    // async findById (product_id: number){
    //     //console.log(Object.values(product_id))
    //     const data = await this.workflow.findAll({
    //         where: {
    //             product_id: Object.values(product_id).toString()
    //         }
    //     })
    //     return data
    // }
}
