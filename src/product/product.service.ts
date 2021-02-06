import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE } from 'src/config/message/global.configure';
import { Work } from 'src/work/entity/work.entity';
import { Workflow } from 'src/workflow/entity/workflow.entity';
import { WorkflowService } from 'src/workflow/workflow.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';
const axios = require('axios');
const QRCode = require("qrcode");
@Injectable()
export class ProductService {
    constructor(
    @Inject('PRODUCT_REPOSITORY') private product: typeof Product,
    @Inject('WORKFLOW_REPOSITORY') private workflow: typeof Workflow,
    @Inject('WORK_REPOSITORY') private work: typeof Work,
    private readonly workflowService: WorkflowService
    ){}
    
    async showproduct(){
        return await this.product.findAll();
    }

    async showproductwithid(product_id: number){
        return await this.product.findOne({
            where: {product_id:product_id}
        });
    }

    async timelineproduct (product_id: number){
        console.log(product_id)
        let result = await this.workflow.findAll({
            where: {
                product_id: product_id
            },
            attributes: ['workflow_start','work_id','product_id'],
            include: [Work]
        })
        return result
    }

    async createproduct(productDto: ProductDto){
        const work_id =  1
        const work = await this.work.findByPk(1)
        if (work) {
            let result = await this.product.create(productDto)
        //console.log('After create',result.dataValues)
        let workflow = await this.workflowService.create_timestamp_product(result.product_id,work_id)
        let product = await this.product.findOne({
            where: {product_id:result.product_id}
        })
        QRCode.toFile(
            `images/product/product_${product.product_id}.jpg`,
            `${JSON.stringify(product)}`,
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
        )
        const payload = {
            product_id: product.product_id,
            product_size: product.product_size,
            product_width: product.product_width,
            product_color: product.product_color,
            //work_id: product.work_id,
            photo: `images/product/product_${product.product_id}.jpg`
        }
        await product.update(payload)
        return { pathfile: `product_${product.product_id}.jpg`}
        }

        else {
            return MESSAGE.CREATE_PRODUCT_ERROR
        }
        
        //return { pathfile: `images/product/product_${product.product_id}.png`}
    }

    async updateproduct(product_id: number, productDto: ProductDto){
        let result =  await this.product.findOne({
            where: {product_id:product_id}
        })
        if( result != null){
            return result.update(productDto)
        }
        else
            return MESSAGE.VALUE_DELETED
    }

    async deleteproduct(product_id: number){
        let result =  await this.product.destroy({
            where: {product_id:product_id}
        })
        console.log('result = ',result)
        return MESSAGE.DELETE_PRODUCT_SUCCEED;
    }

    async product_work1(productDto: ProductDto){
        const work_id = 2
        let result =  await this.product.findOne({
            where: {product_id:productDto.product_id}
        })
        
        if (result){
            let check_work = await this.check_work_timeline(productDto.product_id,work_id)
            if (check_work){
                let final = await this.workflowService.create_timestamp_product(productDto.product_id,work_id)
            return MESSAGE.CREATE_WORKFLOW_SUCCESSD
            }
            else return MESSAGE.CREATE_WORKFLOW_ERROR
          
        }
        else
            return MESSAGE.CREATE_WORKFLOW_ERROR
    }

    async product_work2(productDto: ProductDto){
        const work_id = 3
        let result =  await this.product.findOne({
            where: {product_id:productDto.product_id}
        })
        if (result){
          let final = await this.workflowService.create_timestamp_product(productDto.product_id,work_id)
            return final
        }
        else
            return MESSAGE.CREATE_WORKFLOW_ERROR
    }

    async product_work3(productDto: ProductDto){
        const work_id = 4
        let result =  await this.product.findOne({
            where: {product_id:productDto.product_id}
        })
        if (result){
          let final = await this.workflowService.create_timestamp_product(productDto.product_id,work_id)
            return final
        }
        else
            return MESSAGE.CREATE_WORKFLOW_ERROR
    }

    async check_work_timeline(product_id: any,work_id: any){
        const result = await this.workflow.findOne({
            where: { product_id: product_id,
            work_id: work_id}
        })
        //console.log("result = ",result)
        if(result != null){
            return false
        }
        else return true
    }

}
