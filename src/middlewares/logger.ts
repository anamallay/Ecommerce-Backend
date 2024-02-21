// import { NextFunction, Request, Response } from 'express';
// import fs from 'fs';

// const myLogger = (req: Request, res: Response, next: NextFunction) => {
//   const filePath = './src/logs/requests.txt';
//   const currentDate = new Date();
//   const date = currentDate.toLocaleDateString();
//   const time = currentDate.toLocaleTimeString();

//   const msg = `Method: ${req.method}, Path: ${req.path}, Date: ${date}, Time: ${time}\n`;

//   fs.appendFile(filePath, msg, (err) => {
//     if (err) {
//       return next(new Error('FAILED TO LOG'));
//     }
//     next();
//   })
// };

// export default myLogger;
import { NextFunction, Request, Response } from 'express'

const myLogger = async (req: Request, res: Response, next: NextFunction) => {
  const currentDate = new Date()
  const date = currentDate.toLocaleDateString()
  const time = currentDate.toLocaleTimeString()

  const logMessage = `Method: ${req.method}, Path: ${req.path}, Date: ${date}, Time: ${time}`

  // Example function to send log to a remote service
  try {
    await sendLogToRemoteService(logMessage)
    next()
  } catch (err) {
    console.error('Failed to send log to remote service', err)
    next(new Error('FAILED TO LOG'))
  }
}

// Mockup function for sending logs to a remote service
async function sendLogToRemoteService(message: string) {
  // Implement API call to remote logging service here
  console.log('Sending log message to remote service:', message)
  // Simulate API call success/failure
}

export default myLogger
