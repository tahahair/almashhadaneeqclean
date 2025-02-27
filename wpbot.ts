import { Client, LocalAuth } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";


const client = new Client({
  authStrategy: new LocalAuth(), // حفظ الجلسة بدون تسجيل دخول في كل مرة
});

client.on("qr", (qr) => {
  console.log("Scan this QR code to log in:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp Bot is ready!");
});

export async function sendWhatsAppOTP(phone: string, otp: string) {
  try {
    await client.sendMessage(phone + "@c.us", `رمز التحقق: ${otp}`);
    console.log(`OTP sent to ${phone}`);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

client.initialize();
