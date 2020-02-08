import React, { Component } from "react";
import TechItem from "./TechItem";

class TechList extends Component {
  state = {
    newTech: "",
    // techs: ["Node.js", "React", "ReactNative"],
    techs: []
  };
  // Executado assim que o componente aparece na tela
  componentDidMount() {
    const techs = localStorage.getItem("techs");
    if (techs) {
      this.setState({
        techs: JSON.parse(techs)
      });
    }
  }

  // Executado sempre que houver alteracoes nas props e no estado
  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  // Executado quando o componente deixa de existir
  componentWillMount() {}

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleInputChange = e => {
    e.preventDefault();

    this.setState({
      newTech: e.target.value
    });
  };

  handleDelete = tech => {
    this.setState({
      techs: this.state.techs.filter(t => t !== tech)
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map((tech, index) => (
            <TechItem
              key={index}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          ))}
          {/* <TechItem /> */}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
