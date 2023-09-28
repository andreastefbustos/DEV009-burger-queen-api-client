import { RiCloseCircleFill } from "react-icons/ri";

interface CustomAlertProps {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function CustomAlert({show, onClose, title, message}: CustomAlertProps) {
  if(!show) return null;

  return (
    <div className="custom-alert">
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