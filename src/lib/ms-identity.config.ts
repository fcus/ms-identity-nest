import * as msal from '@azure/msal-node';
import { config } from 'dotenv';

config();

export interface MsIdentityConfigConstructorParams {
    authority?: string;
    clientId?: string;
    clientSecret?: string;
    loggerCallback?: (
        level: msal.LogLevel,
        message: string,
        containsPii: boolean,
    ) => void;
    logLevel?: msal.LogLevel;
    redirectUri?: string;
}

export class MsIdentityConfig {
    authority: string;
    clientId: string;
    clientSecret: string;
    loggerCallback: (
        level: msal.LogLevel,
        message: string,
        containsPii: boolean,
    ) => void;
    logLevel: msal.LogLevel;
    redirectUri: string;

    defaultLoggerCallback = (
        loglevel: msal.LogLevel,
        message: string,
        containsPii: boolean,
    ) => {
        console.log(message);
    };

    constructor(params: MsIdentityConfigConstructorParams = {}) {
        this.authority =
            params?.authority ??
            process.env.MS_IDENTITY_NEST_AUTHORITY ??
            'MS_IDENTITY_NEST_AUTHORITY_NOT_SET';

        this.clientId =
            params?.clientId ??
            process.env.MS_IDENTITY_NEST_CLIENT_ID ??
            'MS_IDENTITY_NEST_CLIENT_ID_NOT_SET';

        this.clientSecret =
            params?.clientSecret ??
            process.env.MS_IDENTITY_NEST_CLIENT_SECRET ??
            'MS_IDENTITY_NEST_CLIENT_SECRET_NOT_SET';

        this.loggerCallback =
            params?.loggerCallback ?? this.defaultLoggerCallback;

        this.logLevel =
            params?.logLevel ?? (process.env.MS_IDENTITY_NEST_LOG_LEVEL as any);

        this.redirectUri =
            params?.redirectUri ??
            process.env.MS_IDENTITY_NEST_REDIRECT_URI ??
            'MS_IDENTITY_NEST_REDIRECT_URI_NOT_SET';
    }
}
