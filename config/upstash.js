
import { QSTASH_URL, QSTASH_TOKEN } from './env.js';
import { Client } from '@upstash/workflow';

export const workFlowClient = new Client({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
});