async function sendMessageToUUID(uuid: string, message: string): Promise<void> {
  const response = await fetch("/api/admin/send-confirm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: uuid,
      message: message,
    }),
  });
  return;
}

export { sendMessageToUUID };
