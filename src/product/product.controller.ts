import { Controller, Get, Post, Delete, Patch, HttpStatus, Param, Res, Body } from '@nestjs/common';
import { Config } from 'src/config/config';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get('/stock')
    async showProduct(@Res() res){
        let status = HttpStatus.OK;
        let response = await this.productService.showproduct()
        return res.status(status).json(response);
    }

    @Get('/stock/:product_id')
    async showProductWithSize(@Res() res, @Param('product_id') product_id: number){
        let status = HttpStatus.OK;
        let response = await this.productService.showproductwithid(product_id)
        return res.status(status).json(response);
    }

    @Get('/timeline:product_id')
    async timelineProduct(@Res() res, @Param('product_id') product_id: number){
        console.log(product_id)
        let status = HttpStatus.OK;
        let response = await this.productService.timelineproduct(product_id)
        return res.status(status).json(response);
    }
    
    @Post('/createproduct')
    async createProduct(@Res() res, @Body() productDto: ProductDto){
        let status = HttpStatus.OK;
        let response = await this.productService.createproduct(productDto)

        return res.status(status).json(response);
    }

    @Get('img/:path')
    async download_img(@Param('path') Image, @Res() res){
        return res.sendFile(Image,{ root: `images${Config.ImagePath.product}`})
    }

    @Patch('/updateproduct/:product_id')
    async updateProduct(@Res() res, @Body() productDto: ProductDto,  @Param('product_id') product_id: number){
        let status = HttpStatus.OK;
        let response = await this.productService.updateproduct(product_id,productDto)
        return res.status(status).json(response);
    }

    @Delete('/deleteproduct/:product_id')
    async deleteProduct(@Res() res, @Param('product_id') product_id: number){
        let status = HttpStatus.OK;
        let response = await this.productService.deleteproduct(product_id)
        return res.status(status).json(response);
    }

    @Post('/product_work1')
    async product_Work1(@Res() res, @Body() productDto: ProductDto){
        let status = HttpStatus.OK;
        let response = await this.productService.product_work1(productDto)
        return res.status(status).json(response);
    }

    @Post('/product_work2')
    async product_Work2(@Res() res, @Body() productDto: ProductDto){
        let status = HttpStatus.OK;
        let response = await this.productService.product_work2(productDto)
        return res.status(status).json(response);
    }

    @Post('/product_work3')
    async product_Work3(@Res() res, @Body() productDto: ProductDto){
        let status = HttpStatus.OK;
        let response = await this.productService.product_work3(productDto)
        return res.status(status).json(response);
    }

    @Get('/qr_code/:filename')
    async get_qr_code(@Res() res, @Param('filename') filename){
        console.log(filename)
        return res.download("D:/TMP Project/product-management-backend/images/product/" + filename)
    }

}
