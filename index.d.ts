declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN: string;
            CLIENT_ID: string;
            CLIENT_NAME: string | "CimaBot";
            STATUS_ROTATE_MS: number | 30_000;
            GUILD_ID: string;
            UNVERIFIED_ROLE_ID: string;
            ASPIRANTE_ROLE_ID: string;
            INSTITUTIONAL_EMAIL_DOMAIN: string | "uabc.edu.mx";
            RESEND_API_KEY: string;
            RESEND_FROM_EMAIL: string | "Cima <verificacion@uabc.tech>";
        }
    }

    
    // Here you can add function and types declaration for global access

    // Here you can add function and params declaration for Strings
    interface String {
    }

    // Here you can add function and params declaration for Arrays

    interface Array {
        
    }
}
