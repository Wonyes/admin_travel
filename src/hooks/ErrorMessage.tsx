import { ErrorMsg } from "../assets/style/common/useCommonStyle";
import { useErrorStore } from "./store/useErrorStore";

interface ErrorMessageProps {
  name?: string;
  message?: string;
}

export default function ErrorMessage({ name, message }: ErrorMessageProps) {
  const { messages } = useErrorStore();

  if (message) {
    return <ErrorMsg>{message}</ErrorMsg>;
  }

  if (name && messages[name]) {
    return <ErrorMsg>{messages[name]}</ErrorMsg>;
  }

  return null;
}
