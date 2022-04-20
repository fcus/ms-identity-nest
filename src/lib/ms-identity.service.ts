import {
    AuthenticationResult,
    AuthorizationCodeRequest,
    ConfidentialClientApplication,
} from '@azure/msal-node';
import {
    Injectable,
    InternalServerErrorException,
    Optional,
} from '@nestjs/common';
import { MsIdentityConfig } from './ms-identity.config';

interface AquireTokenByCodeParams {
    requestQueryCode: string;
}

@Injectable()
export class MsIdentityService {
    private pca: ConfidentialClientApplication;

    constructor(@Optional() private config: MsIdentityConfig) {
        if (!this.config) {
            this.config = new MsIdentityConfig();
        }

        this.pca = new ConfidentialClientApplication({
            auth: {
                clientId: this.config.clientId,
                authority: this.config.authority,
                clientSecret: this.config.clientSecret,
            },
            system: {
                loggerOptions: {
                    loggerCallback(loglevel, message, containsPii) {
                        console.log(message);
                    },
                    piiLoggingEnabled: false,
                    logLevel: this.config.logLevel,
                },
            },
        });
    }

    async acquireTokenByCode(
        params: AquireTokenByCodeParams,
    ): Promise<AuthenticationResult> {
        const tokenRequest: AuthorizationCodeRequest = {
            code: params.requestQueryCode,
            scopes: ['user.read'],
            redirectUri: this.config.redirectUri,
        };

        try {
            return this.pca.acquireTokenByCode(tokenRequest as any);
        } catch (exception) {
            throw new InternalServerErrorException(exception);
        }
    }

    async getAuthCodeUrl(): Promise<string> {
        const authCodeUrlParameters = {
            scopes: ['user.read'],
            redirectUri: this.config.redirectUri,
        };

        try {
            return this.pca.getAuthCodeUrl(authCodeUrlParameters);
        } catch (exception) {
            throw new InternalServerErrorException(exception);
        }
    }
}
