// Серверная функция Netlify: передаёт заявку в Telegram без раскрытия секретов клиенту.
exports.handler = async (event) => {
  const headers = { "Content-Type": "application/json; charset=utf-8" };

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...headers, Allow: "POST" },
      body: JSON.stringify({ ok: false, error: "Разрешён только POST-запрос." }),
    };
  }

  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  if (!token || !chatId) {
    console.error("Не настроены переменные окружения Telegram.");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: "Сервис заявок временно недоступен." }),
    };
  }

  try {
    const { name, contact, task } = JSON.parse(event.body || "{}");

    if (![name, contact, task].every((value) => typeof value === "string" && value.trim())) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: "Заполните все поля формы." }),
      };
    }

    const text = [
      "Новая заявка с сайта «Импульс»",
      `Имя: ${name.trim()}`,
      `Контакт: ${contact.trim()}`,
      `Задача: ${task.trim()}`,
    ].join("\n");

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!response.ok) {
      console.error("Telegram API вернул ошибку:", response.status);
      throw new Error("Telegram API unavailable");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error("Ошибка отправки заявки:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: "Не удалось отправить заявку." }),
    };
  }
};
