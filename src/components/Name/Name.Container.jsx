import React, { Component, PureComponent } from 'react';

export default class NameContainer extends PureComponent {
  render() {
    return (
      <div className="name">
        <span className="firstname">Gaurav</span>
        <span className="lastname">Singh</span>
      </div>
    );
  }
}
