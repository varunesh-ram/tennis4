import React from 'react';
import { mount } from 'enzyme';
import TennisGame from "../component/TennisGame";
import Player from "../component/Player";
import Scorer from "../component/Scorer";

describe(("<TennisGame/> component"), () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(< TennisGame />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should have two players and one scorer", () => {
    expect(wrapper.find(Player).length).toBe(2);
    expect(wrapper.find(Scorer).length).toBe(1);
  });
  it("should have a reset Button to rest the Game", () => {
    expect(wrapper.find("button").at(2).text()).toEqual("Reset Game");
  });
});
describe(("<TennisGame/> Game functionality"), () => {
  let wrapper, scoreLabel, player1ScoreButton, player2ScoreButton;
  beforeEach(() => {
    wrapper = mount(< TennisGame />);
    scoreLabel = wrapper.find(Scorer).find("label");
    player1ScoreButton = wrapper.find(Player).at(0).find("button");
    player2ScoreButton = wrapper.find(Player).at(1).find("button");
  });

  it("On Game Start, Score Should be Love All", () => {
    expect(scoreLabel.text()).toEqual("Love all");
  });
  it("On Player 1 Scores once, Score Should be Fifteen Love", () => {
    player1ScoreButton.simulate('click');
    expect(scoreLabel.text()).toEqual("Fifteen,Love");
  });
  it("On Player 1 Scores twice, Score Should be Thirty Love", () => {
    clickThe(player1ScoreButton, 2);
    expect(scoreLabel.text()).toEqual("Thirty,Love");
  });
  it("On Player 1 Scores thrice, Score Should be Forty Love", () => {
    clickThe(player1ScoreButton, 3);
    expect(scoreLabel.text()).toEqual("Forty,Love");
  });
  it("On Player 2 Scores once, Score Should be Love Fifteen", () => {
    player2ScoreButton.simulate('click');
    expect(scoreLabel.text()).toEqual("Love,Fifteen");
  });
  it("On Player 2 Scores twice, Score Should be Love Thirty", () => {
    clickThe(player2ScoreButton, 2);
    expect(scoreLabel.text()).toEqual("Love,Thirty");
  });
  it("On Player 2 Scores thrice, Score Should be Love Forty", () => {
    clickThe(player2ScoreButton, 3);
    expect(scoreLabel.text()).toEqual("Love,Forty");
  });
  it("On Player 1 Scores twice and Player 2 Scores once, Score Should be Thirty Fifteen", () => {
    clickThe(player1ScoreButton, 2);
    player2ScoreButton.simulate('click');
    expect(scoreLabel.text()).toEqual("Thirty,Fifteen");
  });
  it("On both Players Scores once, Score Should be Fifteen all", () => {
    player1ScoreButton.simulate('click');
    player2ScoreButton.simulate('click');
    expect(scoreLabel.text()).toEqual("Fifteen all");
  });
  it("On both Players Scores twice, Score Should be Thirty all", () => {
    clickThe(player1ScoreButton, 2);
    clickThe(player2ScoreButton, 2);
    expect(scoreLabel.text()).toEqual("Thirty all");
  });
  it("On both Players Scores thrice, Score Should be Deuce", () => {
    clickThe(player1ScoreButton, 3);
    clickThe(player2ScoreButton, 3);
    expect(scoreLabel.text()).toEqual("Deuce");
  });
  it("On Player 1 Scores four times and Player 2 Scores thrice, Score Should be Advantage Player 1", () => {
    clickThe(player1ScoreButton, 3);
    clickThe(player2ScoreButton, 3);
    player1ScoreButton.simulate('click');
    expect(scoreLabel.text()).toEqual("Advantage Player 1");
  });
  it("On Player 1 Scores thrice and Player 2 Scores four times, Score Should be Advantage Player 2", () => {
    clickThe(player1ScoreButton, 3);
    clickThe(player2ScoreButton, 4);
    expect(scoreLabel.text()).toEqual("Advantage Player 2");
  });
  it("On Player 1 Scores four times, Score Should be Player 1 wins", () => {
    clickThe(player1ScoreButton, 4);
    expect(scoreLabel.text()).toEqual("Player 1 wins");
  });
  it("On Player 1 Scores thrice and Player 2 scores five times, Score Should be Player 2 wins", () => {
    clickThe(player1ScoreButton, 3);
    clickThe(player2ScoreButton, 5);
    expect(scoreLabel.text()).toEqual("Player 2 wins");
  });
  it("On Reset the Game, Score Should be Love All", () => {
    clickThe(player1ScoreButton, 2);
    clickThe(player2ScoreButton, 2);
    wrapper.find("button").at(2).simulate('click');
    expect(scoreLabel.text()).toEqual("Love all");
  });
});

function clickThe(button, times) {
  for (let index = 0; index < times; index++) {
    button.simulate('click');
  }
}
