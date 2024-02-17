// Import necessary modules and types
import { Request, Response, NextFunction } from 'express'
import { handleSendEmail } from '../helper/sendEmail'
import { EmailDataType } from '../types/emailDataType'

export const contactUs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, subject, message } = req.body

    const emailData: EmailDataType = {
      email,
      subject, 
      html: `<p>${message}</p>`, 
    }

    await handleSendEmail(emailData)

    res.status(200).send({
      message: 'Your message has been sent successfully. We will contact you soon.',
    })
  } catch (error) {
    console.error('Error sending contact us email:', error)
    next(error)
  }
}
