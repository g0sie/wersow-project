import Button from "../../UI/Button/Button";

import styles from "./CollectButton.module.css";

interface CollectButtonProps {
  className?: string;
}

const CollectButton = (props: CollectButtonProps) => {
  return (
    <Button
      type="button"
      waitingForResponse={false}
      className={[styles.collectBtn, props.className].join(" ")}
    >
      Collect
    </Button>
  );
};

export default CollectButton;
