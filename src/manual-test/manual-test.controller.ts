import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MsIdentityService } from '../lib/ms-identity.service';

@Controller()
export class ManualTestController {
    constructor(private msIdentityService: MsIdentityService) {}

    @Get('/')
    async getAuthCodeUrl(@Res() res: Response) {
        const url = await this.msIdentityService.getAuthCodeUrl();
        res.redirect(url);
    }

    @Get('/redirect')
    async acquireTokenByCode(@Req() req: Request) {
        const result = await this.msIdentityService.acquireTokenByCode({
            requestQueryCode: req.query.code as any,
        });

        return result;
    }
}
