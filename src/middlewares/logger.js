import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

const { format, transports } = winston;  

let uuid;
let loggerInstance;  
let clientIP;
let startTime;
let pingId;

const logFormat = format.printf(({ message, level }) => {
  const dt = DateTime.now();
  const timestamp = dt.toUTC().toISO();
  const { url, status, body } = message?.e?.extensions?.response || {};
  const elapsedTime = new Date().getTime() - startTime;
  return `time="${timestamp}" level=${level} msg=${JSON.stringify(body || message?.Msg || message, null, 0)}${clientIP ? ` clientIp=${clientIP} ` : ''}${
    elapsedTime ? ` elapsedTime="${elapsedTime}ms" ` : ''} requestId="${uuid}" ${status ? `status=${status} ` : ''} ${pingId ? `userId=${pingId} ` : ''}${url ? `request="${url}" ` : ''}`;
});

const myLoggerLevel = 'debug'; // get this form env file 

const level = ['debug', 'info', 'warn', 'error'].includes(myLoggerLevel) ? myLoggerLevel : 'error';

const consoleLog = new transports.Console({ format: format.combine(format.colorize(), logFormat) });

winston.addColors({
  error: 'red',
  warn: 'yellow',
});

const Logger = () => 
  winston.createLogger({
    level,
    format: format.combine(
      format.prettyPrint(true),
      logFormat
    ),
    transports: consoleLog,
  });


const getLoggerInstance = (id) => {
  setStartTime(new Date().getTime());
  if (id) {
    uuid = id;
  } else if (!uuid) {
    uuid = uuidv4();
  }
  if (!loggerInstance) {
    loggerInstance = Logger();
  }
  return loggerInstance;
};

const setStartTime = (time) => {
  startTime = time;
};

export {
  getLoggerInstance
};
