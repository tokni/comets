import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Route, withRouter, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import LeftMenu from "./leftMenu/LeftMenu";
import LeftMenuMobile from "./leftMenu/LeftMenu.mobile";
import Tabs from "./tabs/Tabs";
import TabsMobile from "./tabs/Tabs.mobile";
import Charts from "./charts/Charts";
import ChartsTab2 from "./charts/ChartsTab2";
import ChartsTab3 from "./charts/ChartsTab3";
import ChartsTab4 from "./charts/ChartsTab4";
import ChartsTab5 from "./charts/ChartsTab5";
import ChartsTab6 from "./charts/ChartsTab6";
import About from "./pages/About";
import PageRenderer from "./pages/PageRenderer";
import Prerequisites from "./pages/Prerequisites";
import scenarioCombinations from "./data/scenarioCombinations";

ReactGA.initialize("UA-145591344-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const Page = styled.div`
  height: 100%;
  margin: 0px;
  display: flex;
  box-sizing: border-box;
`;
const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  flex-grow: 1; /*ensures that the container will take up the full height of the parent container*/
  overflow-y: auto; /*adds scroll to this container*/
  overflow-x: hidden;
`;
const MainSwitch = styled(Switch)`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export const changeScenario = (name, value) => ({
  [name]: value
});

const default_scenario = "Frozen_policy_INT";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scenarioSelection: default_scenario,
      scenarioSelection2: "",
      showWelcome: true,
      showDifference: false,
      showCCS: false,
      showBio: false,
      scenarioSelectionNoOptions: default_scenario,
      scenarioSelectionNoOptions2: "",
    };
    this.scenarioCombinations = scenarioCombinations.scenarioCombinations;
  }

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
  };
  UpdateScenarioNames = () => {
    this.setState((state) => {
      return {
      "scenarioSelection": state.scenarioSelectionNoOptions + (state.showCCS ? "_CCS": "") + (state.showBio ? "_bio" : "")
      }
    })
    this.setState((state) => {
      return {
      "scenarioSelection2": state.scenarioSelectionNoOptions2 !== "" ? 
      state.scenarioSelectionNoOptions2 + (state.showCCS ? "_CCS": "") + (state.showBio ? "_bio" : "") :
      ""
      }
    })
  }
  UpdateScenarioSelection = (e, name, value) => {
    e.preventDefault();
    if (this.state.scenarioSelectionNoOptions2 !== "") {
      if (value === this.state.scenarioSelectionNoOptions) {
        this.setState(
          changeScenario("scenarioSelectionNoOptions", this.state.scenarioSelectionNoOptions2)
        );
        this.setState(changeScenario("scenarioSelectionNoOptions2", ""));
      } else {
        if (value === this.state.scenarioSelectionNoOptions2) {
          this.setState(changeScenario("scenarioSelectionNoOptions2", ""));
        } else {
          this.setState(changeScenario("scenarioSelectionNoOptions2", value));
        }
      }
    } else {
      if (value !== this.state.scenarioSelectionNoOptions) {
        this.setState(changeScenario("scenarioSelectionNoOptions2", value));
      }
    }
    this.UpdateScenarioNames();
  };

  CloseWelcomeWidget = () => {
    this.setState({ showWelcome: false });
  };

  ToggleDifference = e => {
    e.preventDefault();
    this.setState({ showDifference: !this.state.showDifference });
  };

  ToggleShowCCS = e => {
    e.preventDefault();
    this.setState({
      showCCS: !this.state.showCCS
    });
    this.UpdateScenarioNames();
  };

  ToggleShowBio = e => {
    e.preventDefault();
    this.setState({
      showBio: !this.state.showBio
    });
    this.UpdateScenarioNames();
  };

  render() {
    return (
      <Page>
        <Column>
          <Content>
            <LeftMenu
              selectedChartgroup={this.state.scenarioSelection}
              scenarioSelection={this.state}
              scenarioCombinations={this.scenarioCombinations}
              updateScenarioSelection={this.UpdateScenarioSelection}
              toggleDifference={this.ToggleDifference}
              toggleShowCCS={this.ToggleShowCCS}
              toggleShowBio={this.ToggleShowBio}
            />
            <LeftMenuMobile
              selectedChartgroup={this.state.scenarioSelection}
              scenarioSelection={this.state}
              scenarioCombinations={this.scenarioCombinations}
              updateScenarioSelection={this.UpdateScenarioSelection}
              toggleDifference={this.ToggleDifference}
              toggleShowCCS={this.ToggleShowCCS}
              toggleShowBio={this.ToggleShowBio}
            />
          </Content>
        </Column>
        <Column>
          <Content>
            <Tabs selectedChartgroup={this.props.location.pathname} />
            <TabsMobile selectedChartgroup={this.props.location.pathname} />
            <MainSwitch>
              <Route
                exact
                path="/"
                render={() => (
                  <Charts
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                  />
                )}
              />
              <Route
                path="/tab2"
                render={() => (
                  <ChartsTab2
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                  />
                )}
              />
              <Route
                path="/tab3"
                render={() => (
                  <ChartsTab3
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                  />
                )}
              />
              <Route
                path="/tab4"
                render={() => (
                  <ChartsTab4
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                  />
                )}
              />
              <Route
                path="/tab5"
                render={() => (
                  <ChartsTab5
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                  />
                )}
              />
              <Route
                path="/tab6"
                render={() => (
                  <ChartsTab6
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                  />
                )}
              />
              <Route path="/about" component={About} />
              <Route
                path="/beskrivelser"
                render={() => {
                  return (
                    <PageRenderer
                      markdownFiles={[
                        "descriptions/0_intro.md",
                        "descriptions/1_reference.md",
                        "descriptions/2_marienlyst.md",
                        "descriptions/3_comets.md",
                        "descriptions/4_co2_budget.md",
                      ]}
                    />
                  );
                }}
              />
              <Route path="/forudsaetninger" component={Prerequisites} />
              <Route path="/udfordringer"  render={() => {
                  return (
                    <PageRenderer
                      markdownFiles={[
                        "descriptions/challenges.md",
                        "descriptions/udfordringer_omstilling.md",
                        "descriptions/udfordringer_reduktion.md"
                      ]}
                    />
                  );
                }} />
            </MainSwitch>
          </Content>
        </Column>
      </Page>
    );
  }
}

export default withRouter(App);
