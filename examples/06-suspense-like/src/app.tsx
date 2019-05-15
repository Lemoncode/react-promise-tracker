import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { Quote, getQuote, getPicture } from "./api";
import { styles } from "./styles";


const Suspense: React.FC<{ tag: string, className?: string }> = ({ tag, className, children }) => {
  const { promiseInProgress } = usePromiseTracker({ area: tag });
  return promiseInProgress ? <CircularProgress className={className} size={60}/> : <>{children}</>;
};

const AppInner: React.FC<WithStyles<typeof styles>> = ({classes}) => {
  const [quote, setQuote] = React.useState<Quote>({ body: "", author: "" });
  const [picture, setPicture] = React.useState();
  const loadData = React.useCallback(() => {
    trackPromise(getQuote(), "quote").then(setQuote);
    trackPromise(getPicture(500, 200), "picture").then(setPicture);
  }, []);

  React.useEffect(() => loadData(), []);

  return (
    <div className={classes.container}>
      <Button variant="outlined" onClick={loadData} className={classes.button}>Refresh</Button>
      <Suspense tag="picture" className={classes.progress}>
        <img src={picture} className={classes.pic}/>
      </Suspense>
      <Suspense tag="quote" className={classes.progress}>
        <Typography variant="h4" align="center" className={classes.text}>{quote.body}</Typography>
        <Typography variant="h5" className={classes.text}>{quote.author}</Typography>
      </Suspense>
    </div>
  );
};

export const App = withStyles(styles)(AppInner);
