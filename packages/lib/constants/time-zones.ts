import { timeZonesNames } from '@vvo/tzdb';

export const DEFAULT_DOCUMENT_TIME_ZONE = 'Etc/UTC';

// Bethof: the certificate and audit log pages show dates in Brasília time, day first, with a 24-hour clock.
export const BETHOF_TIME_ZONE = 'America/Sao_Paulo';
export const BETHOF_DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm:ss (ZZZZ)';

export const TIME_ZONES = ['Etc/UTC', ...timeZonesNames];
