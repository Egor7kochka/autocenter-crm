export const formatStatus = (status: string) => {
  switch (status) {
    case "in_progress":
      return "В работе";

    case "waiting_parts":
      return "Ожидание запчастей";

    case "done":
      return "Готово";

    default:
      return "Неизвестно";
  }
};