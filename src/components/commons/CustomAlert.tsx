import { RiCloseCircleFill } from "react-icons/ri";

interface CustomAlertProps {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "success" | "error";
}

export function CustomAlert({show, onClose, title, message, type}: CustomAlertProps) {
  if(!show) return null;

  const alertClass = type === "success" ? "success" : "error";
  console.log(alertClass)

  return (
    <div className={`custom-alert ${alertClass}`}>
      <div className="custom-alert-header">
        <h4>{title}</h4>
        <button className="button-alert-message" onClick={onClose}>
          <RiCloseCircleFill />
        </button>
      </div>
      <div className="custom-alert-body">
        <p>{message}</p>
      </div>
    </div>
  );
}