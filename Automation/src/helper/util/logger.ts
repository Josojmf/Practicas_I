import {transports,format} from 'winston';

export function options(scebarioName:string){
    return {
        transports: [
            new transports.File({
                  filename: `tst-results/logs/${scebarioName}/log.log`,
                 level: 'info',
                 format: format.combine(
                    format.timestamp({format:"MMM-DD-YYYY HH:mm:ss"}),
                    format.align(),
                    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
                )
            }),
        ]
    }
}