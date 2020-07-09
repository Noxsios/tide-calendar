import clsx from "clsx";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import isSameDay from "date-fns/isSameDay";
import endOfWeek from "date-fns/endOfWeek";
import React, { PureComponent } from "react";
import startOfWeek from "date-fns/startOfWeek";
import isWithinInterval from "date-fns/isWithinInterval";
import { DatePicker } from "@material-ui/pickers";
import { createStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { IconButton, withStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import CalGrid from "../calendar/CalGrid"
import Tides from "./Tides"
import Divider from "@material-ui/core/Divider"

class CustomElements extends PureComponent {
  state = {
    selectedDate: new Date(),
  };

  handleWeekChange = (date) => {
    this.setState({ selectedDate: startOfWeek(new Date(date)) });
  };

  formatWeekSelectLabel = (date, invalidLabel) => {
    let dateClone = new Date(date);

    return dateClone && isValid(dateClone)
      ? `Week of ${format(startOfWeek(dateClone), "MMM do")}`
      : invalidLabel;
  };

  renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    const { classes } = this.props;
    let dateClone = new Date(date);
    let selectedDateClone = new Date(selectedDate);

    const start = startOfWeek(selectedDateClone);
    const end = endOfWeek(selectedDateClone);

    const dayIsBetween = isWithinInterval(dateClone, { start, end });
    const isFirstDay = isSameDay(dateClone, start);
    const isLastDay = isSameDay(dateClone, end);

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(dateClone, "d")} </span>
        </IconButton>
      </div>
    );
  };

  render() {
    const { selectedDate } = this.state;
    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);

    const week = eachDayOfInterval({start:start,end:end}).map(ele => ele.getDate())
    const dates = eachDayOfInterval({ start: start, end: end });

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="center" style={{ margin: "1rem" }}>
          <DatePicker
            label="Choose a week to view"
            value={selectedDate}
            onChange={this.handleWeekChange}
            renderDay={this.renderWrappedWeekDay}
            labelFunc={this.formatWeekSelectLabel}
          />
        </Grid>
        <Tides />
        <Divider style={{ margin: "1rem" }} />
        <CalGrid week={week} dates={dates} beach={this.props.beach} />
      </MuiPickersUtilsProvider>
    );
  }
}

const styles = createStyles((theme) => ({
  dayWrapper: {
    position: "relative",
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: "0 2px",
    color: "inherit",
  },
  customDayHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "2px",
    right: "2px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "50%",
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: "#676767",
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  firstHighlight: {
    extend: "highlight",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  endHighlight: {
    extend: "highlight",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
}));

export default withStyles(styles)(CustomElements);
