import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MERN Estate" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);

    // If the error is related to authentication, give a more detailed message
    if (error.response && error.response.includes("534-5.7.9")) {
      throw new Error(
        "Authentication failed. Please check your email credentials or use an App Password."
      );
    }

    // Throw a generic error for any other failures
    throw new Error("Email sending failed. Please try again later.");
  }
};

export default sendEmail;
