import { MigrationParameters, LogLevel } from '@nsfilho/migration';

const delay = async (timer: number) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timer);
    });

export const up = async ({ log }: MigrationParameters): Promise<void> => {
    // sample 1: find a registry in a collection and forEach
    log({ message: `Delay started`, level: LogLevel.normal });
    await delay(10000);
    log({ message: `Delay finished`, level: LogLevel.normal });
};
