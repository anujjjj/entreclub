import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import moment from 'moment';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Sector
} from 'recharts';
import { Link } from 'react-router-dom';

import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

import firestore from "../../firestore";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsInfo: []
    }
  }

  componentDidMount() {


  }



  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    let eventsInfo = this.state.eventsInfo
    console.log(eventsInfo);
    return (
      <div className="content">
        <Grid fluid>
          <h3 style={{ marginTop: '-8px', marginBottom: '17px' }}>Upcoming Events</h3>


        </Grid >
      </div >
    );
  }
}

export default CreateEvent;
