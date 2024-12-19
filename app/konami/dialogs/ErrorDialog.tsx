import "../konami.scss";

type Props = {
  pos: number;
  animate?: string;
};

export default function ErrorDialog({ pos, animate }: Props) {
  return (
    <div className={`custom-dialog-backdrop margin-${pos}`}>
      <div className={`custom-dialog ${animate === "true" ? "animate" : ""}`}>
        <div className="custom-dialog-header">
          <h2>Error</h2>
        </div>
        <div className="custom-dialog-content">
          <p>
            Redeem Comp Points failed. The amount total must be greater than
            zero. It is likely you have already completed payment for your
            order. Check your acount balance and try again if necessary.
          </p>
        </div>
        <div className="custom-dialog-actions">
          <button className="dialog-button retry-button">Try again</button>
          <button className="dialog-button cancel-button">Close</button>
        </div>
        <p className="custom-dialog-content">
          Error: Redeem Comp Points failed. Log statement here
        </p>
      </div>
    </div>
  );
}
