import { Box} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Notifications } from "app/components";
import MainCard from "app/layouts/MainCard";
import cls from "classnames";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WalletMessage from "./components/WalletMessage";
import CurrencyList from "app/components/CurrencyDialog/components/CurrencyList";
import { RootState, TokenInfo, TokenState, WalletState } from "app/store/types";
import { BIG_ZERO, LoadingKeys, sortTokens } from "app/utils/contants";
import BigNumber from "bignumber.js";
import clsx from "clsx";

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
  currenciesContainer: {
    maxHeight: 460,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  currenciesHeader: {
    justifyContent: "left",
    borderRadius: 0,
    margin: theme.spacing(1, 0, .5),
  },
  currencies: {
    maxHeight: "1000000px",
  },
  currenciesHidden: {
    maxHeight: "0px",
    overflow: "hidden",
  },
}));

type FormState = {
  showWhitelisted: boolean;
  showOthers: boolean;
};

const initialFormState: FormState = {
  showWhitelisted: true,
  showOthers: true,
};

const WalletView: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props: any) => {
  const { children, className, onSelectCurrency, hideZil, hideNoPool, showContribution, ...rest } = props;
  const classes = useStyles();
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [search, setSearch] = useState("");

  const walletState = useSelector<RootState, WalletState>(state => state.wallet);
  const [formState] = useState<FormState>({ ...initialFormState });
  const tokenState = useSelector<RootState, TokenState>(state => state.token);

  useEffect(() => {
    if (!tokenState.tokens) return setTokens([]);
    const tokens = [];
    for (const address in tokenState.tokens!) {
      const token = tokenState.tokens![address];
      tokens.push(token);
    }

    setTokens(tokens.sort(sortTokens));
  }, [tokenState.tokens]);

  const filterSearch = (token: TokenInfo, whitelisted?: boolean): boolean => {
    const searchTerm = search.toLowerCase().trim();
    if (token.isZil && hideZil) return false;
    if (!token.isZil && !token.pool && hideNoPool) return false;
    if (!searchTerm.length && whitelisted === undefined) return true;

    if (whitelisted && !token.whitelisted) return false;
    if (!whitelisted && token.whitelisted) return false;

    return token.address.toLowerCase() === searchTerm ||
      token.name.toLowerCase().includes(searchTerm) ||
      token.symbol.toLowerCase().includes(searchTerm);
  };

  const getTokenFilter = (type: "whitelisted" | "unverified") => {
    return (token: TokenInfo) => filterSearch(token, type === "whitelisted")
  };

  const sortResult = (lhs: TokenInfo, rhs: TokenInfo) => {
    if (!walletState.wallet) return 0;
    if (lhs.isZil) return -1;
    if (rhs.isZil) return 1;
    if (showContribution) {
      // sort first by contribution
      const difference = (rhs.pool?.userContribution || BIG_ZERO)
        .comparedTo(lhs.pool?.userContribution || BIG_ZERO);
      // then lexicographically by symbol
      return difference !== 0 ? difference : lhs.symbol.localeCompare(rhs.symbol);
    }
    const userAddress = walletState.wallet!.addressInfo.byte20.toLowerCase();
    const difference = new BigNumber(rhs.balances[userAddress]?.toString() || 0).comparedTo(lhs.balances[userAddress]?.toString() || 0);
    return difference !== 0 ? difference : lhs.symbol.localeCompare(rhs.symbol);
  };

  const verifiedTokens = tokens.filter(getTokenFilter("whitelisted")).sort(sortResult);



  return (
    <MainCard {...rest} className={cls(classes.root, className)}>
      <Notifications />
      <WalletMessage />
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" mb="28px" className={classes.container}>
        <CurrencyList
          tokens={verifiedTokens}
          search={search}
          emptyStateLabel={`No approved tokens found for "${search}"`}
          showContribution={showContribution}
          onSelectCurrency={onSelectCurrency}
          className={clsx(classes.currencies, { [classes.currenciesHidden]: !formState.showWhitelisted })} />
        </Box>

      </Box>
    </MainCard>
  );
};

export default WalletView;
