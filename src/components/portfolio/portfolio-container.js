import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      data: [],
      allData: [],
      activeFilter: "all"
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    if (filter === "all") {
      this.setState({
        data: this.state.allData,
        activeFilter: "all"
      });
    } else {
      const filteredData = this.state.allData.filter(item => {
        return item.category === filter;
      });

      this.setState({
        data: filteredData,
        activeFilter: filter
      });
    }
  }

  getPortfolioItems() {
    axios
      .get("https://txemagg.devcamp.space/portfolio/portfolio_items")
      .then(response => {
        this.setState({
          data: response.data.portfolio_items,
          allData: response.data.portfolio_items,
          activeFilter: "all"
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  portfolioItems() {
    return this.state.data.map(item => {
      return <PortfolioItem key={item.id} item={item} />;
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    const { activeFilter } = this.state;

    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="portfolio-container">
        <div className="filter-buttons-wrapper">
          <button
            className={activeFilter === "ONG" ? "active" : ""}
            onClick={() => this.handleFilter("ONG")}
          >
            ONG
          </button>
          <button
            className={activeFilter === "Naciones Unidas" ? "active" : ""}
            onClick={() => this.handleFilter("Naciones Unidas")}
          >
            Naciones Unidas - ONU
          </button>
          <button
            className={activeFilter === "Institución Pública" ? "active" : ""}
            onClick={() => this.handleFilter("Institución Pública")}
          >
            Administración Pública
          </button>
          <button
            className={`ver-todo ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => this.handleFilter("all")}
          >
            Ver todo
          </button>
        </div>

        <div className="portfolio-items-wrapper">
          {this.portfolioItems()}
        </div>
      </div>
    );
  }
}