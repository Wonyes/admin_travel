import { BlueBtn, WhiteBtn } from "./useButton";
import { OverlayProps, useOverlayStore } from "./store/useOverlayStore";
import OverlayContent from "@/components/common/overlay/OverlayContent";
import ModalContent from "@/components/common/overlay/ModalContent";
import ToastContent from "@/components/common/overlay/ToastContent";

interface OneButton extends Omit<OverlayProps, "subBtn"> {
  mainBtn?: string;
}

interface TwoButton extends OverlayProps {
  mainBtn: string;
  subBtn: string;
}

interface ToastProps {
  message: string;
}

export function useOverlay() {
  const { modal, alert, confirm, toast, closeOverlay, openOverlay } = useOverlayStore();

  const openAlert = (props: OneButton) => openOverlay("alert", props);
  const openModal = (props: TwoButton) => openOverlay("modal", props);
  const openConfirm = (props: TwoButton) => openOverlay("confirm", props);
  const openToast = (props: ToastProps) => {
    openOverlay("toast", props);
    setTimeout(() => {
      closeOverlay("toast");
    }, 2000);
  };

  const alertComponent = (
    <OverlayContent
      title={alert.title}
      message={alert.message}
      message2={alert.message2}
      show={alert.isShow}
      buttons={
        <BlueBtn
          onClick={() => closeOverlay("alert", true)}
          $size="var(--s-subB)"
          msg={alert.mainBtn}
        />
      }
    />
  );

  const confirmComponent = (
    <OverlayContent
      title={confirm.title}
      message={confirm.message}
      message2={confirm.message2}
      show={confirm.isShow}
      buttons={
        <>
          <WhiteBtn
            onClick={() => closeOverlay("confirm")}
            msg={confirm.subBtn}
            $pad="12px"
          />
          <BlueBtn
            onClick={() => closeOverlay("confirm", true)}
            msg={confirm.mainBtn}
            $pad="12px"
          />
        </>
      }
    />
  );

  const modalComponent = (
    <ModalContent
      title={modal.title}
      show={modal.isShow}
      buttons={
        <>
          <WhiteBtn
            onClick={() => closeOverlay("modal")}
            msg={modal.subBtn}
            $w="100px"
            $pad="12px"
          />
          <BlueBtn
            onClick={() => closeOverlay("modal", true)}
            msg={modal.mainBtn}
            $w="100px"
            $pad="12px"
          />
        </>
      }
    >
      {modal.content}
    </ModalContent>
  );

  const toastComponent = toast.isShow && <ToastContent message={toast.message} />;

  return {
    modalComponent,
    alertComponent,
    confirmComponent,
    toastComponent,
    openModal,
    openToast,
    openAlert,
    openConfirm,
    closeAlert: () => closeOverlay("alert"),
    closeConfirm: () => closeOverlay("confirm"),
  };
}
