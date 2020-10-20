import { Box} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Notifications } from "app/components";
import MainCard from "app/layouts/MainCard";
import cls from "classnames";
import React from "react";
import WalletMessage from "./components/WalletMessage";

const useStyles = makeStyles(theme => ({
  root: {
  },
  container: {
    padding: theme.spacing(4, 8, 0),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2, 2, 0),
    },
  },
  createButton: {
    borderRadius: 4,
  },
  actionButton: {
    marginTop: 45,
    marginBottom: 40,
    height: 46
  },
}));
const WalletView: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props: any) => {
  const { children, className, ...rest } = props;
  const classes = useStyles();

  return (
    <MainCard {...rest} className={cls(classes.root, className)}>
      <Notifications />
      <WalletMessage />
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" mb="28px" className={classes.container}>

        </Box>

      </Box>
    </MainCard>
  );
};

export default WalletView;
