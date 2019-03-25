export const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: `${theme.spacing.unit * 3}px`
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  },
  card: {
    maxWidth: 600,
    marginTop: "30px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },
  posttitle: {
    marginLeft: "20px",
    marginTop: "20px"
  },
  categry: {
    marginLeft: "20px",
    marginTop: "10px"
  },
  Favorit: {
    color: "blue",
    fontSize: "50px",
    marginLeft: "120px",
    marginTop: "-16px"
  }
});
