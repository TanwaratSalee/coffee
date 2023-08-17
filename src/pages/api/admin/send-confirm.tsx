import type { NextApiRequest, NextApiResponse } from "next";
import { ZodIssue } from "zod";

type Data = {
  success: boolean;
  message: string;
  data?: any[];
  errors?: ZodIssue[];
};

export default async function handlerSentMessage(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const message = "Your order is ready";
  const LINE_ENDPOINT = "https://api.line.me/v2/bot/message/push";
  const LINE_TOKEN =
    "hukEWhklqcmlGkERpjQdfJbimiNBGqMvl2hLwMlunC/LR8twexzSb47UU6lgVx9Do+RE2NRmb1QQjU/U+cJ+2PDTwHq4kPPF2rKJbh5YGZGe8wDFAJjzh9d6HdfqVLT7iZ5YBem9qITBGVya55BN2gdB04t89/1O/w1cDnyilFU=";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${LINE_TOKEN}`,
  };
  console.log(req.body, "12312313");
  const body = {
    to: req.body.to,
    messages: [
      {
        type: "text",
        text: req.body.message,
      },
    ],
  };

  const response = await fetch(LINE_ENDPOINT, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to send message: ${text}`);
  }
}
