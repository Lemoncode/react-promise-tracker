import { createStyles } from "@material-ui/core/styles";

export const styles = () => createStyles({
  picContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.25rem",
  },
  pic: {
    borderRadius: "4px",
  },
  progress: {
    margin: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
  },
  gallery: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    marginBottom: "2rem",
  },

});


