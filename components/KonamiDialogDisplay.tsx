import ErrorDialog from "@/app/konami/dialogs/ErrorDialog";
import LookupDialog from "@/app/konami/dialogs/LookupDialog";
import LookupInputDialog from "@/app/konami/dialogs/LookupInputDialog";
import LookupResultDialog from "@/app/konami/dialogs/LookupResultDialog";
import PinInputDialog from "@/app/konami/dialogs/PinInputDialog";
import TimeoutDialog from "@/app/konami/dialogs/TimeoutDialog";

type Props = {
  activeDialog: string | null;
  aspectRatioClass: string;
  uploadedImage: string;
  pos: number;
};

export default function ThemePickerDisplay({
  activeDialog,
  aspectRatioClass,
  uploadedImage,
  pos,
}: Props) {
  return (
    <>
      {activeDialog === "LookupDialog" && (
        <LookupDialog
          aspectRatio={aspectRatioClass}
          imgSrc={uploadedImage}
          animate="true"
          pos={pos}
        />
      )}
      {activeDialog === "LookupInputDialog" && (
        <LookupInputDialog animate="true" pos={pos} />
      )}
      {activeDialog === "LookupResultDialog" && (
        <LookupResultDialog animate="true" pos={pos} />
      )}
      {activeDialog === "ErrorDialog" && (
        <ErrorDialog animate="true" pos={pos} />
      )}
      {activeDialog === "PinInputDialog" && (
        <PinInputDialog animate="true" pos={pos} />
      )}
      {activeDialog === "TimeoutDialog" && (
        <TimeoutDialog animate="true" pos={pos} />
      )}
    </>
  );
}
