import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NotificationBox } from "app/components";
import { actions } from "app/store";
import { LayoutState, RootState } from "app/store/types";
import { AppTheme } from "app/theme/types";
import cls from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Icon } from "./receive_money.svg";

export interface WalletMessageProps extends React.HTMLAttributes<HTMLDivElement> {
};

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
  },
  notificationMessage: {
    fontWeight: 400,
    margin: theme.spacing(1, 0),
    color: theme.palette.type === "light" ? theme.palette.colors.zilliqa.neutral["100"] : theme.palette.colors.zilliqa.neutral["200"]
  },
  notificationSymbol: {
    margin: theme.spacing(1, 1.5, 0),
  },
  warning: {
    width: theme.spacing(8),
  },
}));

const WalletMessage: React.FC<WalletMessageProps> = (props: WalletMessageProps) => {
  const { children, className, ...rest } = props;
  const layoutState = useSelector<RootState, LayoutState>(state => state.layout);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onRemove = () => {
    dispatch(actions.Layout.hideWalletMessage());
  };

  if (layoutState.walletInfoHidden || layoutState.showPoolType !== "add") return null;

  return (
    <NotificationBox {...rest} className={cls(classes.root, className)} onRemove={onRemove}>
      <Box className={cls(classes.notificationSymbol, classes.warning)}>
        <Icon />
      </Box>
      <Box ml={1}>
        <Typography className={classes.notificationMessage} variant="body1">
          Below you will see the tokens you currently have in your wallet that are also approved to be used on CARBON swap.
        </Typography>
      </Box>
    </NotificationBox>
  );
};

export default WalletMessage;
