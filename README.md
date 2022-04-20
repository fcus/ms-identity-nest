# MS Identity Nest

An implementation for the `@azure/msal-node` implementation using nest.js

## How to use

This should pretty much work out-of-the-box with the default node.js setup (if your app runs on port 3000) that Azure provides, under the app registration menu:

> "Quickstart" > "Web application" > "Node.js web"

Download the package, steal the settings, add them to the `.env` and it should work as the example.

### Step 1: Install

Install the package

- `npm i --save @fcus/ms-identity-nest`

### Step 2a: Environment config

Set the environment variables. You can do this by creating an `.env` file with these properties

```
MS_IDENTITY_NEST_AUTHORITY=
MS_IDENTITY_NEST_CLIENT_ID=
MS_IDENTITY_NEST_CLIENT_SECRET=
MS_IDENTITY_NEST_LOG_LEVEL=3
MS_IDENTITY_NEST_REDIRECT_URI=
```

### Step 2b: Environment config (alternative)

Or by providing a `MsIdentityConfig` through dependency injection

```
import { Module } from '@nestjs/common';
import { MsIdentityConfig } from './ms-identity.config';
import { MsIdentityService } from './ms-identity.service';

@Module({
  providers: [
    MsIdentityService,
    {
      provide: MsIdentityConfig,
      useValue: {
        authority: '',
        clientId: '',
        clientSecret: '',
        logLevel: 3,
        redirectUri: '',
      },
    },
  ],
})
export class MsIdentityModule {}
```

### Step 3: Controller routes

Create a new nest.js controller or embed it in your existing AuthController

```
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MsIdentityService } from './ms-identity.service';

@Controller()
export class MsIdentityController {
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

    // Whichever logic you want to
    return result;
  }
}
```

## Development 

To do

- [x] Port the node.js example to nest.js
- [x] Extract the config to a class
- [x] Create a fallback to `.env` for the config
- [x] Set up Ava testing
- [ ] Replace manual test with automated one
- [ ] Thoroughly test with Ava
