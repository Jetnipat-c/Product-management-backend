import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE } from 'src/config/message/global.configure';
import { WorkDto } from './dto/work.dto';
import { Work } from './entity/work.entity';
const axios = require('axios');
const QRCode = require("qrcode");
@Injectable()
export class WorkService {
    constructor(@Inject ('WORK_REPOSITORY') private work: typeof Work){}

    async showwork(){
        return await this.work.findAll();
    }

    async showworkwithid(work_id: number){
        return await this.work.findOne({
            where: {work_id:work_id}
        });
    }

    async creatework(workDto: WorkDto){
        let result = await this.work.create(workDto)
        let work = await this.work.findOne({
            where: {work_id:result.work_id}
        })
        console.log('get work_id',work.work_id)
        // let port = 7777
        // let res = await axios.post(`http://127.0.0.1:${port}/genqrwork`, { work: work });
        // console.log(res.data);
        QRCode.toFile(
            `images/work/work_${work.work_id}.png`,
            `${JSON.stringify(work)}`,
            {
              color: {
                dark: "#000", // Blue dots
                light: "#0000", // Transparent background
              },
              width: 300,
            },
            function (err) {
              if (err) throw err;
              console.log("done");
            }
          );
        return MESSAGE.CREATE_STATUS_SUCCESS
    }

    async updatework(work_id: number,workDto: WorkDto){
        let result =  await this.work.findByPk(work_id)
        if( result != null){
            return result.update(workDto)
        }
        else
            return MESSAGE.VALUE_DELETED;
    }

    async deletework(work_id: number){
        let result =  await this.work.destroy({
            where: {work_id:work_id}
        })
        console.log('result = ',result)
        return MESSAGE.DELETE_STATUS_SUCCEED;
    }
}
