import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import * as util from 'util';
// import stream    from "stream";
import * as fs   from 'fs';
import { SHA224 } from "crypto-js";
import stream = require ('stream');


@Injectable()
export class FileService {

    private hashSecret: string = "";
    private fileName  : string = ""; //! fix this!
    private unlink    : any    = util.promisify(fs.unlink);
    private exist     : any    = util.promisify(fs.access);

    
    public async fileExist(path: string): Promise<boolean> {

        let result: boolean = true;

        await this.exist(`public/${path}`).catch((err: NodeJS.ErrnoException) => {
            result = false
        });

        return result;
    }


    public async removeFile(path: string): Promise<void> {

        await this.unlink(`public/${path}`).catch((err: NodeJS.ErrnoException) => {
            console.error(err);
            throw new HttpException('Error with file save', HttpStatus.BAD_REQUEST);
        });
    } 


    public async saveFile(req, filename: string, secret: string): Promise<string> {
        
        this.hashSecret = secret;

        this.fileName = this.createFileName(filename);

        await req.multipart(this.handler.bind(this), this.end);
    
        return this.fileName;
    }


    private createFileName(filename: string) {
        
        let                                    
            regType: RegExp                  = /\.[A-Za-z0-9]+$/g, 
            regRes : RegExpMatchArray | null = filename.match(regType),
            name   : string                  = "",
            type   : string                  = "";

        if(regRes == null) throw new Error('Bad filename');
            
        type = regRes[0].toLowerCase();

        name = filename.replace(`${type}`, "");
        name = SHA224(`${name}${this.hashSecret}`).toString();
        
        return `${name}${type}`;
    }


    private async handler(field: string, file: any, filename: string, encoding: string, mimetype: string): Promise<void> {

        const pipeline                    = util.promisify(stream.pipeline);
        const writeStream: fs.WriteStream = fs.createWriteStream(`public/room-img/${this.fileName}`);

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