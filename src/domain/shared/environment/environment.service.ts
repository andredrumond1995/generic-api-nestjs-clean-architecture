import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { EnvironmentVariableNotFound } from '@domain/exceptions/internal.exception';
@Injectable()
export class EnvironmentService {
	private static _loadedEnvs: string | number | { [key: string]: string };
	constructor() {
		if (!EnvironmentService._loadedEnvs) {
			const { parsed } = dotenv.config({
				path: `env-files/.config.${(process.env.NODE_ENV || 'development') as string}.env`
			});
			EnvironmentService._loadedEnvs = parsed;
		}
	}
	getEnv(envName: string) {
		if (!EnvironmentService._loadedEnvs[envName]) throw new EnvironmentVariableNotFound(envName);
		return EnvironmentService._loadedEnvs[envName];
	}
}
