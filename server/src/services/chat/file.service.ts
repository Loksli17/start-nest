import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import * as util from 'util';
// import stream    from "stream";
import * as fs   from 'fs';

import stream = require ('stream');


@Injectable()
export class FileService {

    // private hashSecret: strin


    public async saveFile(req, dataItemHandler?: (key: any, value: any) => void): Promise<void>{
        
        const multipart = await req.multipart(this.handler, this.end);
        
        if(dataItemHandler != undefined) multipart.on('field', (key: any, value: any) => {
            dataItemHandler(key, value);
        });
    }


    private async handler(field: string, file: any, filename: string, encoding: string, mimetype: string): Promise<void> {

        const pipeline                    = util.promisify(stream.pipeline);
        const writeStream: fs.WriteStream = fs.createWriteStream(`public/room-img/${filename}`);

        try {
            await pipeline(file, writeStream);
        } catch (error) {
            throw new HttpException('Error with file upload', HttpStatus.BAD_REQUEST);
        }

        return;
    }


    private async end(error): Promise<void> {
        
        if(error){
            throw new HttpException('Error with file', HttpStatus.BAD_REQUEST);
        }

        return;
    } 
    
}