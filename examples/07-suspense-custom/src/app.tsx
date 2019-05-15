import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { getPicture } from "./api";
import { styles } from "./styles";
import { randomBytes } from "crypto";

const Suspense: React.FC<{tag: string, Progress?: React.ReactNode}> = ({ tag, Progress, children }) => {
  const { promiseInProgress } = usePromiseTracker({ area: tag });
  return <>{promiseInProgress ? Progress : children}</>;
};

const randomWidth = () => Math.round(Math.random() * 250 + 80);
const height = 100;

const RandomPicInner: React.FC<{id: string} & WithStyles<typeof styles>> = ({id, classes}) => {
  const [picture, setPicture] = React.useState(null);
  const [width] = React.useState(randomWidth());

  React.useEffect(() => {
    trackPromise(getPicture(width, height), id).then(setPicture);
  }, [width, id]);
  return (
    <div className={classes.picContainer} style={{width, height}}>
      <Suspense tag={id} Progress={<CircularProgress style={{color: `#${randomBytes(3).toString("hex")}`}}/>}>
        <img src={picture} className={classes.pic}/>
      </Suspense>
    </div>

  );
};
const RandomPic = withStyles(styles)(RandomPicInner);

const AppInner: React.FC<WithStyles<typeof styles>> = ({classes}) => {
  const [picIds, setPicIds] = React.useState([]);
  const randomize = React.useCallback(() =>
    setPicIds(Array(16).fill(0).map(id => randomBytes(20).toString("hex")))
  , []);
  React.useEffect(() => randomize(), [randomize]);

  return (
    <div className={classes.container}>
      <Button variant="outlined" onClick={randomize} className={classes.button}>Randomize</Button>
      <div className={classes.gallery}>
        {picIds.map(id => <RandomPic id={`pic${id}`} key={id} />)}
      </div>
    </div>
  );
};
export const App = withStyles(styles)(AppInner);
