import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE } from 'src/config/message/global.configure';
import { StatusDto } from './dto/status.dto';
import { Status } from './entity/status.entity';

@Injectable()
export class StatusService {
    constructor(@Inject('STATUS_REPOSITORY') private status: typeof Status){}

    async showstatus(){
        return await this.status.findAll();
    }

    async createstatus(statusDto: StatusDto){
        
        return await this.status.create(statusDto)
        //MESSAGE.CREATE_STATUS_SUCCESS
    }

    async updatestatus(status_id: number,statusDto: StatusDto){
        let result =  await this.status.findByPk(status_id)
        if( result != null){
            return result.update(statusDto)
        }
        else
            return MESSAGE.VALUE_DELETED;
    }

    async deletestatus(status_id: number){
        let result =  await this.status.destroy({
            where: {status_id:status_id}
        })
        console.log('result = ',result)
        return MESSAGE.DELETE_STATUS_SUCCEED;
    }
}
