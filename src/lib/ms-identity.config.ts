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
            params?.authority ?? process.env.MS_IDENTITY_NEST_AUTHORITY ?? null;

        this.clientId =
            params?.clientId ?? process.env.MS_IDENTITY_NEST_CLIENT_ID ?? null;

        this.clientSecret =
            params?.clientSecret ??
            process.env.MS_IDENTITY_NEST_CLIENT_SECRET ??
            null;

        this.loggerCallback =
            params?.loggerCallback ?? this.defaultLoggerCallback;

        this.logLevel =
            params?.logLevel ?? (process.env.MS_IDENTITY_NEST_LOG_LEVEL as any);

        this.redirectUri =
            params?.redirectUri ??
            process.env.MS_IDENTITY_NEST_REDIRECT_URI ??
            null;
    }
}
