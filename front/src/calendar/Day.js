import React from "react";
import Paper from "@material-ui/core/Paper";

const Day = ({ day }) => {
  return (
    <div>
      <Paper elevation={20}>
        {day}
        <hr />
        Percolator cream, breve id affogato, coffee caffeine acerbic, coffee
        doppio, ristretto sit espresso chicory percolator instant body cortado.
        A irish, sugar, half and half et cinnamon iced grinder milk java cup bar
        cortado. Organic galão, doppio, americano, robust, fair trade lungo,
        half and half sugar kopi-luwak frappuccino white whipped and pumpkin
        spice spoon aged. Siphon ristretto grounds froth decaffeinated variety
        mocha rich pumpkin spice sit plunger pot, grounds, turkish foam, single
        origin cinnamon single shot, aftertaste french press foam eu half and
        half robusta caffeine. Eu, milk to go dark aftertaste cortado milk, body
        medium crema aged cup robusta.
      </Paper>
    </div>
  );
};

export default Day;
