import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import {
  APPLICATION_NAME,
  frontendAddress,
} from '../../../../data/environmentVariables';

export const getPaymentSuccessPageController = myControllerHandler(
  async (req, res) => {
    // The HTML content for the payment success page
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Success</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f7fa;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }

            .container {
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                width: 80%;
                max-width: 600px;
                padding: 30px;
                text-align: center;
            }

            .icon {
                font-size: 100px;
                color: #4caf50;
                margin-bottom: 30px; /* Increased spacing */
            }

            h1 {
                color: #333333;
                font-size: 32px;
                margin-bottom: 20px; /* Increased spacing */
                line-height: 1.5; /* Increased line height */
            }

            p {
                color: #666666;
                font-size: 18px;
                margin-bottom: 30px; /* Increased spacing */
                line-height: 1.7; /* Increased line height */
            }

            .btn {
                background-color: #4caf50;
                color: white;
                padding: 15px 30px;
                font-size: 16px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                margin-bottom: 30px; /* Increased spacing */
            }

            .btn:hover {
                background-color: #45a049;
            }

            .footer {
                margin-top: 40px; /* Increased spacing */
                font-size: 14px;
                color: #999999;
                line-height: 1.5; /* Increased line height */
            }
        </style>
    </head>
    <body>

        <div class="container">
            <!-- Success Icon -->
            <div class="icon">
                ✔️
            </div>

            <!-- Title -->
            <h1>Payment Successful!</h1>

            <!-- Message -->
            <p>Your payment has been processed successfully. Thank you for your purchase!</p>

            <!-- Call to Action -->
            <a href="${frontendAddress}" class="btn">Return to Home</a>

            <!-- Footer -->
            <div class="footer">
                <p>&copy; 2025 ${APPLICATION_NAME}. All Rights Reserved.</p>
            </div>
        </div>

    </body>
    </html>
`;

    // Send the HTML content as the response
    res.status(StatusCodes.OK).send(htmlContent);
  }
);
