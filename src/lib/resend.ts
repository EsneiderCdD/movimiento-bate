import { Resend } from "resend";

let cliente: Resend | null = null;

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!cliente) cliente = new Resend(apiKey);
  return cliente;
}
